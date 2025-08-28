import React, { useContext, useEffect, useState } from "react";
import { useAddField } from "../hooks/useAddField";
import {useAuth } from "../context/AuthContext";
import { replace, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FormLayout } from "../layouts/FormLayout";
import {Input} from "../components/Input"
import {Button} from "../components/Button";
//import axios from "axios";
import {axiosInstance} from "../utils/interceptors"
import { BASE_API } from "../constants/Constants";
import{toast, ToastContainer} from "react-toastify";



export function Login() {
  const navigate = useNavigate();
  const { login,isAuthenticated } = useAuth();
  const { getLocalStorage,setLocalStorage } = useLocalStorage("token");

  const { field, handleChange } = useAddField({
    username: "",
    password: "",
  });
  const [error, seterror] = useState({ username: "", password: "" });
  console.log(field);

  // useEffect(() => {
  //  isAuthenticated? navigate("/home") : navigate("/login");
  // }, []);

   const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (validateUsername() && validatePassword()) {
        const response=await axiosInstance('/users/login/',
          {
            method:"POST",
            withCredentials:true,
            data:field,
          }
        )
        if(response)
       {
        const{accessToken,firstname,role}=response.data;
        console.log("response login..",response);
          toast.success(response.data.message);
          login(accessToken,firstname,role);
          if(role==="user") navigate("/home");
          if(role==="admin") navigate("/dashboard");
         
        }
      }
      toast.error("Form validation failed")
    } catch (error) {
     // console.log("...........",error)
      toast.error(error.response.data.message);
     //toast.error("Incorrect username/password ")
    }
  };


  const validateUsername = () => {
    if (field.username === "") {
      seterror((prev) => ({
        ...prev,
        username: "Required",
      }));
      return false;
    } else if (!/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(field.username)) {
      seterror((prev) => ({
        ...prev,
        username: "Invalid Format",
      }));
      return false;
    }
    seterror((prev) => ({
      ...prev,
      username: "",
    }));
    return true;
  };

  const validatePassword = () => {
    if (field.password === "") {
      seterror((prev) => ({
        ...prev,
        password: "Required",
      }));
      return false;
    }else if ((field.password).length < 6) {
      seterror((prev) => ({
        ...prev,
        password: "Password should have atleast 6 characters",
      }));
      return false;
    }
    seterror((prev) => ({
      ...prev,
      password: "",
    }));
    return true;
  };

 
  return (
    <>
      <FormLayout label="Sign In"
      linkForgotPassword="/forget-password"
      labelForgotPassword="Forgot Password?"
      Question="New to ReelMagic?"
      linkUserReg="/signup"
      labeluserReg="Sign Up"
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email or Phone Number"
            name="username"
            id="username"
            value={field.name}
            onChange={handleChange}
            onBlur={validateUsername}
          />
          {error.username && <p className="text-error">{error.username}</p>}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={field.name}
            onChange={handleChange}
            onBlur={validatePassword}
          />
          {error.password && <p className="text-error">{error.password}</p>}
          <Button
            type="submit" 
            label="Sign In"
          />
        
        </form>
     
      </FormLayout>
      <ToastContainer/>
    </>
  );
}
