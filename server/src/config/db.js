import { config } from "@dotenvx/dotenvx"
import mongoose from "mongoose"

config()

export const connectDB=async ()=>{
    const DB_URL=process.env.DB_URL
    try{
        await mongoose.connect(DB_URL)
        console.log("DB connected...");
        
    }
    catch(err){
        console.error(err);
        
    }


}