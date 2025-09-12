import Message from "../models/message.js";
import User from "../models/user.js";
import { toDataUri } from "../utils/dataUri.js";
import {v2 as cloudinary} from 'cloudinary'
import { io,userSocketMap } from "../server.js";
export const getUserList = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("followers", "username email profile")
      .populate("following", "username email profile")
      .select("followers following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const combined = [...user.followers, ...user.following];

    const uniqueUsers = combined.filter(
      (value, index, self) =>
        index === self.findIndex((u) => String(u._id) === String(value._id))
    );

    const unseenMessage = {};
    const promises = uniqueUsers.map(async (user) => {
      const message = await Message.find({
        senderId: user._id,
        recieverId: userId,
        seen: false,
      });
      if (message.length > 0) {
        unseenMessage[user._id] = message.length;
      }
    });

    await Promise.all(promises);
    res.status(200).json({
      users: uniqueUsers,
      unseenMessage,
    });
  } catch (error) {
    console.error("❌ Error fetching combined follow list:", error);
    res.status(500).json({ error: "Server error while fetching follow list" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const userId = req.user.id;

    const message = await Message.find({
      $or: [
        { senderId: userId, recieverId: selectedUserId },
        { senderId: selectedUserId, recieverId: userId },
      ],
    });

    await Message.updateMany({ senderId: selectedUserId, recieverId: userId },{seen:true})

    res.status(200).json({message})
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching Message" });
  }
};


export const markMessageAsSeen= async(req,res)=>{

    try {
        const {id}=req.params;

        await Message.findByIdAndUpdate(id,{seen:true})

        res.status(200).json({message:true})
        
    } catch (error) {
            res.status(500).json({ error: "Server error while fetching Message" });

    }

}

//send message

export const sendMessage=async(req,res)=>{

    try {
      
        const {text}=req.body;
        const image=req.file
        const recieverId=req.params.id;
        const senderId=req.user.id

        let imageUrl
        if (image){
          const dataUrl=toDataUri(image)

          const {secure_url}=await cloudinary.uploader.upload(dataUrl,{
            folder: "echo-hub/message_image",
          })
          imageUrl=secure_url
        }
        const newMessage=await Message.create({
          senderId,
          recieverId,
          text,
          image:imageUrl
        })

        const receiverScoketId=userSocketMap[recieverId];
        if(receiverScoketId){
          io.to(receiverScoketId).emit("newMessage",newMessage)
        }
        res.status(200).json({newMessage});


    } catch (error) {
       res.status(500).json({ error: "Server error "+err });
    }


}