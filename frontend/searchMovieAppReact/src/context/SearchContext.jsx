import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { API_URL, BASE_API } from "../constants/Constants";
import { useMovies } from "./MovieContext";
// import { useDebounce } from "../hooks/useDebounce";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const {moviesList,fetchMovies}=useMovies();
  const [searchList, setSearchList] = useState([]);
  // useDebounce(searchInput ? fetchMovies(searchInput) : fetchMovies("movies"));
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput) {
        fetchSearchedMovies(searchInput);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  console.log("searchInput", searchInput);
   console.log("movielist", moviesList);

  const fetchSearchedMovies = async (query) => {
    try {
      // const response = await axios(`${BASE_API}/movies/`, {
      //   params: {
      //     query: query,
      //   },
      // });
      const filteredMovie =await moviesList.filter((item)=> {
        return Object.values(item).some((value)=>(
        String(value).toLowerCase().includes(query.toLocaleLowerCase())
      ))})
      setSearchList(filteredMovie);
      console.log("....", searchList);
      //console.log("response...", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        searchList,
        setSearchList,
        handleChange,
        clearSearch,
        fetchMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch=()=>useContext(SearchContext);