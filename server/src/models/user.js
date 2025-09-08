import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    cover_image:{type:String},
    profile:{type:String},
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
