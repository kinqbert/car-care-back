import request from "supertest";
import { app } from "../app";
import User from "../models/UserModel";
import { hashPassword } from "../services/UserServices";
import CarModel from "../models/CarModel";
import { generateAccessToken } from "../services/TokenServices";
import TransactionModel from "../models/TransactionModel";
import DamageModel from "../models/DamageModel";

let userId = 1;
let carId: string;

describe("User Authentication Tests", () => {
  describe("POST /api/auth/register", () => {
    it("should register a user successfully", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "testuser@example.com",
          password: "Password123!",
          name: "John",
          surname: "Doe",
          licenseNumber: "87654321",
        })
        .expect(200);

      // Validate response
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("surname");
      expect(response.body).toHaveProperty("licenseNumber");
      expect(response.body).toHaveProperty("avatarUrl");
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toBe("testuser@example.com");
      expect(response.body.avatarUrl).toBe(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
      );
    });

    it("should return 400 if email or password are missing", async () => {
      // Missing email
      let response = await request(app)
        .post("/api/auth/register")
        .send({ password: "Password123!" })
        .expect(400);

      expect(response.body.message).toBe("Email and password are required.");

      // Missing password
      response = await request(app)
        .post("/api/auth/register")
        .send({ email: "missingpassword@example.com" })
        .expect(400);

      expect(response.body.message).toBe("Email and password are required.");
    });

    it("should return 400 if user already exists", async () => {
      // Pre-create a user
      const testPassword = await hashPassword("Password123!");
      await User.create({
        email: "existinguser@example.com",
        password: testPassword,
        name: "Existing",
        surname: "User",
        licenseNumber: "12345678",
        avatarUrl: "",
      });

      // Attempt to register with the same email
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "existinguser@example.com",
          password: "Password123!",
          name: "Duplicate",
          surname: "User",
          licenseNumber: "87654321",
        })
        .expect(400);

      expect(response.body.message).toBe(
        "User with such email already exists."
      );
    });
  });

  describe("POST /api/auth/login", () => {
    beforeAll(async () => {
      const testPassword = await hashPassword("MyTestPassword123!");
      await User.create({
        email: "test@example.com",
        password: testPassword,
        name: "Login",
        surname: "User",
        licenseNumber: "12345678",
        avatarUrl: "",
      });
    });

    it("should log in successfully with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "MyTestPassword123!" })
        .expect(200);

      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
    });

    it("should return 400 if email or password are missing", async () => {
      // Missing email
      let response = await request(app)
        .post("/api/auth/login")
        .send({ password: "Password123!" })
        .expect(400);

      expect(response.body.message).toBe("Email and password are required.");

      // Missing password
      response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com" })
        .expect(400);

      expect(response.body.message).toBe("Email and password are required.");
    });

    it("should return 403 for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "WrongPassword123!" })
        .expect(403);

      expect(response.body.message).toBe("Invalid email or password.");
    });

    it("should return 403 if the user does not exist", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "SomePassword" })
        .expect(403);

      expect(response.body.message).toBe("Invalid email or password.");
    });
  });
});

const mockToken = generateAccessToken({ id: 1 });

