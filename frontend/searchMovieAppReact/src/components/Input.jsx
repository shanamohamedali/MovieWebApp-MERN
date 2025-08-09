import React from 'react'

export function Input({type,placeholder,name,id,value,onChange,onBlur}) {
  return (
    <div>
      <input
              type={type}
              className="bg-[#333333] p-2 w-full mb-3 rounded-[4px] hover:border border-font-color 
            focus:outline-none text-[16px] placeholder:text-[14px] placeholder:text-font-color dark:bg-[#e5e7e9]"
              placeholder={placeholder}
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              // required
            />
    </div>
  )
}


