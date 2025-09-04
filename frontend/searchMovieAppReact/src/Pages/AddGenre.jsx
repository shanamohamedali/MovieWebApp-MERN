import React, { useEffect } from "react";
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
  useEffect(() => {
    fetchGenres();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance("/genre/", {
        method: "POST",
        data: field,
      });
      if (response) {
        setField("");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log("field", field);
  return (
    <div className="flex gap-4 p-5 flex-wrap">
      <Sidebar />
      <section>
        <div
          className="md:w-[450px] bg-primary-color py-10 
    bg-white mt-[50px] flex flex-col justify-center items-center px-5"
        >
          <div>
            <form onSubmit={handleSubmit}>
              <h2 className="text-[28px] text-primary-color pb-4">
                Add Genre Details
              </h2>
              <div>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  id="title"
                  value={field.name}
                  onChange={handleChange}
                />
                <Button type="submit" label="Submit" />
              </div>
            </form>
          </div>

          <div className="mt-5">
            <ul className="flex gap-3 flex-wrap text-primary-color">
              {genre &&
                genre.map((item) => (
                  <li key={item._id} className="border p-2">
                    {item.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};
