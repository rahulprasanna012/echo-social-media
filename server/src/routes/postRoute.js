import express from 'express'
import { upload } from '../middlewares/multer.js'
import { createPost, getAllPosts, getAllPostsById } from '../controllers/postContoller.js'
import { auth } from '../middlewares/auth.js'

export const postRouter=express.Router()


postRouter.post("/",auth, upload.single("image"),createPost)
postRouter.get("/",auth,getAllPosts)
postRouter.get("/:userId",auth,getAllPostsById)