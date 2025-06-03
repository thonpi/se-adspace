"use client";

import { IUser } from "@/api-services/api";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  user: IUser | null;
  token: string;
  errorMsg?: string;
  successMsg?: string;
  setErrorMsg: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
  setUserWithToken: (user: IUser | null, token: string) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const setUserWithToken = (user: IUser | null, token: string) => {
    setUser(user);
    setToken(token);
  };
  const pathname = usePathname();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userPayload = await getCookie("payload");
      if (userPayload) {
        const userData = JSON.parse(userPayload).data;
        setUser(userData.user);
        setToken(userData.accessToken);

        if (pathname !== "/") {
          window.location.href = "/";
        }
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        errorMsg,
        setErrorMsg,
        successMsg,
        setSuccessMsg,
        setUserWithToken,
      }}
    >
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
