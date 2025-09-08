import express from "express"
import {config} from "@dotenvx/dotenvx"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser";
import cors from'cors'
import authRouter from "./routes/authRoute.js"
import { cloudinaryConfiguration } from "./config/cloudinary.js"

config()

const app = express()
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true, 
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req,res) => res.send("OK"));

app.use("/api/auth",authRouter)



cloudinaryConfiguration()

connectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`Server is running in port ${PORT}`)
})