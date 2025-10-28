import React, { Children, useState } from "react";

const PopupLayout = ({
  setOpenPopup,
  handleSubmit,
  title,
  actionLabel,
  responseMessage,
  children,
}) => {
  return (
      <div className="bg-gray-700 fixed inset-0 z-1 w-screen h-screen overflow-y-auto p-20 bg-opacity-90 flex justify-center"
        // onClick={() => setOpenPopup(false)}
      >
        <div className="bg-white text-primary-color flex flex-col justify-center items-center max-w-[500px] text-center" >
          <form className="bg-white p-5 border rounded-xl">
            <h3>{title}</h3>

            <main>{children}</main>

            <div className="flex justify-center gap-2 items-end pt-8">
              <button
                className="bg-white-500 border border-black px-3 py-1 text-black hover:text-white hover:bg-gray-900"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </button>
              <button
                 onClick={handleSubmit}
                className="bg-red-900 border px-3 py-1 text-black hover:bg-gray-900  hover:text-white hover:border-black"
             
              >
                {actionLabel}
              </button>
            </div>
            {responseMessage && <p className="p-4 text-blue-400">{responseMessage}</p>}
           
          </form>
        </div>
      </div>
  
  );
};

export default PopupLayout;
