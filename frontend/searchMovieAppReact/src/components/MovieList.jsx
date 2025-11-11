import React, { useState } from "react";
import { useEffect } from "react";
import { useMovies } from "../context/MovieContext";
import { Rating } from "./Rating";
import { MovieCard } from "./MovieCard";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { axiosInstance } from "../utils/interceptors";

export const MovieList = ({ moviesList }) => {
  const { fetchSeclectedMovie, movie } = useMovies();
  const [hoveredItem, setHoveredItem] = useState(null);

const handleWatchLater = async (e, movie_id) => {
    try {
      e.preventDefault();
      
      const response = await axiosInstance("/users/watchLater", {
        method: "PUT",
        withCredentials:true,
        data: {
          movie_id,
         
        },
      });
        console.log(",,,watchlater", response);
         toast.success(response.data.message);
      
    } catch (error) {
      console.log(error.message);
      //toast.error(error.response.data.message);
    }
  };



  return (
    <>
      {MovieList &&
        moviesList.map((data) => (
          <div
            key={data._id}
            className="sm:basis-6/12 md:basis-4/12 lg:basis-3/12 my-3 object-cover bg-cardbg relative"
            onClick={() => fetchSeclectedMovie(data._id)}
            onMouseEnter={() => setHoveredItem(data._id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
             <div className="absolute right-3 top-2 cursor-pointer" onClick={(e) => handleWatchLater(e,data._id)}>
              <FaHeartCirclePlus size={20} color="red"/>
              </div>
            <img
              src={data.poster}
              className="w-full h-full object-cover rounded-xl"
            />
            {hoveredItem===data._id && (
              <div className="bg-primary-color absolute bottom-0 w-full rounded-b-xl flex flex-col justify-center items-center p-5">
                <h5 className="overflow-hidden py-2 capitalize ">
                  {data.title}
                </h5>
                <Rating value={data.rating} />
              </div>
            )}
          </div>
        ))}
    </>
    //   </div>
    // </div>
  );
};
