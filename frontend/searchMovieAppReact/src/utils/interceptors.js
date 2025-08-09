import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const axiosInstance = axios.create({
baseURL: "http://localhost:3007/api",
});
const { getLocalStorage, clearLocalStorage } = useLocalStorage();

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
      clearLocalStorage("token");
      window.location.href("/login");
    }
    return Promise.reject(error);
  }
);
