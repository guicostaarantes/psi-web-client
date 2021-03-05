module.exports = {
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "@psi/(.*)": "<rootDir>/src/modules/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};
