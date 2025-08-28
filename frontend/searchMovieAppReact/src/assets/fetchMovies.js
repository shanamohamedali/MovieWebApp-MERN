import { axiosInstance } from "../utils/interceptors";

export const fetchMovies = async () => {
    try {
      const response = await axiosInstance("/movies/");
      if (response) {
        return response;
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };