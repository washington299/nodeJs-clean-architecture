import validator from "validator";
import EmailValidator from "./email-validator";

const makeSut = () => {
  return new EmailValidator();
};

describe("Email validator", () => {
  test("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("random@mail.com");

    expect(isEmailValid).toBe(true);
  });

  test("Should return false if validator returns false", () => {
    validator.isEmailValid = false;
    const sut = makeSut();
    const isEmailValid = sut.isValid("invalid_random@mail.com");

    expect(isEmailValid).toBe(false);
  });

  test("Should calls validator with correct email", () => {
    const sut = makeSut();
    sut.isValid("random@mail.com");

    expect(validator.email).toBe("random@mail.com");
  });
});
