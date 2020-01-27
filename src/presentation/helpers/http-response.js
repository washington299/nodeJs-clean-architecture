import MissingParamError from "./missing-param-error";
import UnauthorizedError from "./unauthorized-error";

export default class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    };
  }

  static internalServerError() {
    return {
      statusCode: 500
    };
  }

  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  }

  static ok() {
    return {
      statusCode: 200
    };
  }
}
