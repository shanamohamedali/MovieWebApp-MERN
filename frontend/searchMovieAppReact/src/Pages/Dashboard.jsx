import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance } from "../utils/interceptors";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Rating } from "../components/Rating";
import { DeleteMovie } from "./DeleteMovie";
import {EditMovies} from "./EditMovies";
import { Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  const [openPopup, setOpenPopup] = useState({
    edit:false,
    delete:false,
  });
  const [selectedMovie, setSelectedMovie] = useState("");
  const {fetchMovies,moviesList}=useMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log("movielist.....", moviesList);

  const fetchSelectedMovie = async (itemId) => {
      try {
        console.log("hello from fetch")
        const response = await moviesList.filter((movie) => movie._id === itemId);
        //console.log("movie found", response);
        return response;
      } catch (error) {
        console.log("No movie found with this id", error);
      }
    };

    //handle popup
  const handlePopUp =async (e, _id) => {
    console.log("....id", _id);

    const action=e.currentTarget.name;
    setOpenPopup((prev)=>({
      ...prev,
      [action]:!prev[action],
    }));
    const movieDetails=await fetchSelectedMovie(_id); 
    setSelectedMovie(movieDetails[0]);
  };
console.log("popup state....", openPopup);



  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      console.log("...item.id", selectedMovie._id);
      const response = await axiosInstance("/movies/", {
        method: "DELETE",
        data: {
          _id: selectedMovie._id,
        },
      });
      console.log("delete....", response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex gap-4 p-5">
      {/* leftSection */}
      <Sidebar/>
      {/* rightSection */}
      <section>
        <div className="flex gap-5 flex-wrap">
          {moviesList &&
            moviesList.map((movie) => (
              <div
                key={movie._id}
                className="p-6 w-[25%] bg-white text-primary-color border rounded-3xl justify-center align-middle"
              >
                <img
                  src={`http://localhost:3007/public/images/${movie.poster}`}
                  alt=""
                  className="h-[200px] w-[200px] object-contain"
                />
                <div className="pt-6 capitalize">
                  <h3>{movie.title} </h3>
                  <div className="flex gap-1 flex-wrap">
                    {movie.genre &&
                      movie.genre.map((item) => (
                        <div
                          key={item._id}
                          className="border px-1 rounded-[4px]"
                        >
                          <p>{item.title}</p>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between">
                    <Rating value={movie.rating} />
                    <div className="flex">
                      <button name="edit" onClick={(e) => handlePopUp(e,movie._id)}>
                        <FaEdit />
                      </button>
                      <button name="delete" onClick={(e) => handlePopUp(e,movie._id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <ToastContainer />
      {openPopup.delete && (
        <DeleteMovie setOpenPopup={setOpenPopup} handleDelete={handleDelete} selectedMovie={selectedMovie} />
      )}
        {openPopup.edit && (
        <EditMovies setOpenPopup={setOpenPopup} selectedMovie={selectedMovie}/>
      )}
    </div>
  );
};
