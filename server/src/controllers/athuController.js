import User from "../models/user.js";
import bcrypt from "bcrypt";
import { toDataUri } from "../utils/dataUri.js";
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"
import {config} from "@dotenvx/dotenvx"
import mongoose from "mongoose";
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
    let imageUrl;
    if (req.file)
    {const datauri=toDataUri(req.file)
    
    const {secure_url}=await cloudinary.uploader.upload(datauri,{
      folder:"echo-hub/profile"
    })
    imageUrl=secure_url
  }
    
    
    
    

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      bio,
      profile:imageUrl
  
    });
    
 
    const userObj = user.toObject();
    delete userObj.password;
    const token =jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_SCERET,{expiresIn:"2d"})


    res.status(201).json({ message: "User created successfully" ,user:userObj, token:token});
  } catch (err) {


    res.status(500).json({ error: "Registration failed" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    
    const {indentifires, password } = req.body;

    
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
    const token =jwt.sign({ id: user._id, email: user.email },process.env.TOKEN_SCERET,{expiresIn:"2d"})


    res.status(201).json({ message: "User created successfully" ,user:userObj, token:token});
  } catch (err) {

    console.error("Error creating user:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};


export const updateMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Optional fields
    const { name, username, email, bio, password } = req.body;

    // Uniqueness checks (exclude myself)
    if (username) {
      const u = await User.findOne({ username, _id: { $ne: userId } }).select("_id");
      if (u) return res.status(400).json({ error: "Username already taken" });
    }
    if (email) {
      const u = await User.findOne({ email, _id: { $ne: userId } }).select("_id");
      if (u) return res.status(400).json({ error: "Email already taken" });
    }

    const update = {};
    if (name) update.name = name;
    if (username) update.username = username;
    if (email) update.email = email;
    if (bio !== undefined) update.bio = bio;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      update.password = await bcrypt.hash(password, 10);
    }

 
    const files = req.files || {};
    const profileFile = files.profile?.[0];
    const coverFile = files.cover_image?.[0];

    if (profileFile) {
      const dataUri = await toDataUri(profileFile);
      const { secure_url } = await cloudinary.uploader.upload(dataUri, {
        folder: "echo-hub/profile",
      });
      update.profile = secure_url;
    }

    if (coverFile) {
      const dataUri = await toDataUri(coverFile);
      const { secure_url } = await cloudinary.uploader.upload(dataUri, {
        folder: "echo-hub/cover",
      });
      update.cover_image = secure_url;
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, select: "-password" }
    );

    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user: updated, message: "Profile updated" });
  } catch (err) {
    return res.status(500).json({ error: "Update failed: " + err.message });
  }
};

