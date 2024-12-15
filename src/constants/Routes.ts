export const ROUTES = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    TOKEN: "/api/auth/token",
  },
  CARS: {
    GET_ALL: "/api/cars",
    GET_USER_CARS: "/api/user_cars",
    GET_CAR_BY_ID: "/api/cars/:id",
    PURCHASE: "/api/:id/purchase",
    SELL: "/api/:id/sell",
    CANCEL_SELL: "/api/:id/cancel_sell",
    REPAIR: "/api/:id/repair",
    CREATE: "/api/cars/create",
  },
  USER: {
    GET_USER: "/api/user",
    GET_USERS: "/api/users",
    CHECK_EMAIL: "/api/check_email",
    UPDATE: "/api/user/update",
  },
  REPAIRS: {
    CREATE: "/api/repairs/create",
  },
  TRANSACTIONS: {
    GET_ALL_TRASACTIONS: "/api/transactions",
  },
};
