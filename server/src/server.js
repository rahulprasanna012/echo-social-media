import express from "express"
import {config} from "@dotenvx/dotenvx"
import { connectDB } from "./config/db.js"

import cors from'cors'
import authRouter from "./routes/authRoute.js"
import { cloudinaryConfiguration } from "./config/cloudinary.js"

config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter)

app.use(
  cors({
    origin: "http://localhost:5713",
    credentials: true, 
  })
);

cloudinaryConfiguration()

connectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`Server is running in port ${PORT}`)
})