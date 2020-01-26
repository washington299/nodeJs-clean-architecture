class LoginRouter {
  route(httpRequest) {
    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return {
        statusCode: 400
      };
    }

    return [];
  }
}

describe("Login Router", () => {
  test("Should return 400 if no email is provided", () => {
    // sut: system under test
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "123"
      }
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if no password is provided", () => {
    // sut: system under test
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "random@mail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
