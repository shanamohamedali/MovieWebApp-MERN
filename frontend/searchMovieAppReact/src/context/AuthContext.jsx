import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setLocalStorage, getLocalStorage, clearLocalStorage } =
    useLocalStorage();
  const [token, setToken] = useState(false);
  const [username,setUsername]=useState(getLocalStorage("userdata"));

  const login = (token,name) => {
    setLocalStorage("token",token);
    setLocalStorage("userdata",name)
    setToken(true);
    setUsername(getLocalStorage("userdata"));
    
  };

  const logout = () => {
    const local = clearLocalStorage("token");
    clearLocalStorage("userdata");
    setToken(false);
    setUsername(getLocalStorage("userdata"))
    // setUsername("");
    console.log("afterlogouttoken", local);
    //window.location.reload();
  };

  const isAuthenticated = getLocalStorage("token");
  console.log("tokenresAuth", isAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, token, login,username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
