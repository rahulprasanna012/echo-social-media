import express from "express"
import {config} from "@dotenvx/dotenvx"
import { connectDB } from "./config/db.js"

import cors from'cors'
import authRouter from "./routes/authRoute.js"

config()
const app = express()
app.use(express.json())

app.use("/api/auth",authRouter)

app.use(
  cors({
    origin: "http://localhost:5713",
    credentials: true, 
  })
);

connectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`Server is running in port ${PORT}`)
})