// Goal: This route allows React to determine whether a user is currently logged in our not. If the request cookie has a JWT token, the user is logged in other wise not.

import express from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
