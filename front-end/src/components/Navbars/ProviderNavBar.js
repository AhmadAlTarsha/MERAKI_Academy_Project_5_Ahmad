import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

const ProviderNavBar = ({ dispatch, navigate, setLogout }) => {
  return (
    <>
      <div className="hidden lg:flex lg:gap-x-12">
        <div className="relative">
          <NavLink
            to={"/"}
            className={
              "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            }
          >
            Home
          </NavLink>
          <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"></div>
        </div>

        <NavLink
          to={"services"}
          className={
            "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          }
        >
          My Services
        </NavLink>

        <NavLink
          to={"chats"}
          className={
            "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          }
        >
          Chats
        </NavLink>

        <NavLink
          to={"profile"}
          className={
            "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          }
        >
          My Profile
        </NavLink>
      </div>
      {/* LEAVE IT EMPTY */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      {/* LEAVE IT EMPTY */}

      {/* <div className="bg-green-500 w-1/2 hidden lg:flex lg:flex-1 lg:justify-end"> */}

      <Button
        divClassName={""}
        onClick={() => {
          dispatch(setLogout());
          navigate("/");
        }}
        buttonName={"logout"}
      />
      <span aria-hidden="true">&rarr;</span>

      {/* </div> */}
    </>
  );
};

export default ProviderNavBar;
