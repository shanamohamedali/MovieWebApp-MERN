import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Search } from "../components/Search";
import { useSearch } from "../context/SearchContext";
import { useMovies } from "../context/MovieContext";
import { MovieList } from "../components/MovieList";
import { MovieDetailCard } from "../components/MovieDetailCard";


export function Home() {
  const { searchList } = useSearch();
  const {moviesList, fetchMovies,movie } = useMovies();
  const [viewMovie, setViewMovie] = useState(false);
  console.log("searchlist", searchList);

  useEffect(() => {
    fetchMovies();
    if (movie) {
      setViewMovie(true);
    }
  }, [movie]);

  
  return (
    <>
      <Search />
      <div className=" md:px-[50px] md:pt-[20px] md:pb-[100px] lg:px-[156px] lg:pb-[100px]">
        <div className="grid sm:grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center bg-card">
          {searchList.length === 0 ? (
            <MovieList moviesList={moviesList}/>
          ) : (
            <moviesList moviesList={searchList}/>
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
