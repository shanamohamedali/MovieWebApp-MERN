import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="border border-l-0 border-y-0">
      <Hamburger toggled={isOpen} toggle={setOpen} size={22} />

      {isOpen && (
        <section className="flex flex-col justify-between text-left p-10 h-[70vh] rounded-sm">
          <div className="flex flex-col gap-5 text-lg">
            <Link to="/add-genre">Genre</Link>
            <Link to="/add-movie">Movie</Link>
          </div>
          <div>
            <button>Logout</button>
          </div>
        </section>
      )}
    </div>
  );
};
