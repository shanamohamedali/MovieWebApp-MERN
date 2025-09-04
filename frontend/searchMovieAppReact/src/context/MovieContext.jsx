import { createContext, useState, useEffect, useContext } from "react";
import { axiosInstance } from "../utils/interceptors";
import { ToastContainer, toast } from "react-toastify";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [genre, setGenre] = useState([]);
  const [movie, setMovie] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance("/movies/");
      if (response) {
        setMoviesList(response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axiosInstance("/genre/");
      if (response) {
        console.log("genrefetch...", response);
        setGenre(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchSeclectedMovie = async (_id) => {
    try {
      if (!moviesList) await fetchMovies();
      const filteredMovie = moviesList.filter((item) => item._id === _id);
      console.log("...filtered",filteredMovie);
      if (filteredMovie) setMovie(filteredMovie[0]);
      return true;
    } catch (error) {
      toast.error("movie don't found");
    }
  };

  return (
    <MovieContext.Provider
      value={{ fetchMovies, moviesList, fetchGenres, genre,fetchSeclectedMovie,movie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
