// components/home/Feeds.tsx
import type { FeedReactionProps, PostTypes, Comment } from "@/types/post";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  HeartIcon,
  MessageCircle,
  Send,
} from "lucide-react";
import { useEffect, useState, type FC } from "react";

import FeedProfile from "./FeedProfile";
import FeedLabel from "./FeedLabel";
import FeedReaction from "./FeedReaction";
import FeedComments from "./FeedComments";

import {
  toggleLike,
  addComment,
  getComments,
  incrementShare,
} from "@/services/postService";
import { useUser } from "@/context/UserContext";
import { useLocation } from "react-router-dom";

interface PropsTypes {
  post: PostTypes;
}

const Feeds: FC<PropsTypes> = ({ post }) => {
  const { user } = useUser();
  const userId = user?._id;

  // ---- initial counts
  const initialLikes =
    typeof post.likes_count === "number"
      ? post.likes_count
      : post.likes?.length ?? 0;

  const initialCommentsCount =
    typeof post.comments_count === "number"
      ? post.comments_count
      : post.comments?.length ?? 0;

  const initialShareCount = post.shareCount ?? 0;

  const [likesCount, setLikesCount] = useState<number>(initialLikes);
  const [commentsCount, setCommentsCount] =
    useState<number>(initialCommentsCount);
  const [shareCount, setShareCount] = useState<number>(initialShareCount);
  const [commentsList, setCommentsList] = useState<Comment[]>(
    post.comments ?? []
  );
  const [isComment, setIsComment] = useState<boolean>(false);

  const calcInitialLiked = () => {
    if (!userId) return false;
    return Boolean(post.likes?.some((id) => String(id) === String(userId)));
  };
  const [liked, setLiked] = useState<boolean>(calcInitialLiked());

  useEffect(() => {
    setLikesCount(
      typeof post.likes_count === "number"
        ? post.likes_count
        : post.likes?.length ?? 0
    );
    setCommentsCount(
      typeof post.comments_count === "number"
        ? post.comments_count
        : post.comments?.length ?? 0
    );
    setShareCount(post.shareCount ?? 0);
    setCommentsList(post.comments ?? []);
    setLiked(calcInitialLiked());
  }, [post._id]);

  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [sharing, setSharing] = useState(false);

  const onToggleLike = async () => {
    if (!userId || liking) return;

    setLiking(true);
    const prevLiked = liked;

    setLiked(!prevLiked);
    setLikesCount((c) => c + (prevLiked ? -1 : 1));

    try {
      const res = await toggleLike(post._id);
      if (typeof res?.likesCount === "number") setLikesCount(res.likesCount);
      if (typeof res?.liked === "boolean") setLiked(res.liked);
    } catch (e) {
      setLiked(prevLiked);
      setLikesCount((c) => c + (prevLiked ? 1 : -1));
      console.error(e);
    } finally {
      setLiking(false);
    }
  };

  const onSubmitComment = async (text: string) => {
    if (!userId) return;
    setCommenting(true);
    try {
      const res = await addComment(post._id, text);
      setCommentsList(res.comments as Comment[]);
      setCommentsCount(res.commentsCount);
    } catch (e) {
      console.error(e);
    } finally {
      setCommenting(false);
    }
  };

  // ---- Comments open & (optionally) fetch
  const onToggleComments = async () => {
    const next = !isComment;
    setIsComment(next);
    if (next && commentsList.length === 0) {
      try {
        const res = await getComments(post._id);
        setCommentsList(res.comments as Comment[]);
        setCommentsCount(res.commentsCount);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // ---- SHARE
  // SHARE (copy link to clipboard + increment count)
const onShare = async () => {
  if (sharing) return;
  setSharing(true);

  try {
    const postUrl = `${window.location.origin}/post/${post._id}`; // e.g. http://localhost:5173/post/123
    await navigator.clipboard.writeText(postUrl); // copy link

    // Optional: also update backend share count
    const res = await incrementShare(post._id);
    setShareCount(res.shareCount);

    // Give user feedback
    alert("Post link copied to clipboard!");
  } catch (e) {
    console.error("Share failed", e);
    alert("Failed to copy link");
  } finally {
    setSharing(false);
  }
};

  // ---- Render
  const { _id, author, createdAt, content, image, label } = post;

  const reactions: FeedReactionProps[] = [
    {
      icon: <HeartIcon />,
      content: likesCount,
      onClick: onToggleLike,
      active: liked,
      title: "Like",
      disabled: liking,
    },
    {
      icon: <MessageCircle />,
      content: commentsCount,
      onClick: onToggleComments,
      title: "Comments",
    },
    {
      icon: <Send />,
      content: shareCount,
      onClick: onShare,
      title: "Share",
      disabled: sharing,
    },
  ];

  const location = useLocation();

  return (
    <section
      className="bg-white p-6 rounded-lg my-6 shadow hover:shadow-purple-300"
      key={_id}
    >
      {(location.pathname === "/" || location.pathname === "/home") && (
        <FeedProfile author={author} date={createdAt} />
      )}

      {content && <div className="mt-2 whitespace-pre-wrap">{content}</div>}

      {image && (
        <img src={image} alt="post" className="w-full rounded-2xl mt-6" />
      )}

      <ul className="flex items-center justify-start py-6 flex-wrap gap-2">
        {label?.map((item, idx) => (
          <FeedLabel key={idx} label={item} />
        ))}
      </ul>

      <div className="flex justify-between py-6">
        <ul className="flex justify-around w-60">
          {reactions.map((item, idx) => (
            <FeedReaction
              key={idx}
              icon={item.icon}
              content={item.content}
              onClick={item.onClick}
              active={item.active}
              title={item.title}
              disabled={item.disabled}
            />
          ))}
        </ul>
        <Bookmark className="cursor-pointer" />
      </div>

      <hr className="text-gray-200" />

      <button
        type="button"
        className="my-6 p-2.5 rounded-md flex items-center justify-between w-full cursor-pointer hover:bg-purple-100 hover:text-purple-600"
        onClick={onToggleComments}
      >
        <div className="flex items-center">
          <MessageCircle />
          <p className="ml-2">Comments</p>
        </div>
        {isComment ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isComment && (
        <FeedComments
          profile={author.profile}
          username={author.username}
          date={createdAt}
          content={commentsCount}
          commentsList={commentsList}
          onSubmitComment={onSubmitComment}
          submitting={commenting}
        />
      )}
    </section>
  );
};

export default Feeds;