describe("Car API Tests", () => {
  describe("POST /api/cars/create", () => {
    it("should create a new car", async () => {
      const response = await request(app)
        .post("/api/cars/create")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          make: "Toyota",
          model: "Corolla",
          year: 2021,
          logoImageUrl: "https://example.com/logo.png",
          sideImageUrl: "https://example.com/side.png",
          color: "Red",
          weight: 1500,
          fuelType: "Petrol",
          maxSpeed: 180,
          price: 20000,
          horsePower: 150,
        })
        .expect(200);

      expect(response.body.make).toBe("Toyota");
      expect(response.body.model).toBe("Corolla");
      expect(response.body.isPurchaseAvailable).toBe(false);
      carId = response.body._id;
    });
  });

  describe("GET /api/cars/:id", () => {
    it("should retrieve car details by ID", async () => {
      const response = await request(app)
        .get(`/api/cars/${carId}`)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body._id).toBe(carId);
      expect(response.body.make).toBe("Toyota");
    });

    it("should return 404 for a non-existent car ID", async () => {
      const response = await request(app)
        .get("/api/cars/invalidCarId")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(404);

      expect(response.body.message).toBe("Car not found");
    });
  });

  describe("PATCH /api/cars/:id/sell", () => {
    it("should mark a car as available for sale", async () => {
      const response = await request(app)
        .patch(`/api/cars/${carId}/sell`)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.isPurchaseAvailable).toBe(true);
    });
  });

  describe("POST /api/cars/:id/cancel_sell", () => {
    it("should cancel the sale of a car", async () => {
      const response = await request(app)
        .patch(`/api/cars/${carId}/cancel_sell`)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.isPurchaseAvailable).toBe(false);
    });
  });

  describe("PATCH /api/cars/:id/purchase", () => {
    it("should purchase a car and create a transaction", async () => {
      // Mark car available for purchase
      await CarModel.findByIdAndUpdate(carId, { isPurchaseAvailable: true });

      const response = await request(app)
        .patch(`/api/cars/${carId}/purchase`)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      const ownerId = response.body.ownerId.toString();
      const userIdStr = userId.toString();

      expect(ownerId).toBe(userIdStr);

      // Verify the transaction is created
      const transaction = await TransactionModel.findOne({ car: carId });
      expect(transaction).toBeDefined();

      if (!transaction) {
        fail("Transaction does not exist");
      }

      expect(transaction.buyer).toBe(userIdStr);
    });
  });

  describe("PATCH /api/cars/:id/repair", () => {
    it("should repair a car and clear all repairs", async () => {
      // Add a repair to the car
      await DamageModel.create({
        car: carId,
        description: "Engine repair",
        shortDescription: "Engine",
        severity: "HIGH",
      });

      const response = await request(app)
        .patch(`/api/cars/${carId}/repair`)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.repairs.length).toBe(0);

      // Verify repairs are cleared in the database
      const repairs = await DamageModel.find({ car: carId });
      expect(repairs.length).toBe(0);
    });
  });

  describe("GET /api/cars/user", () => {
    it("should retrieve all cars owned by the user", async () => {
      const response = await request(app)
        .get("/api/cars/user")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      const cars = response.body;
      expect(cars.length).toBeGreaterThan(0);
    });
  });
});

describe("Repair API Tests", () => {
  describe("POST /api/repairs/create", () => {
    it("should create a new repair for a car", async () => {
      const response = await request(app)
        .post("/api/repairs/create")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          car: carId,
          description: "Engine repair",
          shortDescription: "Engine issues",
          severity: "HIGH",
        })
        .expect(200);

      // Validate response
      expect(response.body).toHaveProperty("_id");
      expect(response.body.car).toBe(carId);
      expect(response.body.description).toBe("Engine repair");
      expect(response.body.shortDescription).toBe("Engine issues");
      expect(response.body.severity).toBe("HIGH");

      // Validate database
      const repair = await DamageModel.findById(response.body._id);
      expect(repair).not.toBeNull();
      expect(repair?.description).toBe("Engine repair");
    });

    it("should return a 400 error for missing required fields", async () => {
      const response = await request(app)
        .post("/api/repairs/create")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          car: carId,
        }) // Missing required fields like `description` and `severity`
        .expect(400);

      expect(response.body.message).toContain("validation failed");
    });
  });
});

describe("User API Tests", () => {
  describe("PATCH /api/check_email", () => {
    it("should return that email is available if it does not exist", async () => {
      const response = await request(app)
        .patch("/api/check_email")
        .send({ email: "newemail@example.com" })
        .expect(200);

      expect(response.body).toHaveProperty("message", "Email is available!");
    });

    it("should return 400 if the email already exists", async () => {
      const response = await request(app)
        .patch("/api/check_email")
        .send({ email: "testuser@example.com" })
        .expect(400);

      expect(response.body.message).toBe(
        "User with such email already exists."
      );
    });

    it("should return 400 if email is not provided", async () => {
      const response = await request(app)
        .patch("/api/check_email")
        .send({})
        .expect(400);

      expect(response.body.message).toBe("Email is required.");
    });
  });

  describe("GET /api/user", () => {
    it("should retrieve the current user's information", async () => {
      const response = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("email", "testuser@example.com");
      expect(response.body).toHaveProperty("vehiclesOwned");
      expect(response.body).toHaveProperty("vehiclesSold");
    });
  });

  describe("GET /api/users", () => {
    it("should retrieve all users", async () => {
      const response = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      const users = response.body;
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe("PATCH /api/user/update", () => {
    it("should update the current user's information", async () => {
      const updatedData = {
        name: "UpdatedName",
        surname: "UpdatedSurname",
        licenseNumber: "87654321",
        avatarUrl: "https://example.com/new-avatar.png",
      };

      const response = await request(app)
        .patch("/api/user/update")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);

      // Verify the database was updated
      const updatedUser = await User.findOne({ where: { id: 1 }, raw: true });
      expect(updatedUser).toMatchObject(updatedData);
    });

    it("should return 400 if no data is provided", async () => {
      const response = await request(app)
        .patch("/api/user/update")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({})
        .expect(400);

      expect(response.body.message).toContain("Validation error");
    });
  });
});
