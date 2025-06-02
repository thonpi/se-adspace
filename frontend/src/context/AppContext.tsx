"use client";

import { IUser } from "@/utils/api";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userPayload = await getCookie("payload");
      if (userPayload) {
        setUser(JSON.parse(userPayload).data.user);

        if (pathname !== "/") {
          window.location.href = "/";
        }
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
