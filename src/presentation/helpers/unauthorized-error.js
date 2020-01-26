export default class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized user!!");
    this.name = "Unauthorized";
  }
}
