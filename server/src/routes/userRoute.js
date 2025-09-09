import express from 'express'

import { auth } from '../middlewares/auth.js'
import { followUser, getMe, unfollowUser } from '../controllers/userController.js'

export const userRouter=express.Router()


userRouter.post("/:targetId/follow",auth, followUser)

userRouter.get("/me",auth,getMe)

userRouter.post("/:targetId/unfollow",auth,unfollowUser)

