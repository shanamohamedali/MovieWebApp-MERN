import React from "react";
import { Rating } from "./Rating";

export const MovieCard = ({data,hovered}) => {
    
  return (
    <div>
      <img
        src={`http://localhost:3007/public/images/${data.thumbnail}`}
        className="w-full h-full object-cover rounded-xl"
      />
      {hovered && (
        <div className="bg-primary-color absolute bottom-0 w-full rounded-b-xl flex flex-col justify-center items-center p-5">
          <h3 className="overflow-hidden py-2 capitalize ">{data.title}</h3>
          <Rating value={data.rating} />
        </div>
      )}
    </div>
  );
};
