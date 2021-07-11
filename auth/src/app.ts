import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "express-async-errors";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";
import { errorHandling } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// Explicitely telling express to trust the traffic coming from proxy (ingress-nginx)
// Traffic is coming from HTTPS
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    // secure:true indicates only HTTPS allowed.
    // For testing env, we do HTTP requests, thus we check what env we are in and set value
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(bodyParser.json());
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

// This error will invoke when user try to access a path which does not exist here.
// Order is important. Make sure you invoke this error before your errorHandler middlerware.
// Even if its declared before erroHanlder, at the end it will pass through that function.
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Call Custom Error middleware for errors
app.use(errorHandling);

app.get("/api/users/signup", (req, res) => {
  res.send("This is GET /api/users path");
});

export { app };
