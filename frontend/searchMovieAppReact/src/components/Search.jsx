import React, { useContext,useEffect} from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { SearchContext } from "../context/SearchContext";

export function Search() {
  const { searchInput, handleChange, clearSearch,fetchMovies } = useContext(SearchContext);

  return (
    <section>
    <div className="flex justify-center items-center mx-auto md:w-[700px] px-3 py-2 relative ">
      <button className="absolute left-1 pl-7 flex">
        {searchInput === "" ? (
          <IoMdSearch size={18} className="" />
        ) : (
          <IoMdClose
            size={18}
            className="text-primary-color"
            onClick={clearSearch}
          />
        )}
      </button>
      <input
        type="text"
        name="search"
        id="search"
        value={searchInput}
        className="bg-white rounded-[20px] w-full p-[8px] pl-14 dark:border dark:border-font-color "
        placeholder="Search..."
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
   </section>
  );
}
