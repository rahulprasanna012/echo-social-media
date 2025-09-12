import SecondaryButton from "../SecondaryButton";
import { PlusIcon, Search } from "lucide-react";
import ChatProfile from "./ChatProfile";
import { useChat } from "@/context/ChatContext.tsx";
import { useUser } from "@/context/UserContext.tsx";
import { useEffect } from "react";

const ChatList = () => {
  const { users, refreshUsers, selectedUser, setSelectedUser, unseen } =
    useChat();
  const unseenMap = unseen ?? {};

  const { onlineUser } = useUser();

  useEffect(() => {
    refreshUsers();
  }, [onlineUser, refreshUsers]);

  const getSelectedUser = (id: string) => {
    const u = users.find((item) => item._id === id) || null;
    setSelectedUser(u);
  };

  return (
    <section className="bg-white h-full w-full max-w-full md:max-w-[360px] shadow flex flex-col">
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-2xl">Message</h1>
          <SecondaryButton
            icon={<PlusIcon size={16} />}
            onClick={() => {}}
            style=""
            title=""
            type="button"
          />
        </div>

        <div className="flex items-center border border-purple-200 p-2 rounded-md">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="border-0 outline-none ml-2 flex-1"
          />
        </div>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
        {users?.map((profile) => (
          <ChatProfile
            username={profile.username}
            key={profile._id}
            profile={profile?.profile}
            id={profile._id}
            status={onlineUser.includes(profile._id) ? "online" : "offline"}
            unreadCount={unseenMap[profile._id]}
            getSelectedUser={getSelectedUser}
            userSelected={selectedUser?._id}
          />
        ))}
      </div>
    </section>
  );
};

export default ChatList;
