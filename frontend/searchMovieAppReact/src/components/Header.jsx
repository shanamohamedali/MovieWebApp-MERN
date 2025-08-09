import React, { useContext, useState } from "react";
import { RiMovie2Fill, RiAccountCircleLine } from "react-icons/ri";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { AuthContext, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const {isAuthenticated,logout,username } = useAuth();
  const navigate=useNavigate();
  
  return (
    <div>
      <header>
        <div className="top-0 left-0 right-0 flex justify-between items-center h-24 w-screen px-5 text-white ">
          <div className="text-secondary-color flex items-center cursor-pointer" onClick={()=>navigate("/")}>
            <RiMovie2Fill size={40} />
            <h2 className="text-2xl font-bold">ReelMagic</h2>
          </div>
          <div className="flex w-100 items-center">
            {username &&  <button className="border border-white dark:border-primary-color px-3 py-2 gap-3 ml-1 mr-2 text-sm rounded-[20px] hover:bg-white dark:hover:bg-primary-color dark:hover:text-white hover:text-primary-color dark:text-primary-color"
            onClick={()=>navigate("/profile")}>Hi {username}</button>}
            <button
              className="flex items-center  px-3 py-1 gap-3 ml-1 mr-2 text-sm rounded-full hover:bg-white hover:text-primary-color dark:hover:bg-primary-color"
              onClick={() => darkModeHandler()}
            >
              {!dark && (
                <IoIosSunny
                  size={32}
                  className="dark:text-primary-color  dark:hover:text-white"
                />
              )}
              {dark && (
                <IoIosMoon
                  size={32}
                  className="dark:text-primary-color  dark:hover:text-white"
                />
              )}
            </button>
            {isAuthenticated && (
              <button className="flex items-center border border-white dark:border-primary-color px-3 py-2 gap-3 ml-1 mr-2 text-sm rounded-[20px] hover:bg-white dark:hover:bg-primary-color dark:hover:text-white hover:text-primary-color dark:text-primary-color"
              onClick={logout}>
                Logout
                <RiAccountCircleLine />
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
