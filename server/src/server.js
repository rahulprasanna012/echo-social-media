import express from "express"
import {config} from "@dotenvx/dotenvx"
import { connectDB } from "./config/db.js"

config()
const app = express()
app.use(express.json())


connectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`Server is running in port ${PORT}`)
})