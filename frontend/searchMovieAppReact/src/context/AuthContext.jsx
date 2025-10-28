import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/interceptors";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setLocalStorage, getLocalStorage, clearLocalStorage } =
    useLocalStorage();
  const [token, setToken] = useState(getLocalStorage("token"));
  const [user,setUser]=useState(getLocalStorage("userdata"));

  const login = (token,_id,name,role) => {
    const userData={_id,name,role};
    setLocalStorage("token",token);
    setLocalStorage("userdata",userData)
    setToken(true);
    setUser(getLocalStorage("userdata"));
    
  };

  const logout = async() => {
    clearLocalStorage("token");
    clearLocalStorage("userdata");
    setToken(null);
    setUser(null);
    //console.log("afterlogouttoken", local);
    window.location.reload();
  };

  const isAuthenticated = !!token
  console.log("tokenresAuth", isAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, token, login,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>  useContext(AuthContext);
