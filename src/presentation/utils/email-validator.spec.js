class EmailValidator {
  isValid() {
    return true;
  }
}

describe("Email validator", () => {
  test("Should return true if validator returns true", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("random@mail.com");

    expect(isEmailValid).toBe(true);
  });
});
