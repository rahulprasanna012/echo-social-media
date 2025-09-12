import ProfileIcon from "@/components/ProfileIcon.tsx";
import React from "react";

type ChatProfileTypes = {
  id: string;
  username: string;
  profile: string|undefined;
  userSelected?: string;
  getSelectedUser: (id: string) => void;
  unreadCount?: number;
  status?: "online" | "offline";
};

const ChatProfile: React.FC<ChatProfileTypes> = ({
  id,
  username,
  profile,
  userSelected,
  getSelectedUser,
  unreadCount = 0,
  status = "offline",
}) => {
  const isSelected = id === userSelected;

  

  return (
    <button
      type="button"
      onClick={() => getSelectedUser(id)}
      className={`w-full flex items-center justify-between p-4 hover:bg-purple-100 cursor-pointer transition ${
        isSelected ? "bg-purple-100" : ""
      }`}
    >
      <div className="flex items-center">
        {
            profile?<img
          src={profile}
          alt={`${username} profile`}
          className="rounded-full size-14 border"
        />:          <ProfileIcon className="rounded-full size-14 mr-2" title={username[0].toUpperCase()} />

        }
        <div className="ml-3 text-left">
          <p className="font-semibold">{username}</p>
          <p
            className={`text-sm ${
              status === "online" ? "text-green-600" : "text-gray-400"
            }`}
          >
            {status}
          </p>
        </div>
      </div>

      {/* Right: unread count */}
      {unreadCount > 0 && (
        <span className="flex items-center justify-center text-xs font-medium bg-purple-600 text-white rounded-full size-6">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default ChatProfile;
