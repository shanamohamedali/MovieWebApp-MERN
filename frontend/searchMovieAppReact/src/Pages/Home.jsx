import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Search } from "../components/Search";
import { useSearch } from "../context/SearchContext";
import { useMovies } from "../context/MovieContext";
import { MovieList } from "../components/MovieList";
import { MovieDetailCard } from "../components/MovieDetailCard";
import { MdArrowDropDown } from "react-icons/md";
import { axiosInstance } from "../utils/interceptors";
import { ToastContainer } from "react-toastify";
import { IoHelpBuoyOutline } from "react-icons/io5";

export function Home() {
  const { searchList, setSearchList } = useSearch();
  const { moviesList, fetchMovies, movie, fetchGenres, genre } = useMovies();
  const [viewMovie, setViewMovie] = useState(false);
  console.log("searchlist", searchList);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(()=>{
    fetchGenres();
  },[])

  useEffect(() => {
    fetchMovies();
    if (movie) {
      setViewMovie(true);
    }
  }, [movie]);

  const handleFilter = async (e) => {
    try {
      const value=e.target.value;
      setSelectedValue(value);
      //console.log(",,,,,,", genre_id);
      if (value !== "") {
        const response = await axiosInstance("/movies/search", {
          method: "GET",
          params: {
            genre_id: value,
          },
        });
        console.log("filter.....", response.data);
        setSearchList(response.data);
      }
      else{
        setSearchList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
//console.log("searchlist...", searchList);
  return (
    <>
      <div className="flex justify-center items-center">
        <Search />
        <div>
          <form>
            <select
              className="bg-black"
              value={selectedValue}
              onChange={handleFilter}
            >
              <option value="">Filter by Genre</option>

              {genre &&
                genre.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </form>
        </div>
      </div>

      <div className=" md:px-[50px] md:pt-[20px] md:pb-[100px] lg:px-[156px] lg:pb-[100px]">
        {/* <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-items-center bg-card"> */}
        <div className="flex flex-row gap-1 items-start justify-evenly flex-wrap">
          {searchList.length === 0 ? (
            <MovieList moviesList={moviesList} />
          ) : (
            <MovieList moviesList={searchList} />
          )}
          {viewMovie && movie ? (
            <MovieDetailCard movie={movie} setViewMovie={setViewMovie} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
