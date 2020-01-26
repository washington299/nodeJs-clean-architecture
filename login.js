/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const AccountModel = mongoose.model("Account");

class ExpressRouterAdapter {
  static adapt(route) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      };
      const httpResponse = route.router(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

// Infra
class SignupRespository {
  async addUser(email, password) {
    const user = await AccountModel.create({ email, password });
    return user;
  }
}

// Domain
class SignupUseCase {
  register(email, password, confirmedPassword) {
    if (password === confirmedPassword) {
      const user = new SignupRespository().addUser(email, password);
      return user;
    }
    return {};
  }
}

// Presentation
class SignupRouter {
  async router(httpRequest) {
    const { email, password, confirmedPassword } = httpRequest.body;
    const user = new SignupUseCase().register(
      email,
      password,
      confirmedPassword
    );

    return {
      statusCode: 200,
      body: user
    };
  }
}

export default () => {
  const route = new SignupRouter();
  router.post("/signup", ExpressRouterAdapter.adapt(route));
};
*/
