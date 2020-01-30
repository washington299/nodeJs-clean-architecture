module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: ["**/src/**/*.js"],
  testEnvironment: "node",
  transform: {
    ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
  }
};
