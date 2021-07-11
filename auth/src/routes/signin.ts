import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/users";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Please provide valid email"),
    body("password").trim().notEmpty().withMessage("Must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // Check if email exists in DB
    if (!existingUser) {
      throw new BadRequestError("Incorrect Username/Password");
    }

    // Check if password is correct match in DB
    // Do not forget await since our password compare is a async method
    const passMatch = await Password.compare(existingUser.password, password);
    if (!passMatch) {
      throw new BadRequestError("Incorrect Username/Password");
    }

    // Create a JWT token and add it to request session cookie
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export { router as signinRouter };
