export const ROUTES = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    TOKEN: "/api/auth/token",
  },
  CARS: {
    GET_ALL: "/api/cars",
    GET_USER_CARS: "/api/cars/user",
    GET_CAR_BY_ID: "/api/cars/:id",
    PURCHASE: "/api/cars/:id/purchase",
    SELL: "/api/cars/:id/sell",
    CANCEL_SELL: "/api/cars/:id/cancel_sell",
    REPAIR: "/api/cars/:id/repair",
    DELETE: "/api/cars/:id/delete",
    CREATE: "/api/cars/create",
  },
  USER: {
    GET_USER: "/api/user",
    GET_USERS: "/api/users",
    CHECK_EMAIL: "/api/check_email",
    UPDATE: "/api/user/update",
  },
  DAMAGE: {
    CREATE: "/api/damage/create",
  },
  TRANSACTIONS: {
    GET_ALL_TRASACTIONS: "/api/transactions",
  },
};
