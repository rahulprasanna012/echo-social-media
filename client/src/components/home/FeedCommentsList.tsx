// components/home/FeedCommentsList.tsx
import React from "react";
import ProfileIcon from "../ProfileIcon";
import type { Comment } from "@/types/post";

type FeedCommentsListProps = {
  comment: Comment;
};

const FeedCommentsList: React.FC<FeedCommentsListProps> = ({ comment }) => {
  const dt = new Date(comment.createdAt);
  const initial = comment.user.username?.[0]?.toUpperCase() ?? "U";

  return (
    <li className="flex items-center mb-2">
      {comment.user.profile ? (
        <img src={comment.user.profile} alt={comment.user.username} className="rounded-3xl size-10 mr-2" />
      ) : (
        <ProfileIcon className="rounded-3xl size-10 mr-2" title={initial.toUpperCase()} />
      )}

      <div>
        <div className="md:flex items-center space-x-2">
          <p className="font-semibold text-md">{comment.user.username}</p>
          <p className="text-[12px] md:text-sm text-gray-400">
            {dt.toLocaleString("en-GB", { day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit" })}
          </p>
        </div>
        <p className="text-sm mt-2">{comment.text}</p>
      </div>
    </li>
  );
};

export default FeedCommentsList;
