import type { Sidelist } from "@/types/sidebar";
import { v4 as uuidv4 } from "uuid";
import SlideList from "./SlideList";
import ProfileIcon from "../ProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, handleUser,socket } = useUser(); // so we can clear on logout

  const loggedOut = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");   // if you also store it here
    handleUser(null);   
    socket.disconnect();                // clear context user
    navigate("/login", { replace: true });
  };

  const profileLink = user?._id ? `/profile/${user._id}` : "/profile";

  const SIDEITEMS: Sidelist[] = [
    { id: uuidv4(), title: "Home",     link: "/" },
    { id: uuidv4(), title: "Messages", link: "/message" },
    { id: uuidv4(), title: "Profile",  link: profileLink }, // <-- dynamic
    { id: uuidv4(), title: "Create",   link: "/create" },
  ];

  const displayName = user?.name || "User";
  const initial = user?.name?.[0] ?? "U";

  return (
    <section className="bg-purple-50/70 h-full w-72 flex flex-col justify-evenly">
      <div className="px-4 flex items-center justify-center mr-4">
        <div className="text-white font-bold bg-linear-to-br from-purple-600 to-indigo-600 mr-4 rounded-3xl size-14 flex items-center justify-center shadow-lg">
          <p>EH</p>
        </div>
        <div>
          <h1 className="text-black font-bold text-2xl">Echo Hub</h1>
          <p className="text-purple-600">Connect & Share</p>
        </div>
      </div>

      <hr className="text-gray-200" />

      <div className="px-6">
        <ul>
          {SIDEITEMS.map((item) => (
            <SlideList key={item.id} {...item} />
          ))}
        </ul>
      </div>

      <hr className="text-gray-200" />

      <div className="dropdown dropdown-top dropdown-center">
        <div tabIndex={0} role="button" className="p-4 mr-4 flex items-center justify-center text-black">
          {user?.profile ? (
            <img src={user.profile} alt={displayName} className="size-12 rounded-full mr-2" />
          ) : (
            <ProfileIcon className="rounded-3xl size-12 mr-3" title={initial} />
          )}
          <div>
            <p>{displayName}</p>
            <p className="text-purple-600">@{user?.username}</p>
          </div>
        </div>

        <ul tabIndex={0} className="dropdown-content bg-white menu rounded-box z-1 w-52 p-2 shadow-sm">
          <li className="text-black p-2 hover:text-purple-600 hover:bg-purple-300/20 cursor-pointer rounded-xl">
            <Link to={profileLink}>
              <div className="flex">
                <UserIcon />
                <p className="ml-3">profile</p>
              </div>
            </Link>
          </li>
          <li className="text-red-600 p-2 hover:bg-purple-300/20 cursor-pointer rounded-xl">
            <button onClick={loggedOut}>
              <div className="flex">
                <LogOut />
                <p className="ml-3">logout</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
