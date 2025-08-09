import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const FormLayout = ({
  label,
  linkForgotPassword,
  labelForgotPassword,
  Question,
  linkUserReg,
  labeluserReg,
  children,
}) => {

  const navigate = useNavigate();

  console.log("signup link", linkUserReg);
  return (
    <div
      className="sm:w-[450px] bg-primary-color p-3 mx-auto
     dark:bg-white dark:text-primary-color mt-[50px] flex justify-center items-center mb-[80px]"
    >
      <div className="mx-10 mt-2 p-3 w-full">
        <h3 className="text-white dark:text-primary-color text-[24px] font-[500] pb-4 ">
          {label}
        </h3>

        <main>{children}</main>

        <div className="flex justify-end p-2 cursor-pointer">
          <span onClick={()=>navigate(`${linkForgotPassword}`)}>{labelForgotPassword}</span>
          {/* <Link to={linkForgotPassword}>{labelForgotPassword}</Link> */}
        </div>
        <div className="flex justify-center items-baseline mt-12 cursor-pointer">
          <p>{Question}</p>
          <span onClick={()=>navigate(`${linkUserReg}`)} className="text-white dark:text-primary-color ml-2">{labeluserReg}
          </span>
           {/* <Link to={linkUserReg}> {labeluserReg}</Link> */}
        </div>
      </div>
    </div>
  );
};
