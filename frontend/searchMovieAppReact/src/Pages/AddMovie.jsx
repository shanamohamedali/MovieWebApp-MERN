import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAddField } from "../hooks/useAddField";
import { axiosInstance } from "../utils/interceptors";
import { toast, ToastContainer } from "react-toastify";
import { useMovies } from "../context/MovieContext";

export const AddMovie = () => {
  const { field, setField, handleChange, handleFile,handleCheckbox } = useAddField({
    title: "",
    rating: "",
    poster: "",
    thumbnail: "",
    genre:[],
  });
  const {fetchGenres,genre}=useMovies();

  const handleSubmit = async (e) => {
    try {
      console.log("....helooooo", field);
      e.preventDefault();
      const { title, rating, poster, thumbnail, genre } = field;
      const formData = new FormData();
      formData.append("poster", poster);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("rating", rating);
      genre.forEach((id)=>{
        formData.append("genre[]", id);
      })
     


      const response = await axiosInstance("/movies/", {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      toast.success(response.data.message);
    } catch (error) {
      //console.log("errore",error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  console.log("fields", field);
  return (
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
          <label htmlFor="thumbnail">Upload thumbnail image</label>
          <Input
            type="file"
            accept="image/*"
            name="thumbnail"
            id="thumbnail"
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
      <ToastContainer/>
    </div>
  );
};
