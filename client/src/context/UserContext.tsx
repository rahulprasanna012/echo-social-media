// context/UserContext.tsx
import { getMe } from "@/services/userService.ts";
import React, {
  createContext, useContext, useState, useMemo, useCallback, useEffect, type ReactNode
} from "react";

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

useEffect(() => {
  const init = async () => {
    try {
      const freshUser = await getMe();
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
    }),
    [errors, handleError, handleUser, user, handleLoading, loading]
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
