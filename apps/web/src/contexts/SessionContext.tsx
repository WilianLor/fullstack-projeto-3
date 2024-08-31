import { createContext, ReactNode, useEffect, useState } from "react";
import api, { ApiResponse } from "../services/api";
import { toast } from "react-toastify";
import { TokensData } from "./types";

interface SessionContextType {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLogged?: boolean;
}

interface SessionContextProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    const tokens = window.localStorage.getItem("tokens");

    setIsLogged(!!tokens);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const response = await api.post<ApiResponse<TokensData>>("/auth/login", {
      username,
      password,
    });

    if (response.data.status === "success") {
      window.localStorage.setItem("tokens", JSON.stringify(response.data.data));

      setIsLogged(true);

      window.location.href = "/";
    } else {
      toast(response.data.message, { type: "error" });
    }
  };

  const logout = () => {
    window.localStorage.removeItem("tokens");
    setIsLogged(false);
  };

  return (
    <SessionContext.Provider value={{ login, logout, isLogged }}>
      {children}
    </SessionContext.Provider>
  );
};
