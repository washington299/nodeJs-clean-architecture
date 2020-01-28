import MissingParamError from "./missing-param-error";
import UnauthorizedError from "./unauthorized-error";
import ServerError from "./server-error";

export default class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    };
  }

  static internalServerError() {
    return {
      statusCode: 500,
      body: new ServerError()
    };
  }

  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  }

  static ok(accessToken) {
    return {
      statusCode: 200,
      body: { accessToken }
    };
  }
}
