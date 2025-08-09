import React from "react";

export function Button({ label, type }) {
  return (
    <div>
      <button
        className="w-full bg-secondary-color text-center mt-3 p-2 text-white text-[16px] font-[700]"
        type={type}
      >
        {label}
      </button>
    </div>
  );
}


