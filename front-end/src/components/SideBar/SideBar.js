import React from "react";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";

// const items = [
//   {
//     path: "",
//     icon: <FcBullish />,
//     name: "Dashboard",
//   },
//   {
//     path: "posts",
//     icon: <FcBullish />,
//     name: "Posts",
//   },
//   {
//     path: "services",
//     icon: <FcBullish />,
//     name: "Services",
//   },
// ];

const SideBar = () => {
  return (
    <aside className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">Open Shop</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {/* {items.map((item) => {
          return (
            <NavLink
              to={item.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
                  : isActive
                  ? "text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
                  : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          );
        })} */}

        <NavLink
          to={"a"}
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : isActive
              ? "bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>
          Dashboard
        </NavLink>

        <NavLink
          to={"categories"}
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : isActive
              ? "bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>
          Categories
        </NavLink>

        <NavLink
          to={"sub-categories"}
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : isActive
              ? "bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>
          Sub Categories
        </NavLink>

        <NavLink
          to={"posts"}
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : isActive
              ? "text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>
          Posts
        </NavLink>

        <NavLink
          to={"services"}
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : isActive
              ? "text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              : "text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <FcBullish />
          </span>
          Services
        </NavLink>
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        <div
          className={
            "text-red-500 cursor-pointer flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          }
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
