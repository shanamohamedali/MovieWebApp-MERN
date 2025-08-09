import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Search } from "../components/Search";
import { SearchContext } from "../context/SearchContext";

export function Home() {
  const { searchList } = useContext(SearchContext);
  console.log("searchlist", searchList);
  

  return (
    <>
     
      <Search />
      <div className=" md:px-[50px] md:py-[50px] lg:px-[156px] lg:py-[52px]">
      <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-3 justify-items-center">
          {searchList.map((data) => (
            <div key={data.id}  className="w-[180px] h-[240px]  my-14 object-cover">
              <img
                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                className="w-[160px] h-[240px]"
              />
              <p>{data.title}</p>
            </div>
          ))}
        </div>
      </div>
        
      
     
    </>
  );
}
