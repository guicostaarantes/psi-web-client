module.exports = {
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "@psi/(.*)": "<rootDir>/modules/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  globalSetup: "<rootDir>/globalSetup.js",
};
