import express from 'express'
import { upload } from '../middlewares/multer.js'
import { addComment, createPost, getAllPosts, getAllPostsById, getComments, incrementShare, toggleLike } from '../controllers/postContoller.js'
import { auth } from '../middlewares/auth.js'


export const postRouter=express.Router()


postRouter.post("/",auth, upload.single("image"),createPost)
postRouter.get("/",auth,getAllPosts)
postRouter.get("/user/:userId",auth,getAllPostsById)

postRouter.post("/:postId/like", auth, toggleLike);

postRouter.post("/:postId/comments", auth, addComment);

postRouter.get("/:postId/comments", auth, getComments);

postRouter.post("/:postId/share", auth, incrementShare);