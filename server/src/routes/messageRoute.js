import { getMessage, getUserList, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";
import express from "express"
import {auth} from "../middlewares/auth.js"

const messageRouter=express.Router();

messageRouter.get("/users",auth,getUserList)
messageRouter.get("/:id",auth,getMessage)
messageRouter.put("/mark/:id",auth,markMessageAsSeen)
messageRouter.post("/send/:id",auth,sendMessage)

export default messageRouter