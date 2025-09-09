import User from "../models/user.js";



export const getMe = async (req, res) => {
  try {
    const { id } = req.user || {};
    if (!id) return res.status(401).json({ error: "Unauthorized" });

    const me = await User.findById(id)
      .select("-password") 
      .populate("followers", "_id username name email profile")
      .populate("following", "_id username name email profile");

    if (!me) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(me);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const followUser = async (req, res) => {
  const userId = req.user?.id;
  const { targetId } = req.params;
  
  
  if (!userId || !targetId || userId === targetId) {
    return res.status(400).json({ error: "Invalid follow request" });
  }

  await User.findByIdAndUpdate(userId, { $addToSet: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } });

  return res.status(200).json({ ok: true });
};

export const unfollowUser = async (req, res) => {


  
  const userId = req.user?.id;
  const { targetId } = req.params;
  if (!userId || !targetId || userId === targetId) {
    return res.status(400).json({ error: "Invalid unfollow request" });
  }

  await User.findByIdAndUpdate(userId, { $pull: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $pull: { followers: userId } });

  return res.status(200).json({ ok: true });
};