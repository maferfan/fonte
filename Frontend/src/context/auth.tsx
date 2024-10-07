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
    sessionId: string | null;
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
    handleToken: () => Promise<void>;
    setAccount: React.Dispatch<React.SetStateAction<IAccount>>;
    account: IAccount;
  }
  
  const AuthContext = createContext<IAuthContext | undefined>(undefined);
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [account, setAccount] = useState<IAccount>({} as IAccount);
  
    const handleToken = async () => {
      try {
        const response = await auth.getAuth();
        if (response.request_token) {
          localStorage.setItem("request_token", response.request_token);
          window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:3000`;
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        const request_token = localStorage.getItem("request_token");
         const storedSessionId = localStorage.getItem("session_id");
        if (!storedSessionId && request_token) {
          const response = await auth.postSessionAuth(request_token as string);
          if (response?.session_id) {
            localStorage.setItem("session_id", response.session_id);
            setSessionId(response.session_id);
          }
        } 
      };
      fetchData();
    }, [sessionId]);
  
    useEffect(() => {
      const sessionIdFromStorage = localStorage.getItem("session_id");
      if (sessionIdFromStorage) {
        setSessionId(sessionIdFromStorage);
      }
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(sessionId){
            const response = await auth.getAccountId(sessionId)
            setAccount(response)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }, [sessionId])
    
    return (
      <AuthContext.Provider
        value={{
          sessionId,
          setSessionId,
          handleToken,
          account,
          setAccount
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
  