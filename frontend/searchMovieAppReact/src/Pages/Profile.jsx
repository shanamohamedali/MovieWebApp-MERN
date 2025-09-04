import React, { useState } from "react";
import { useEffect,useRef } from "react";
//import axios from "axios";
import { BASE_API } from "../constants/Constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../utils/interceptors";
import { FaUser } from "react-icons/fa";

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
    <div className="flex flex-col text-center items-center my-[50px]">
      <FaUser size={50}/>
      <div className="pt-5">
        <h4>Name:{userData.firstname}</h4>
      <h4>Age:{userData.age}</h4>
      <h4>Gender:{userData.gender}</h4>
      </div>
     
      <ToastContainer />
    </div>
  );
};
