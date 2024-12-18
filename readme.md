# Environment Variables for CarCare Project

This file outlines the environment variables used in the CarCare application. These variables ensure secure configuration of the server, tokens, and database connections. Below are the required environment variables along with example values (without exposing real values).

---

## Table of Contents

1. [Server Configuration](#server-configuration)
2. [Token Configuration](#token-configuration)
3. [Redis Configuration](#redis-configuration)
4. [PostgreSQL Configuration](#postgresql-configuration)
5. [MongoDB Configuration](#mongodb-configuration)

---

## Server Configuration

### `PORT`

Defines the port on which the server will run.

- **Example:** `PORT=5050`

---

## Token Configuration

### `REFRESH_TOKEN_SECRET`

The secret key used to sign the **refresh tokens**. Ensure it is a long, random, and secure string.

- **Example:** `REFRESH_TOKEN_SECRET=your_refresh_token_secret_here`

### `ACCESS_TOKEN_SECRET`

The secret key used to sign the **access tokens**. Similar to the refresh token secret, it should be highly secure.

- **Example:** `ACCESS_TOKEN_SECRET=your_access_token_secret_here`

### `ACCESS_TOKEN_LIFESPAN`

The expiration duration for the access tokens.

- **Example:** `ACCESS_TOKEN_LIFESPAN=1h` (1 hour)

### `REFRESH_TOKEN_LIFESPAN_SECONDS`

The expiration time for the refresh tokens in seconds.

- **Example:** `REFRESH_TOKEN_LIFESPAN_SECONDS=86400` (24 hours)

---

## Redis Configuration

### `REDIS_URL`

The connection URL for the Redis server. It includes the protocol, username, password, host, port, and database.

- **Example:** `REDIS_URL=redis://default:password@localhost:6379`

---

## PostgreSQL Configuration

### `POSTGRES_URL`

The connection string for the PostgreSQL database. It includes the username, password, host, port, and database name.

- **Example:** `POSTGRES_URL=postgresql://username:password@localhost:5432/database_name`

---

## MongoDB Configuration

### `MONGO_DB_URI`

The connection string for the MongoDB database. It specifies the host, port, and database name.

- **Example:** `MONGO_DB_URI=mongodb://localhost:27017/database_name`

---

## Notes

1. Ensure that all secrets (e.g., token secrets and database credentials) are stored securely and never hard-coded in the source code.
2. Use tools like **dotenv** or environment management services to load these variables into your application.
3. Replace the example values with real secure and valid credentials.

---

## Example `.env` File

```
PORT=5050
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_LIFESPAN=1h
REFRESH_TOKEN_LIFESPAN_SECONDS=86400
REDIS_URL=redis://default:password@localhost:6379
POSTGRES_URL=postgresql://username:password@localhost:5432/database_name
MONGO_DB_URI=mongodb://localhost:27017/database_name
```

---

By configuring these variables, the CarCare project will run securely and efficiently.
