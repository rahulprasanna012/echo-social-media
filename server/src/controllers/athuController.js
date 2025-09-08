import User from "../models/user.js";
import bcrypt from "bcrypt";
import { toDataUri } from "../utils/dataUri.js";
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"
import {config} from "@dotenvx/dotenvx"
config()

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, bio } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check for existing username
    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check for existing email
    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const datauri=toDataUri(req.file)
    
    const {secure_url}=await cloudinary.uploader.upload(datauri,{
      folder:"echo-hub/profile"
    })
    
    
    
    

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      bio,
      profile:secure_url
  
    });
 
    const userObj = user.toObject();
    delete userObj.password;
    const token =jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_SCERET)


    res.status(201).json({ message: "User created successfully" ,user:userObj, token:token});
  } catch (err) {


    res.status(500).json({ error: "Registration failed" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    console.log(req.body)// undifined
    const {indentifires, password } = req.body;

    console.log(indentifires)

    
    if (!indentifires || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    
    // Check for existing username
    const user = await User.findOne({ $or:[
         { email:indentifires.trim()},
         { username:indentifires.trim()}

    ] }).select("+password");;
    if (!user) {
      return res.status(400).json({ error: "User not exists" });
    }

  
    // Hash password
    const isVerified = await bcrypt.compare(password, user.password);    

    if (!isVerified){
      return res.status(400).json({error:"Wrong Password"})
    }
   
    const userObj = user.toObject();
    delete userObj.password;
    const token =jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_SCERET)


    res.status(201).json({ message: "User created successfully" ,user:userObj, token:token});
  } catch (err) {

    console.error("Error creating user:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { name, username, email, password, bio,file } = req.body;

    
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check for existing username
    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check for existing email
    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const datauri=toDataUri(req.file)
    
    const {secure_url}=await cloudinary.uploader.upload(datauri,{
      folder:"echo-hub/profile"
    })
    
    
    
    

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      bio,
      profile:secure_url
  
    });
 
    const userObj = user.toObject();
    delete userObj.password;
    const token =jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_SCERET)


    res.status(201).json({ message: "User created successfully" ,user:userObj, token:token});
  } catch (err) {

    console.error("Error creating user:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};