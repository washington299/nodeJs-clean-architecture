/* eslint-disable max-classes-per-file */

class MissingParamError extends Error {
  constructor(paramName) {
    super(`missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
}
class HttpResponse {
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

class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalServerError();
    }
    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest("email");
    }
    if (!password) {
      return HttpResponse.badRequest("password");
    }

    return [];
  }
}

describe("Login Router", () => {
  test("Should return 400 if no email is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "123"
      }
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "random@mail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 500 if no httpRequest is provided", () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();

    expect(httpResponse.statusCode).toBe(500);
  });

  test("Should return 500 if httpRequest has no body", () => {
    const sut = new LoginRouter();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });
});
