import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "@/types";
import altogic from "@/libs/altogic";

export const context = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export default function AuthProvider({
  children,
  defaultUser,
}: {
  children: ReactNode;
  defaultUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(defaultUser);

  useEffect(() => {
    if (user) altogic.auth.setUser(user);
  }, [user]);

  return <context.Provider value={{ user, setUser }}>{children}</context.Provider>;
}
