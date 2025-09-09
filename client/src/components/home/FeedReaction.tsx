// components/home/FeedReaction.tsx
import { type FC, type ReactNode } from "react";

export type FeedReactionProps = {
  icon: ReactNode;
  content: number | string;
  onClick?: () => void;
  active?: boolean;
  title?: string;
  disabled?: boolean;
};

const FeedReaction: FC<FeedReactionProps> = ({ icon, content, onClick, active, title, disabled }) => {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center cursor-pointer p-1.5 rounded-md
        ${active ? "text-red-500 bg-red-50" : "hover:bg-purple-50 hover:text-purple-600"}
        disabled:opacity-60
      `}
    >
      {icon}
      <p className="ml-2">{content}</p>
    </button>
  );
};

export default FeedReaction;
