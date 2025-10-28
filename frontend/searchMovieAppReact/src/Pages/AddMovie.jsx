import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAddField } from "../hooks/useAddField";
import { axiosInstance } from "../utils/interceptors";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMovies } from "../context/MovieContext";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CLOUDINARY_API } from "../constants/Constants";

export const AddMovie = () => {
  const {
    field,
    setField,
    handleChange,
    handleFile,
    handleCheckbox,
    clearField,
  } = useAddField({
    title: "",
    rating: "",
    poster: "",
    thumbnail: "",
    genre: [],
  });
  const [imgUrl, setImgUrl] = useState("");
  const { fetchGenres, genre } = useMovies();

  //POST
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { title, rating, poster, genre } = field;

      if (!poster) {
        toast.error("Upload poster image");
      } else {
        const formData = new FormData();
        formData.append("file", poster);
        formData.append("upload_preset", import.meta.env.VITE_upload_preset);
        formData.append("cloud_name", import.meta.env.VITE_cloud_name);
        const response = await axios(CLOUDINARY_API, {
          method: "POST",
          data: formData,
        });
        console.log("....res", response);
        if (!response) {
          toast.error("image upload to cloudinary failed");
        } else {
          const movieData = {
            title: title,
            rating: rating,
            poster: response.data.url,
            genre: genre,
          };
          //console.log("....", movieData);
          const responseAddMovie = await axiosInstance("/movies/", {
            method: "POST",
            data: movieData,
          });
          
            clearField;
            toast.success("Movie added successfully");
          
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  console.log("fields", field);
  return (
    <div className="flex">
      <Sidebar />
      <Link to="/dashboard" className="ml-5 mt-5 flex">
        <IoMdArrowRoundBack size={30} />
      </Link>
      <div className="w-[450px] bg-white p-10 flex flex-col justify-center items-center m-auto my-10">
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-primary-color">Add Movie Details</h2>
            <Input
              type="text"
              placeholder="Enter Movie title"
              name="title"
              id="title"
              value={field.name}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Enter rating"
              name="rating"
              id="rating"
              value={field.name}
              onChange={handleChange}
            />
            <label htmlFor="poster">Upload poster image</label>

            <Input
              type="file"
              accept="image/*"
              name="poster"
              id="poster"
              value={field.name}
              onChange={handleFile}
            />
            {genre &&
              genre.map((item) => (
                <div key={item._id}>
                  <label>
                    <input
                      type="checkbox"
                      value={item._id}
                      name="genre"
                      id={item.title}
                      onClick={handleCheckbox}
                    />
                    {item.title}
                  </label>
                </div>
              ))}
            <Button type="submit" label="Add" />
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
