import React, { useState } from "react";
import { useEffect,useRef } from "react";
//import axios from "axios";
import { BASE_API } from "../constants/Constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../utils/interceptors";

export const Profile = () => {
   const abortController=useRef(new AbortController());
  const {logout}=useAuth();
  const { getLocalStorage,clearLocalStorage } = useLocalStorage();
  const [userData,setUserData]=useState({firstname:"",
    age:"",
    gender:"",
    movies:""
  });

  const fetchUserProfile=async(req,res)=>{
     try {
      // const response = await axios(`${BASE_API}/users/`, {
      //   method: "GET",
      //   headers: {
      //     authorisation: getLocalStorage("token"),
      //   },
      // //inteceptor method
      const response=await axiosInstance("/users/",{
        signal:abortController.current.signal,
      });
   
        //console.log("resfshasg", response.data);
       setUserData(response.data);
      
    } catch (error) {
      console.log(error)
      // if(error.response.status=== 401){
      //   logout();
      }

    }

  
  useEffect(()=>{
   fetchUserProfile();
   return ()=>{
    abortController.current.abort();
   }
  }, []);

  console.log("userdata",userData);
  return (
    <div className="flex flex-col text-center">
      <h2>Name:{userData.firstname}</h2>
      <h2>Age:{userData.age}</h2>
      <h2>Gender:{userData.gender}</h2>
     
      <ToastContainer />
    </div>
  );
};
