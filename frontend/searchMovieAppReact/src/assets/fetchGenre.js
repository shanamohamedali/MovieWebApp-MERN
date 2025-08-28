import { axiosInstance } from "../utils/interceptors";


export const fetchGenres = async () => {
    try {
      const response = await axiosInstance("/genre/");
      if (response) {
        console.log("genrefetch...", response);
        return response;
      }
      return console.log("no genre found")
    } catch (error) {
      console.log(error.message);
    }
  };