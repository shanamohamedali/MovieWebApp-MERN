import React, { useState } from "react";
import PopupLayout from "../layouts/PopupLayout";
import { Input } from "../components/Input";
import { useMovies } from "../context/MovieContext";
import { useEffect } from "react";
import { useAddField } from "../hooks/useAddField";
import { axiosInstance } from "../utils/interceptors";

export const EditMovies = ({ setOpenPopup, selectedMovie }) => {
  const { moviesList, genre, fetchGenres,fetchMovies } = useMovies();
  const {_id,title,rating,poster,thumbnail,genreArray}=selectedMovie;
  const { field, setField, handleChange, handleFile, handleCheckbox } =
    useAddField("");
   const[message,setMessage]=useState("");
    const checkedItem=selectedMovie.genre?.map((item)=>item._id) || [];

  console.log("...field items", field);
  console.log("...movie", selectedMovie);
    console.log("...checked", checkedItem);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(()=>{
    setField({_id:_id,
      title:title,
      rating:rating,
      poster:poster,
      thumbnail:thumbnail,
      genre:checkedItem});
  },[selectedMovie])

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const { _id, title, rating, poster, thumbnail, genre } = field;
      const formData = new FormData();
       formData.append("_id", _id);
      formData.append("poster", poster);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("rating", rating);
      genre.forEach((id) => {
        formData.append("genre[]", id);
      });

      const response = await axiosInstance("/movies/", {
        method: "PUT",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(response);
      
     if(response){
      //fetchMovies();
      setMessage(response.data.message);
     await fetchMovies();
     setOpenPopup(false);
     
     }

    
    } catch (error) {
      console.log("Updating movie details failed", error);
      setMessage(error.response.data.message)
    }
  };

  return (
    <div>
      <PopupLayout
        setOpenPopup={setOpenPopup}
        handleSubmit={handleEdit}
        title="Edit movie details"
        actionLabel="Submit"
        responseMessage={message}
      >
        <div className="text-left">
          <label>Tiltle</label>
        </div>

        <Input
          type="text"
          placeholder={selectedMovie.title}
          name="title"
          id="title"
          value={field.title}
          onChange={handleChange}
        />
        <div className="text-left">
          <label>Rating</label>
        </div>
        <Input
          type="number"
          placeholder={selectedMovie.rating}
          name="rating"
          id="rating"
          value={field.rating}
          onChange={handleChange}
        />
        <div className="text-left">
          <label htmlFor="poster">Upload poster image</label>
        </div>

        <Input
          type="file"
          accept="image/*"
          name="poster"
          id="poster"
         value={field.name}
          onChange={handleFile}
        />
        <div className="text-left">
          <label htmlFor="thumbnail">Upload thumbnail image</label>
        </div>

        <Input
          type="file"
          accept="image/*"
          name="thumbnail"
          id="thumbnail"
       value={field.name}
          onChange={handleFile}
        />
        <div className="text-left ">
          <label>Select genres :</label>
        </div>
        <div className=" flex gap-2 flex-wrap text-left text-black">
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
                    defaultChecked={(checkedItem).includes(item._id)}

                  />
                  {item.title}
                </label>
              </div>
            ))}
        </div>
      </PopupLayout>
    </div>
  );
};
