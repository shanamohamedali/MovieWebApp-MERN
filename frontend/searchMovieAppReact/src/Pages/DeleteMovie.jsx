import React from "react";
import PopupLayout from "../layouts/PopupLayout";
import { Rating } from "../components/Rating";


export const DeleteMovie = ({ setOpenPopup,handleDelete,selectedMovie}) => {

  return (
    <>
    <PopupLayout
      setOpenPopup={setOpenPopup}
      handleSubmit={handleDelete}
       title="Delete Movie"
      actionLabel="Delete"
      
    >
      <div className="flex-col justify-center m-auto text-black">
        <p className="font-semibold text-lg">
          Do you really want to delete this data?
          </p>
          <div>
            <p>Title: {selectedMovie.title}</p>
            <div className="flex justify-center items-center">
    <Rating value={selectedMovie.rating}/>
            </div>
            
          </div>
        
      </div>
    </PopupLayout>
      
    </>
  );
};
