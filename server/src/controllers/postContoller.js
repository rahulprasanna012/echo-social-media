import mongoose from "mongoose";
import Post from "../models/post.js";
import { toDataUri } from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  const { content, label } = req.body;

  try {
    if (!content) return res.status(401).json({ error: "Content Missing" });

    const baseUrl = await toDataUri(req.file);

    const { secure_url } = await cloudinary.uploader.upload(baseUrl, {
      folder: "echo-hub/post_image",
    });

    const { id } = req.user;
    const response = await Post.create({
      content,
      label,
      author: id,
      image: secure_url,
    });

    res
      .status(201)
      .json({ data: response, message: "Post uploaded Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Upload failed :" + err });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) return res.status(401).json({ error: "Unautherized user" });

    const cursor = req.query.cursor;
    const limit = req.query.limit || 5;

    const filter = {};
    if (cursor) filter._id = { $lt: cursor };

    const posts = await Post.find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .populate("author", "username email");

    const hasNext = posts.length > limit;
    if (hasNext) posts.pop();

    const nextCursor = hasNext ? posts[posts.length - 1]._id : null;

    res.json({
      posts,
      hasNext,
      nextCursor,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Erorr" + err });
  }
};

export const getAllPostsById = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) return res.status(401).json({ error: "Unautherized user" });
    const { userId } = req.params;

    console.log(userId);
    
    const cursor = req.query.cursor;
    const limit = req.query.limit || 5;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const filter = { author: userId };
    if (cursor) filter._id = { $lt: cursor };

    const posts = await Post.find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .populate("author", "username email");

    const hasNext = posts.length > limit;
    if (hasNext) posts.pop();

    const nextCursor = hasNext ? posts[posts.length - 1]._id : null;

    res.json({
      posts,
      hasNext,
      nextCursor,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Erorr" + err });
  }
};
