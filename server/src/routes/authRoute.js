import express from "express";
import { createUser, LoginUser } from "../controllers/athuController.js";
import { upload } from "../middlewares/multer.js";

const authRouter=express.Router()



authRouter.post("/register",upload.single("profile"),createUser)
authRouter.post("/login",LoginUser)

export default authRouter