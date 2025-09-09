import express from "express";
import { createUser, LoginUser } from "../controllers/athuController.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";
import { getMyfollwing } from "../controllers/postContoller.js";

const authRouter=express.Router()


authRouter.post("/register",upload.single("profile"),createUser)
authRouter.post("/login",LoginUser)


export default authRouter