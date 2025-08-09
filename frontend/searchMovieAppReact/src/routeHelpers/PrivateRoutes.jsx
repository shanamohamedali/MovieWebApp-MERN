import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import  {Navigate,Outlet} from "react-router-dom"

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
};

export const ProtectedRouteAfterLogin=()=>{
  const {isAuthenticated}=useAuth();
  return !isAuthenticated?<Outlet/>:<Navigate to="/home"/>;
  };



