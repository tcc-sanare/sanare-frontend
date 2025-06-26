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
  caregiverId?: string;
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
  selfMonitor: SelfMonitor | null;
  token?: string | null;
  caregiver: Caregiver | null;
  reloadUser: (token: string) => Promise<void>;
  setUser: (user: User) => void;
  signOut: () => Promise<void>;
  //-------
  login: (user: User, token: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  login: () => { },
  logout: () => { },
  isAuthenticated: false,
  selfMonitor: null,
  caregiver: null,
  reloadUser: function (token: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setUser: function (user: User): void {
    throw new Error("Function not implemented.");
  },
  signOut: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
});

export const UserProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [selfMonitor, setSelfMonitor] = useState<SelfMonitor | null>(null);
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [token, setToken] = useState<string | null>(null);

  console.log({ user: { ...user, profilePhotoUrl: undefined}, selfMonitor, caregiver });

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      console.log("Token loaded from AsyncStorage:", token);
      if (!token) {
        setUser(null);
        return;
      }
      setToken(token);

      getAccount(token).then(({ account, selfMonitor, caregiver }) => {
        console.log("User account loaded:", account);
        setUser(account);
        setSelfMonitor(selfMonitor);
        setCaregiver(caregiver);
      })
    })
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        token,
        selfMonitor,
        reloadUser: async (token: string) => {

          const { account, selfMonitor, caregiver } = await getAccount(token);
          setUser(account);
          setSelfMonitor(selfMonitor);
          setCaregiver(caregiver);
        },
        caregiver,
        signOut: async () => {
          await AsyncStorage.removeItem("token");
          setUser(null);
          setSelfMonitor(null);
        },
        login: (user: User, token: string) => {
          setUser(user);
          setToken(token);
          AsyncStorage.setItem("token", token);
        },
        logout: () => {
          setUser(null);
          setToken(null);
          setSelfMonitor(null);
          setCaregiver(null);
          AsyncStorage.removeItem("token");
        },
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