import React, { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { axiosInstance } from "../utils/interceptors";
import { ToastContainer, toast } from "react-toastify";
import { Rating } from "../components/Rating";
import { Button } from "../components/Button";

export const WatchLater = () => {
  const [myMovies, setMyMovies] = useState([]);
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
        <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center pb-10">
          {myMovies.length !== 0 &&
            myMovies.map((data) => (
              <div
                key={data._id}
                className="w-[180px] h-[240px] my-14 object-cover bg-cardbg">
                <img
                  src={`http://localhost:3007/public/images/${data.thumbnail}`}
                  className="w-[250px] h-[240px] object-fit rounded-xl"
                />
                
                <div className="flex gap-3 flex-wrap">
                  {data.genre &&
                    data.genre.map((item) => (
                      <div key={item._id} className="border px-1 rounded-[4px] capitalize">
                        <p>{item.title}</p>
                      </div>
                    ))}
                </div>
                <h3 className="px-2 capitalize">{data.title}</h3>
                <Rating value={data.rating} />
                <Button type="button" label="Watch Now"/>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
