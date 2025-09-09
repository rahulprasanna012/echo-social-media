// components/home/FeedComments.tsx
import React, { useState } from "react";
import ProfileIcon from "../ProfileIcon";
import { Send } from "lucide-react";
import type { FeedCommentsProps } from "@/types/post";
import NoComments from "./NoComments";
import FeedCommentsList from "./FeedCommentsList";

type Props = FeedCommentsProps & {
  onSubmitComment: (text: string) => Promise<void> | void;
  submitting?: boolean;
};

const FeedComments: React.FC<Props> = ({
  content,
  profile,
  username,
  commentsList,
  onSubmitComment,
  submitting,
}) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    const v = text.trim();
    if (!v) return;
    await onSubmitComment(v);
    setText("");
  };

  return (
    <section className="transform transition-all duration-300 ease-in-out">
      <div className="flex items-start w-full">
        {
          profile?    <img src={profile} alt={username} className="size-12 rounded-full mr-2"/>    :<ProfileIcon className="rounded-3xl size-12 mr-3" title={username[0]}/>
        }
        <textarea
          className="border border-purple-400 w-full textarea textarea-sm bg-white text-black"
          placeholder="Write a Comment...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex justify-end items-center">
        <button
          type="button"
          disabled={!text.trim() || submitting}
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-400 to-indigo-300 p-2 flex items-center px-4 text-white rounded-lg mt-2 cursor-pointer disabled:opacity-60"
        >
          <Send size={20} />
        <span className="ml-2">{submitting ? "Posting..." : "Comment"}</span>
        </button>
      </div>

      {content <= 0 && <NoComments />}

      <ul>
        {commentsList.map((item) => (
          <FeedCommentsList key={item._id} comment={item} />
        ))}
      </ul>
    </section>
  );
};

export default FeedComments;
