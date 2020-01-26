module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
  }
};
