import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateSocketOptions, YappioClient } from "yappio-client";
import { YappioClientOptions } from "yappio-client";

interface AuthContextType {
  client: YappioClient;
  isClientInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client] = useState<YappioClient>(
    new YappioClient({
      baseUrl: process.env.REACT_APP_DOMAIN,
    } as YappioClientOptions)
  );
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  useEffect(() => {
    const initSocket = (act: string) => {
      const socket = client.socket({
        url: process.env.REACT_APP_DOMAIN,
      } as CreateSocketOptions);
      socket.connect(act);
    };

    const initClient = async () => {
      if (client.isInitialized()) {
        setIsClientInitialized(true);
        initSocket(localStorage.getItem("act") as string);
      }
      else if (client.initializeFromStorage().success) {
        setIsClientInitialized(true);
        initSocket(localStorage.getItem("act") as string);
      } else {
        const act = process.env.REACT_APP_ACT as string;
        const result = await client.initialize(act);
        if (!result.success) {
          console.error("Failed to initialize YappioClient:", result.message);
          setIsClientInitialized(false);
        } else {
          initSocket(act);
          setIsClientInitialized(true);
        }
      }
    };

    initClient();
  }, [client]);

  return (
    <AuthContext.Provider value={{ client, isClientInitialized }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
