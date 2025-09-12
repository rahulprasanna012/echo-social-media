import { type FC, useState } from "react";
import ProfileIcon from "../ProfileIcon";
import type { FeedProfileProps } from "@/types/post";
import { followUser, getMe, unfollowUser } from "@/services/userService";
import { useUser } from "@/context/UserContext"; // your logged-in user context

const FeedProfile: FC<FeedProfileProps> = ({ author, date }) => {


  const datetime = date ? new Date(date) : null;
  const { user } = useUser(); // logged-in user
  const [isFollowing, setIsFollowing] = useState(
    user?.following?.includes(author._id) || false
  );
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(author._id);
        setIsFollowing(false);
      } else {
        await followUser(author._id);
        setIsFollowing(true);
      }
      getMe()
    } catch (err) {
      console.error("Follow error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center py-6">
        {author.profile ? (
          <img
            src={author.profile}
            alt={author.username}
            className="rounded-3xl size-12 mr-2"
          />
        ) : (
          <ProfileIcon className="rounded-3xl size-12 mr-2" title={author.username[0].toUpperCase()} />
        )}

        <div>
          <p className="font-bold">{author.username}</p>
          <p className="text-purple-600 text-sm">
            {datetime
              ? datetime.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>
      </div>

      {user?._id !== author._id && (
        <button
          disabled={loading}
          onClick={toggleFollow}
          className={`border p-1 px-4 rounded-3xl cursor-pointer text-white ${
            isFollowing
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
          }`}
        >
          {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FeedProfile;
