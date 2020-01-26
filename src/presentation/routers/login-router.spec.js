class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.body.email) {
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
});
