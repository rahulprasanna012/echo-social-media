import React from "react";
import ProfileIcon from "../ProfileIcon";
import { Send } from "lucide-react";
import type { FeedCommentsProps } from "@/types/post";
import NoComments from "./NoComments";
import FeedCommentsList from "./FeedCommentsList";


const FeedComments:React.FC<FeedCommentsProps> = ({content,userId,date,commentsList}) => {

    console.log(commentsList)
  return (
    <section className="transform transition-all duration-700 ease-in-out">
      <div className=" flex items-start w-full">
        <ProfileIcon className="rounded-3xl size-11 mr-2" title="P" />
        <textarea
          className="border border-purple-400 w-full textarea textarea-sm bg-white text-black"
          placeholder="Write a Comment...."
        ></textarea>
      </div>
      <div className="flex justify-end items-center">
        <button className="  bg-linear-to-r from-purple-400  to-indigo-300 p-2 flex items-center px-4 text-white rounded-lg mt-2 cursor-pointer">
          <Send size={20} />
          <span className="ml-2">Comment</span>
        </button>
      </div>

      {
        content<=0&&<NoComments/>
      }
      
      <ul>
        {
            commentsList.map((item,idx)=>(
                <FeedCommentsList key={idx} userId={userId} date={date} comment={item}/>
            ))
        }
      </ul>
    </section>
  );
};

export default FeedComments;
