import React from "react";
import { FcBullish } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">Open Shop</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">

        <NavLink
        
          to={""}
          className={
            "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>{" "}
          Dashboard
        </NavLink>

        <NavLink
          to={""}
          className={
            "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>{" "}
          Posts
        </NavLink>

        <NavLink
          to={""}
          className={
            "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>{" "}
          Services
        </NavLink>

      </div>
      <div>Bottom Part</div>
    </aside>
  );
};

export default SideBar;

{
  /* <div className="side-bar">
        <div className="nav-item">
          <NavLink to={"/admin"}>Home</NavLink>
        </div>
        <div className="nav-item">
          <NavLink>Posts</NavLink>
        </div>
        <div className="nav-item">
          <NavLink>Services</NavLink>
        </div>
        <div className="nav-item">
          <NavLink>Orders</NavLink>
        </div>
      </div> */
}
