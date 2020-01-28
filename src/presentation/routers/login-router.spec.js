/* eslint-disable max-classes-per-file */
import LoginRouter from "./login-router";
import MissingParamError from "../helpers/missing-param-error";
import UnauthorizedError from "../helpers/unauthorized-error";
import ServerError from "../helpers/server-error";
import InvalidParamError from "../helpers/invalid-param-error";

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    async auth(email, password) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }
  return new AuthUseCaseSpy();
};

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid() {
      return this.isEmailValid;
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy();
  emailValidatorSpy.isEmailValid = true;
  return emailValidatorSpy;
};

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase();
  const emailValidatorSpy = makeEmailValidator();
  authUseCaseSpy.accessToken = "valid_token";
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);

  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy
  };
};

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    async auth() {
      throw new Error();
    }
  }
  return new AuthUseCaseSpy();
};

const makeEmailValidatorWithError = () => {
  class EmailValidator {
    isValid() {
      throw new Error();
    }
  }
  return new EmailValidator();
};

describe("Login Router", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if an invalid kind of email is provided", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const httpRequest = {
      body: {
        email: "invalid_random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should return 500 if no EmailValidator is provided", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if EmailValidator has no isValid method", async () => {
    class EmailValidatorSpy {}
    const authUseCaseSpy = makeAuthUseCase();
    const sut = new LoginRouter(authUseCaseSpy, new EmailValidatorSpy());
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if EmailValidator throws an error", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const emailValidatorSpy = makeEmailValidatorWithError();
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "random@mail.com"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 500 if no httpRequest is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if httpRequest has no body", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call AuthUseCase with correct params", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    await sut.route(httpRequest);

    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null;
    const httpRequest = {
      body: {
        email: "invalid_random@mail.com",
        password: "invalid_123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test("Should return 200 if valid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
  });

  test("Should return 500 if no AuthUseCase is provided", async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if AuthUseCase has no auth method", async () => {
    class AuthUseCaseSpy {}
    const authUseCaseSpy = new AuthUseCaseSpy();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if AuthUseCase throws error", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "random@mail.com",
        password: "123"
      }
    };
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
