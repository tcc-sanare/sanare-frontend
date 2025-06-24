import { getAccount } from "@/http/get-account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  theme: string;
  profilePhotoUrl?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelfMonitor {
  id: string;
  accountId: string;
  createdAt: Date;
  updatedAt?: Date;
  logsInputs: {
    imc: boolean;
    mood: boolean;
    symptoms: boolean;
    hydration: boolean;
    bloodSugar: boolean;
    bloodPressure: boolean;
  } | null;
}

export interface Caregiver {
  id: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type UserContextType = {
  isAuthenticated: boolean;
  user: User | null | undefined;
  selfMonitor: any;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [selfMonitor, setSelfMonitor] = useState<SelfMonitor | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (!token) {
        setUser(null);
        return;
      }

      getAccount(token).then(({ account, selfMonitor }) => {
        setUser(account);
        setSelfMonitor(selfMonitor);
      })
    })
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        selfMonitor
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};