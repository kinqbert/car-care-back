export const ROUTES = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    TOKEN: "/api/auth/token",
  },
  CARS: {
    GET_ALL: "/api/cars",
    GET_USER_CARS: "/api/user_cars",
    PURCHASE: "/api/:id/purchase",
    SELL: "/api/:id/sell",
    CANCEL_SELL: "/api/:id/cancel_sell",
    REPAIR: "/api/:id/repair",
  },
  USER: {
    GET_USER: "/api/user",
  },
};
