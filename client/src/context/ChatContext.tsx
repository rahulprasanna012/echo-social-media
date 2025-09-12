// context/ChatContext.tsx
import { useUser } from "@/context/UserContext.tsx";
import {
  getMessage,
  getSideBarUsers,
  seenMessage,
  sendMessage as sendMessageAPI,
} from "@/services/messageService.ts";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";

type UserLite = {
  _id: string;
  name: string;
  username: string;
  profile?: string;
};

type ChatMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  mediaUrl?: string;
  createdAt: string;
  seen?: boolean;
};

type UnseenMap = Record<string, number>;

type ChatContextValue = {
  users: UserLite[];
  refreshUsers: () => Promise<void>;
  messages: ChatMessage[];
  selectedUser: UserLite | null;
  setUnseen:any,
  setSelectedUser: (u: UserLite | null) => void;
  unseen: UnseenMap;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (payload: { text?: string; media?: File | null }) => Promise<void>;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useUser();

  const [users, setUsers] = useState<UserLite[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserLite | null>(null);
  const [unseen, setUnseen] = useState<UnseenMap>({});

  // Fetch sidebar users + unseen counts
  const refreshUsers = useCallback(async () => {
    const res = await getSideBarUsers(); // expects { users, unseenMessages }
    setUsers(res.users as UserLite[]);
    setUnseen(res.unseenMessages as UnseenMap);
  }, []);

  // Fetch conversation messages with a user
  const getMessages = useCallback(async (userId: string) => {
    const res = await getMessage(userId); // expects ChatMessage[]
    setMessages(res as ChatMessage[]);
    // Since we just opened the thread, clear unseen counter for that user
    setUnseen((prev) => {
      if (!prev[userId]) return prev;
      const next = { ...prev };
      delete next[userId];
      return next;
    });
  }, []);

  // Send a message to the selected user
  const sendMessage = useCallback(
    async (payload: { text?: string; media?: File | null }) => {
      if (!selectedUser) return;
      const res = await sendMessageAPI(selectedUser._id, payload);
      setMessages((prev) => [...prev, res as ChatMessage]);
    },
    [selectedUser]
  );

  // Handle incoming messages via socket
  useEffect(() => {
    if (!socket) return;

    const s = socket as Socket;

    // Ensure we don't stack duplicate listeners
    s.off("newMessage");

    const onNewMessage = async (newMessage: ChatMessage) => {
      // If this message is from the user we’re currently chatting with
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        // Fire-and-forget mark-as-seen
        void seenMessage(newMessage._id);
      } else {
        // Increment unseen count for that sender
        setUnseen((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    };

    s.on("newMessage", onNewMessage);

    return () => {
      s.off("newMessage", onNewMessage);
    };
  }, [socket, selectedUser]);

  // Initial sidebar load
  useEffect(() => {
    void refreshUsers();
  }, [refreshUsers]);

  const value: ChatContextValue = {
    users,
    refreshUsers,
    messages,
    selectedUser,
    setSelectedUser,
    unseen,
    setUnseen,
    getMessages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
};
