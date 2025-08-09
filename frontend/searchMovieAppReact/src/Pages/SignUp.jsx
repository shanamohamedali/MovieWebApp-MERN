import React, { useState } from "react";
import { FormLayout } from "../layouts/FormLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAddField } from "../hooks/useAddField";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../constants/Constants";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

export function SignUp() {
  const { field, handleChange } = useAddField({
    firstname: "",
    username: "",
    age: "",
    gender: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState({
    firstname: "",
    username: "",
    age: "",
    gender: "",
    password: "",
  });

  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    const requiredFields = [
      "firstname",
      "username",
      "age",
      "gender",
      "password",
    ];
    requiredFields.forEach((key) => {
      if (field[key] === "") {
        console.log("fdagsdfs", field[key]);
        newErrors[key] = "**This field is required";
        isValid = false;
      } else newErrors[key] = "";
    });

    if (
      field.username &&
      !/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(field.username.trim())
    ) {
      newErrors.username = "**Invalid format";
      isValid = false;
    }
    if (field.password && field.password.length < 6) {
      newErrors.password = "**Should have atleast 6 characters";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("fields....", field);
      const validateForm = validateAllFields();
      if (validateForm) {
        console.log("validation result", validateForm);
        const response = await axios(`${BASE_API}/users/`, {
          method: "POST",
          data: field,
        });
        if (response) {
          toast.success(response.message);
          navigate("/login");
        }
        toast.error(response.message);
      }
      toast.error("Form validation failed");
    } catch (error) {
      toast(error.message);
    }
  };
  return (
    <>
      <FormLayout
        label="Sign Up"
        Question="Already have an Account?"
        linkUserReg="/login"
        labeluserReg="Sign In"
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="FirstName"
            name="firstname"
            id="firstname"
            value={field.firstname}
            onChange={handleChange}
            onBlur={validateAllFields}
            required="true"
          />
          {error.firstname && <p className="text-error">{error.firstname}</p>}
          <Input
            type="text"
            placeholder="Email or Phone Number"
            name="username"
            id="username"
            value={field.username}
            onChange={handleChange}
            onBlur={validateAllFields}
          />
          {error.username && <p className="text-error">{error.username}</p>}

          <Input
            type="text"
            placeholder="Age"
            name="age"
            id="age"
            value={field.age}
            onChange={handleChange}
            onBlur={validateAllFields}
          />
          {error.age && <p className="text-error">{error.age}</p>}

          <div className="flex gap-4">
            <Input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
              onBlur={validateAllFields}
            />
            Male
            <Input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
              onBlur={validateAllFields}
            />
            Female
          </div>
          {error.gender && <p className="text-error">{error.gender}</p>}

          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={field.password}
            onChange={handleChange}
            onBlur={validateAllFields}
          />
          {error.password && <p className="text-error">{error.password}</p>}

          <Button label="Sign Up" type="Submit" />
        </form>
      </FormLayout>
      <ToastContainer />
    </>
  );
}
