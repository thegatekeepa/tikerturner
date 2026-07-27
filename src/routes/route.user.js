import express from "express";
import validator from "../middlewares/validation.middlewares.js";
import { validateNewUserName } from "../validators/validation.user.js";
import { registerUser } from "../controllers/controller.user.js";
import { Router } from "express";

const userRouter = Router();

// POST request trigger
userRouter.post(
    "/register", 
    validator(validateNewUserName), 
    registerUser
);

export default userRouter;