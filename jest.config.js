/** @type {import('ts-jest').JestConfigWithTsJest} */
export const preset = "ts-jest";
export const testEnvironment = "node";
export const testMatch = ["**/tests/**/*.test.ts", "**/tests/**/*.test.ts"];
export const moduleFileExtensions = ["ts", "js", "json", "node"];
export const transform = {
  "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
};
export const moduleNameMapper = {
  // If you use custom path aliases, map them here
  "^@/(.*)$": "<rootDir>/src/$1",
};
export const transformIgnorePatterns = ["/node_modules/"];
// export const globalSetup = "<rootDir>/src/tests/globalSetup.ts";
// export const globalTeardown = "<rootDir>/src/tests/globalSetup.ts";
export const setupFilesAfterEnv = ["<rootDir>/src/tests/setup.ts"];
