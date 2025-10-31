import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BASE_API } from "../constants/Constants";
//"http://localhost:3007/api"

const { getLocalStorage, clearLocalStorage,setLocalStorage } = useLocalStorage();

export const axiosInstance = axios.create({
baseURL: BASE_API,
});

//case-1----------------Access Token only--------------------
//attach token on request
axiosInstance.interceptors.request.use(
   
  (request) => {
     console.log("request.............",request);
    const token = getLocalStorage("token");
    console.log("..token received", token);
    if (token) {
      request.headers.authorisation = token;
    }
    return request;
  },
  (error) => error
);

//Api unAuthorised
axiosInstance.interceptors.response.use(
  (response) =>response,
  (error) => {
    //console.log("eroooooor",error);
    if (error.response.status === 401) {
      setLocalStorage("token",null);
      clearLocalStorage("token");
      window.location.href="/login"
    }
    return Promise.reject(error);
  }
);


// //case-2 Access Token and refresh token

// //token rotation
// axiosInstance.interceptors.response.use(
// (response)=>response,
// async(error)=>{
//   if(error.response.status===401){
//     const response=await axiosInstance("/users/refresh-token");
//     setLocalStorage("token",response.data.accessToken)
//     //window.location.reload();
//   }
//   return Promise.reject(error);
// });

// //attachtokenon request
// axiosInstance.interceptors.request.use(
//  (request)=>{
//     const token= getLocalStorage("token");
//     console.log("..token received", token);
//     if(token){
//       request.headers.authorisaton=token;
//       request.withCredentials=true;
//     }
//     return request;
//   },
//   (error)=>error
// )



