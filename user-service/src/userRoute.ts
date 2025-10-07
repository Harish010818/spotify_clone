import express from "express";
import { register, login, myProfile } from "./controller.js";
import { isAuthenticated } from "./middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/me").get(isAuthenticated, myProfile);


export default userRouter;