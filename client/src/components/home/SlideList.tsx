import { House, MessageCircle, SquarePen, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { Sidelist } from "@/types/sidebar";

const ICONS: Record<string, React.ReactNode> = {
  home: <House />,
  messages: <MessageCircle />,
  profile: <User />,
  create: <SquarePen />,
};

const SlideList: React.FC<Sidelist> = ({ id, title, link }) => {
  const icon = ICONS[title.toLowerCase()] ?? null;

  return (
    <li key={id}>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `text-black flex p-2 rounded-xl my-1 hover:text-purple-600 hover:bg-purple-300/20 ${
            isActive ? "text-purple-600 bg-purple-300/20" : ""
          }`
        }
      >
        {icon}
        <p className="ml-3">{title}</p>
      </NavLink>
    </li>
  );
};

export default SlideList;
