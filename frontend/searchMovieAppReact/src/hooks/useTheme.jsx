import { react,useState,useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const{setLocalStorage,getLocalStorage}=useLocalStorage();
  const [darkMode, setDarkMode] = useState(false);
  // const darkModeToggler = () => {
  //   setDark(!dark);
  //   document.body.classList.toggle("dark", !darkMode);
  // };

  useEffect(() => {
    const savedTheme = getLocalStorage("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", newTheme === "dark");
    setLocalStorage("theme", newTheme);
  };

  return {
    darkMode,
    toggleDarkMode
  };
};
