import React from "react";
import { Rating } from "./Rating";
import { Button } from "./Button";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance } from "../utils/interceptors";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const MovieDetailCard = ({ movie, setViewMovie }) => {
  console.log("....movie", movie);
  const {getLocalStorage}=useLocalStorage();

  const handleWatchLater = async (e, movie_id) => {
    try {
      e.preventDefault();
      // const user=getLocalStorage("userdata");
      
     
      const response = await axiosInstance("/users/watchLater", {
        method: "PUT",
        data: {
          //  user_id:user._id,
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
    <div
      className="bg-gray-700 fixed inset-0 z-1 w-screen h-screen overflow-y-auto p-20 bg-opacity-90 flex justify-center"
      onClick={() => setViewMovie(false)}
    >
      <div className=" md:px-[50px] md:py-[50px] lg:px-[156px] lg:py-[52px]">
        <div className="bg-[cardbg] flex items-center gap-3 mb-5 pb-5 sm:flex-col md:flex-row">
          <div>
            <img
              src={`http://localhost:3007/public/images/${movie.poster}`}
              alt="image-poster"
              width={300}
              height={200}
            />
          </div>
          <div className="flex flex-col gap-5 justify-center bg-cardbg">
            <div className="flex gap-3 flex-wrap">
              {movie.genre &&
                movie.genre.map((item) => (
                  <div key={item._id} className="border px-1 rounded-[4px] capitalize">
                    <h4>{item.title}</h4>
                  </div>
                ))}
            </div>

            <h1>{movie.title}</h1>
            <Rating value={movie.rating} />
            <Button
              type="submit"
              label="Watch Later"
              onClick={(e) => handleWatchLater(e,movie._id)}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
