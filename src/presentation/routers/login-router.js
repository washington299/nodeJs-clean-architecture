import HttpResponse from "../helpers/http-response";
import MissingParamError from "../helpers/missing-param-error";

export default class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError("email"));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError("password"));
      }

      const accessToken = await this.authUseCase.auth(email, password);
      if (!accessToken) {
        return HttpResponse.unauthorized();
      }

      return HttpResponse.ok(accessToken);
    } catch (error) {
      return HttpResponse.internalServerError();
    }
  }
}
