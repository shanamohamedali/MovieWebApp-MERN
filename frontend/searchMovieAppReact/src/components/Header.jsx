import React, { useContext, useState } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { AuthContext, useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { useTheme } from "../hooks/useTheme";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

export function Header() {
  const [navMenu, setNavMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  // const userNavLinks = [
  //   { href: "/dashboard", label: "Dashboard" },
  //   { href: "", label: "" },
  //   { href: "", label: "Logout" },

  //   { href: "", label: "" },
  //   { href: "", label: "" },
  // ];

  return (
    <div>
      <header>
        <div className="border-b-[0.5px] border-gray-800  top-0 left-0 right-0 flex justify-between items-center h-24 w-screen px-5 text-white border-b-1">
          <div
            className="text-secondary-color flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <RiMovie2Fill size={40} />
            <h1>ReelMagic</h1>
          </div>

          <div className="flex w-100 items-center">
            <button
              className="flex items-center px-3 py-1 gap-1 ml-1 mr-2 text-sm rounded-full dark:hover:bg-white dark:hover:text-primary-color hover:bg-primary-color hover:text-white"
              onClick={() => toggleDarkMode()}
            >
              {darkMode ? (
                <IoIosSunny size={32} className="hover:text-primary-color" />
              ) : (
                <IoIosMoon
                  size={32}
                  className="text-primary-color hover:text-white"
                />
              )}
            </button>
            <nav className="hidden lg:flex">
              {user && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 gap-1 ml-1 mr-2 text-sm dark:hover:border-b-[1px]"
                  >
                    <FaUser size={20} />
                    Hi {user.name}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="px-3 py-2 gap-3 ml-1 mr-2 text-sm dark:hover:border-b-[1px]"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === "user" && (
                    <Link
                      to="/my-movies"
                      className="px-3 py-2 gap-3 ml-1 mr-2 text-sm dark:hover:border-b-[1px]"
                    >
                      My Movies
                    </Link>
                  )}
                </>
              )}

              {isAuthenticated && (
                <button
                  className="flex items-center border-primary-color px-3 py-2 gap-1 ml-1 mr-2 text-sm  dark:hover:border-b-[1px]"
                  onClick={logout}
                >
                  <IoLogOut size={20} />
                  Logout
                </button>
              )}
            </nav>

            {user && <button
              className="lg:hidden"
              onClick={() => setNavMenu((prev) => !prev)}
            >
              <IoMenu size={25} />
            </button>}

            {navMenu && (
              <nav className="flex flex-col bg-white text-primary-color z-2 absolute top-20 right-5 p-15">
                {user && (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 gap-1 ml-1 mr-2 text-sm  dark:hover:border-b-[1px]"
                    >
                      <FaUser size={20} />
                      Hi {user.name}
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/dashboard"
                        className="px-3 py-2 gap-3 ml-1 mr-2 text-sm dark:hover:border-b-[1px]"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === "user" && (
                      <Link
                        to="/my-movies"
                        className="border dark:border-white px-3 py-2 gap-3 ml-1 mr-2 text-sm  dark:hover:border-b-[1px]"
                      >
                        My Movies
                      </Link>
                    )}
                  </>
                )}

                {isAuthenticated && (
                  <button
                    className="flex items-center border-primary-color px-3 py-2 gap-1 ml-1 mr-2 text-sm dark:hover:border-b-[1px]"
                    onClick={logout}
                  >
                    <IoLogOut size={20} />
                    Logout
                  </button>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
