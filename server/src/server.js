import express from "express"
import {config} from "@dotenvx/dotenvx"
import { connectDB } from "./config/db.js"

import cors from'cors'
import authRouter from "./routes/authRoute.js"
import { cloudinaryConfiguration } from "./config/cloudinary.js"
import { postRouter } from "./routes/postRoute.js";
import { userRouter } from "./routes/userRoute.js"

config()

const app = express()

const ALLOWED_ORIGIN = process.env.ORIGIN || "https://social.prasannanxtwave.site";

app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));
app.options("*", cors({ origin: ALLOWED_ORIGIN, credentials: true }));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/api/health", (req,res) => res.send("OK"));

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)



cloudinaryConfiguration()

connectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`Server is running in port ${PORT}`)
})