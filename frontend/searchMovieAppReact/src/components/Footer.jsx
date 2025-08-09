import React from "react";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdArrowDropdown,IoIosGlobe } from "react-icons/io";

export function Footer() {
  return (
    <footer className=" bottom-0 left-0 right-0 w-screen py-4 bg-primary-color flex md:flex-col
      align-bottom dark:bg-white dark:bg-opacity-80 dark:text-primary-color 
     text-font-color text-[13px] font-[400] mt-auto">

      <div className="mx-auto w-[700px] ">
        <div className="px-7 md:py-4">
          <p>Question? Call 1 234 134 2343</p>
        </div>

        <div className="md:flex">
          <div className="px-7 md:py-4">
            <ul>
              {/* <li>Question? Call 1 234 134 2343</li> */}
              <li> FAQ</li>
              <li> Cookie Preference</li>
            </ul>
          </div>

          <div className="px-7 md:py-4">
            <ul>
              <li> Help Center</li>
              <li> Corporate Information</li>
            </ul>
          </div>
          <div className="px-7 md:py-4">
            <ul>
              <li> Terms of Use</li>
              <li> Privacy</li>
            </ul>
          </div>
          <div className="flex gap-3 px-7 py-7 sm:justify-center">
            <a>
              <FaInstagramSquare size={24} />
            </a>
            <a>
              <FaFacebookSquare size={24} />
            </a>
            <a>
              <FaTwitter size={24}/>
            </a>
            <a>
              <FaYoutube size={24}/>
            </a>
          </div>
        </div>
        <div className="px-7 py-1">
          <button className="flex items-center border-[1px] border-font-color rouded-[2px] px-2 py-1 gap-2 text-[13px]">
            <IoIosGlobe/>
            English
            <IoMdArrowDropdown />
          </button>
        </div>
      </div>
    </footer>
  );
}
