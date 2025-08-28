import React from "react";
import "../hooks/useAddField";
import { useAddField } from "../hooks/useAddField";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { axiosInstance } from "../utils/interceptors";
import { ToastContainer, toast } from "react-toastify";
import { useMovies } from "../context/MovieContext";
import { Sidebar } from "../components/Sidebar";

export const AddGenre = () => {
  const { field, setField, handleChange } = useAddField({ title: "" });
  const { fetchGenres, genre } = useMovies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance("/genre/", {
        method: "POST",
        data: field,
      });
      if(response){
      setField("");
      toast.success(response.data.message);}
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log("field", field);
  return (
    <div className="flex gap-4 p-5 flex-wrap">
      <Sidebar/>
      <section>
        <div
          className="md:w-[450px] bg-primary-color py-10 
    bg-white mt-[50px] flex justify-center items-center mb-[100px] px-5"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-[28px] text-primary-color pb-4">
              Add Genre Details
            </h2>
            <Input
              type="text"
              placeholder="Enter Title"
              name="title"
              id="title"
              value={field.name}
              onChange={handleChange}
            />
            <Button type="submit" label="Submit" />
          </form>
        </div>
        
      </section>
      <section>
       <div
          className="md:w-[450px] bg-primary-color py-10 text-primary-color
    bg-white mt-[50px] flex justify-center mb-[100px]"
        >
           <div className="p-5 flex flex-col"> 
             <button onClick={()=>fetchGenres()} className="text-[16px] font-[700] bg-secondary-color px-5 py-1 mb-5 text-white">
            View Genres
          </button>
            <h3>Click the button to view the list of genres you've already added</h3>
         
           <ul className="flex gap-3 flex-wrap">
          {genre && 
          genre.map((item)=>(
            <li key={item._id} className="border p-2">{item.title}</li>
          ))}
          </ul>
         </div>
        </div>
</section>
      <ToastContainer />
    </div>
  );
};
