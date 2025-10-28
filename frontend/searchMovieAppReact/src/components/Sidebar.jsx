import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { MdDashboard } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { BiSolidMoviePlay } from "react-icons/bi";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="bg-white text-black flex rounded-2xl">
      
<Hamburger toggled={isOpen} toggle={setOpen} size={22} />
       {/* <div className="flex flex-col gap-5 text-lg pl-4">
            <Link to="/dashboard" className="hover:border-b-[1px]"><MdDashboard/></Link>
            <Link to="/add-genre" className="hover:border-b-[1px]"><TbCategoryPlus/></Link>
            <Link to="/add-movie" className="hover:border-b-[1px]"><BiSolidMoviePlay/></Link>
          </div> */}
      
      {isOpen && (
        <section className="flex flex-col justify-start p-10 h-[100vh] rounded-sm">
          <div className="flex flex-col gap-5 text-lg text-left">
            <Link to="/dashboard" className="hover:border-b-[1px] flex gap-1 items-center"><MdDashboard/>Dashboard</Link>
            <Link to="/add-genre" className="hover:border-b-[1px] flex gap-1 items-center"><TbCategoryPlus/>Add Genre</Link>
            <Link to="/add-movie" className="hover:border-b-[1px] flex gap-1 items-center"><BiSolidMoviePlay/>Add Movie</Link>
          </div>
        
        </section>
      )}
    </div>
  );
};
