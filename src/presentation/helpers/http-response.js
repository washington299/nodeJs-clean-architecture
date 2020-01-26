import MissingParamError from "./missing-param-error";

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
}
