// context/UserContext.tsx
import { getMe } from "@/services/userService.ts";
import React, {
  createContext, useContext, useState, useMemo, useCallback, useEffect, type ReactNode
} from "react";

import {io} from "socket.io-client"

type UserTypes = {
  name: string;
  email: string;
  username: string;
  _id: string;
  bio?: string;
  profile?: string;
  cover_image?: string;
  followers?: string[];
  following?: string[];
};

type ContextValueTypes = {
  errors: string;
  handleError: (err: string) => void;
  handleUser: (data: UserTypes | null) => void;
  user: UserTypes | null;
  handleLoading: (state: boolean) => void;
  loading: boolean;
  connectSocket:any;
  socket:any;
  onlineUser:any
};

const UserContext = createContext<ContextValueTypes | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Read localStorage ONCE
  const [user, setUser] = useState<UserTypes | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? (JSON.parse(raw) as UserTypes) : null;
    } catch {
      return null;
    }
  });

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineUser,setOnlineUser]=useState([])
  const [socket,setSocket]=useState<any>(null)

  const backendUrl=import.meta.env.VITE_BASE_SOCKET

  const connectSocket=(userData:any)=>{

    if(!userData || socket?.connected) return;
    const newSocket=io(backendUrl,{
      query:{
        userId:userData._id,
        withCredentials: true,
        
      }
    })
    newSocket.connect()
    setSocket(newSocket)
    newSocket.on("getOnlineUsers",(userIds)=>{

      setOnlineUser(userIds)
    })
  }


useEffect(() => {
  const init = async () => {
    try {
      const freshUser = await getMe();
      connectSocket(user)
      setUser(freshUser);
    } catch {
      setUser(null);
    }
  };
  init();
}, []);

  const handleUser = useCallback((data: UserTypes | null) => setUser(data), []);
  const handleLoading = useCallback((state: boolean) => setLoading(state), []);
  const handleError = useCallback((err: string) => setErrors(err), []);

  const value = useMemo(
    () => ({
      errors,
      handleError,
      handleUser,
      user,
      handleLoading,
      loading,
      socket,
      connectSocket,
      onlineUser
    }),
    [errors, handleError, handleUser,onlineUser, user, handleLoading, loading]
  );

  // Debug
  // console.log("ctx user:", user);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within an UserProvider");
  return ctx;
};
