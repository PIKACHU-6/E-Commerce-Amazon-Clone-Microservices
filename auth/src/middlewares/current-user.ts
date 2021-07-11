// Goal: Many of our services want to know whether a user is logged in or not. This is done by checking if user has a JWT token.
// This middleware does that and can be reused among other services

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  email: string;
  id: string;
}

// If we want to augment a property to existing module or library
// go to the namespace till the function/interface and write it
// We did this because TS don't understand it when we directly assign value to req.currentUser.
declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as Payload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
