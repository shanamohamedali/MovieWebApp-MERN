import { useState } from "react";

export const useAddField = (initialValue) => {
  const [field, setField] = useState(initialValue);
console.log("....initial value",initialValue);

  const handleChange = (e) => {
    setField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleFile = (e) => {
    setField((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;
    const normaliseValue=String(value); 
    
    let currentArray = Array.isArray(field[name]) ? field[name] : [];
    console.log("...hgfsf", currentArray);
    const updatedArray = checked
      ? Array.from(new Set([...currentArray, normaliseValue]))
      : currentArray.filter((item) => item !== normaliseValue);

    setField((prev) => ({
      ...prev,
      [name]: updatedArray,
    }));
  };

  const clearField=()=>{
    setField("");
  }

  return {
    field,
    setField,
    handleChange,
    handleFile,
    handleCheckbox,
    clearField,
  };
};
