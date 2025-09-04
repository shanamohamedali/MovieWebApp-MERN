import React, { useState } from "react";
import { useEffect } from "react";
import { useMovies } from "../context/MovieContext";
import { Rating } from "./Rating";

export const MovieList = ({ moviesList }) => {
  const { fetchSeclectedMovie, movie } = useMovies();

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  return (
    <>
      {/* <div className=" md:px-[50px] md:py-[50px] lg:px-[156px] lg:py-[52px]">
        <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-3 justify-items-center"> */}
      {MovieList &&
        moviesList.map((data) => (
          <div
            key={data._id}
            className="w-[180px] h-[240px] my-14 object-cover bg-cardbg"
            onClick={() => fetchSeclectedMovie(data._id)}
          >
            <img
              src={`http://localhost:3007/public/images/${data.thumbnail}`}
              className="w-[250px] h-[240px] object-fit rounded-xl"
            />

            <h3 className="overflow-hidden py-2 capitalize ">{data.title}</h3>
            <Rating value={data.rating} />
          </div>
        ))}
    </>
    //   </div>
    // </div>
  );
};
