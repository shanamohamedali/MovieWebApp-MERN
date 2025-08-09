import { AuthContext, useAuth } from "../context/AuthContext"
import { ToastContainer,toast } from "react-toastify";

export const genericError=(error)=>{
    const {logout}=useAuth();

    if(error.response.status === 401){
        logout();
    }
 else if(error.response.status=== 404){
 toast(error.response.message);
 }
}