import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedRouteAfterLogin = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Outlet />;
  if (user?.role === "user") return <Navigate to="/home" />;
  if (user?.role === "admin") return <Navigate to="/dashboard" />;
  return <Outlet />;
};

// export const AdminProtectedRoute=()=>{
// const { isAuthenticated, user } = useAuth();
// isAuthenticated && user.role==="admin"? <Outlet />:<Navigate to="/login" />;
// }