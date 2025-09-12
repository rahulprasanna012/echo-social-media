import mongoose from "mongoose";
import Post from "../models/post.js";
import { toDataUri } from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  const { content, label } = req.body;
  const { id } = req.user;
  try {
    if (!content) return res.status(401).json({ error: "Content Missing" });
    if (!id) return res.status(401).json({ error: "Unautherized user" });
    let imageUrl;
    if(req.file){
    
    const baseUrl = await toDataUri(req.file);

    const { secure_url } = await cloudinary.uploader.upload(baseUrl, {
      folder: "echo-hub/post_image",
    });
    imageUrl=secure_url
  
  }

    
    const response = await Post.create({
      content,
      label:label?.split(" "),
      author: id,
      image: imageUrl,
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

    const filter = { author: { $ne: id } };
    if (cursor) filter._id = { $lt: cursor };

    const posts = await Post.find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .populate("author", "username email profile");

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
      .populate("author", "username email profile");

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


export const getMyfollwing=async(req,res)=>{

  try {
        const {id}=req.user;

        const followings=await User.findById(id).select("following")

        res.status(201).json({followings})
  } catch (error) {
        res.status(500).json({ error: "Internal Server Erorr" + err });
  }



}



export const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid postId" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const hasLiked = post.likes.some((id) => id.toString() === userId);

    if (hasLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    return res.status(200).json({
      ok: true,
      likesCount: post.likes.length,
      liked: !hasLiked,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = { user: userId, text };
    post.comments.push(newComment);

    await post.save();
    await post.populate("comments.user", "username profile");

    return res.status(201).json({
      ok: true,
      commentsCount: post.comments.length,
      comments: post.comments,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Get Comments
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("comments.user", "username profile")
      .select("comments");

    if (!post) return res.status(404).json({ error: "Post not found" });

    return res.status(200).json({
      commentsCount: post.comments.length,
      comments: post.comments,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Increment Share Count
export const incrementShare = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { shareCount: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    return res.status(200).json({
      ok: true,
      shareCount: post.shareCount,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};