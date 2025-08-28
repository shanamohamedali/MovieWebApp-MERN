import React, { useContext, useState } from "react";
import { RiMovie2Fill, RiAccountCircleLine } from "react-icons/ri";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { AuthContext, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { useTheme } from "../hooks/useTheme";


export function Header() {
 const {darkMode,toggleDarkMode}=useTheme();

  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="border-b-[0.5px] border-gray-800  top-0 left-0 right-0 flex justify-between items-center h-24 w-screen px-5 text-white border-b-1">
          <div
            className="text-secondary-color flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <RiMovie2Fill size={40} />
            <h2 className="text-2xl font-bold">
              ReelMagic
            </h2>
          </div>
          <div className="flex w-100 items-center">
            {user && (
              <>
              <button
                className="border dark:border-white px-3 py-2 gap-3 ml-1 mr-2 text-sm rounded-[20px] dark:hover:bg-white dark:hover:text-primary-color"
                onClick={() => navigate("/profile")}
              >
                Hi {user.name}
              </button>
              {user.role === "admin" && (
              <button className="border dark:border-white px-3 py-2 gap-3 ml-1 mr-2 text-sm rounded-[20px] dark:hover:bg-white dark:hover:text-primary-color"
               onClick={() => navigate("/dashboard")}>Dashboard</button>
            )}
              </>
            )}
            <button
              className="flex items-center px-3 py-1 gap-3 ml-1 mr-2 text-sm rounded-full dark:hover:bg-white dark:hover:text-primary-color hover:bg-primary-color hover:text-white"
              onClick={() => toggleDarkMode()}
            >
              {darkMode && (
                <IoIosSunny
                  size={32}
                  className=" hover:text-primary-color"
                />
              )}
              {!darkMode && (
                <IoIosMoon
                  size={32}
                  className="text-primary-color hover:text-white"
                />
              )}
            </button>
            

            {isAuthenticated && (
              <button
                className="flex items-center border dark:border-white border-primary-color px-3 py-2 gap-3 ml-1 mr-2 text-sm rounded-[20px] dark:hover:bg-white dark:hover:text-primary-color"
                onClick={logout}
              >
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
