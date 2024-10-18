import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../service/auth.services";
import { IAccount } from "../interfaces/account";
interface IAuthContext {
  handleLogout: () => Promise<void>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: IAccount | null;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IAccount | null>(null);

  const handleLogout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };
  const userData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const response = await auth.getAccountId(storedToken);
        setUser(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      userData(); 
  }, [token]);

  
  
  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        token,
        setToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMovies deve ser usado dentro de um MovieProvider");
  }
  return context;
};
