import React, { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { axiosInstance } from "../utils/interceptors";
import { ToastContainer, toast } from "react-toastify";
import { Rating } from "../components/Rating";
import { Button } from "../components/Button";
import { FaTrashCan } from "react-icons/fa6";

export const WatchLater = () => {
  const [myMovies, setMyMovies] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const fetchWatchList = async () => {
    try {
      const response = await axiosInstance("/users/watchLater", {
        method: "GET",
      });
      console.log("....watchmovies", response);
      setMyMovies(response.data[0].movies);
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchWatchList();
  }, []);
  console.log("mymovies....", myMovies);
  return (
    <div>
      <div className=" md:px-[50px] md:py-[50px] lg:px-[156px] lg:py-[52px]">
        {/* <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-3 gap-5 justify-items-center pb-10"> */}
        <div className="flex flex-row gap-3 justify-evenly flex-wrap">
          {myMovies.length !== 0 &&
            myMovies.map((data) => (
              <div
                key={data._id}
                onMouseEnter={() => setHoveredItem(data._id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="sm:basis-2/6 lg:basis-3/12 flex justify-center items-center bg-primary-color min-h-[250px] max-h-[600px] my-14 gap-3 relative p-1"
              >
                <div className="absolute right-3 top-2 cursor-pointer">
                  <FaTrashCan size={12}/>
                </div>
                <div className="basis-4/6 h-full">
                  <img
                    src={data.poster}
                    className="max-h-[500px] w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-5 justify-center bg-cardbg pt-5">
                  <div className="flex gap-3 flex-wrap">
                    {data.genre &&
                      data.genre.map((item) => (
                        <div key={item._id} className="capitalize text-font-color">
                          <p>{item.title},</p>
                        </div>
                      ))}
                  </div>
                  <h3 className="px-2 capitalize">{data.title}</h3>
                  <Rating value={data.rating} />
                  <Button type="button" label="Watch Now" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
