import UnauthorizedError from "./unauthorized-error";
import ServerError from "./server-error";

export default class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error
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
