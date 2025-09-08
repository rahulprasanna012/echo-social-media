import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, profile, password, bio } = req.body;

    // Required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Password length check
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

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email
  
    });

    // Exclude password from response
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ message: "User created successfully", user: userObj });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};
