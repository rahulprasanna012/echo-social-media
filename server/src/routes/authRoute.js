import express from "express";
import { createUser, LoginUser, updateMe } from "../controllers/athuController.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const authRouter=express.Router()


authRouter.post("/register",upload.single("profile"),createUser)
authRouter.post("/login",LoginUser)
authRouter.patch("/update",auth,upload.fields([{ name: "profile" }, { name: "cover_image" }]),updateMe)


export default authRouter