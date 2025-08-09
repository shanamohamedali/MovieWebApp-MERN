import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
// import { useDebounce } from "../hooks/useDebounce";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  // useDebounce(searchInput ? fetchMovies(searchInput) : fetchMovies("movies"));

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput) {
        fetchMovies(searchInput);
      }
       else {
        fetchMovies("movie");
       }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  console.log("searchInput", searchInput);

  const fetchMovies = async (query) => {
    try {
      const response = await axios(API_URL, {
        params: {
          query: query,
        },
      });
      setSearchList(response.data.results);
      console.log("....", searchList);
      console.log("response...", response.data);
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
        handleChange,
        clearSearch,
        fetchMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
