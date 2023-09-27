import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";

const Adminindex = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden admin-root-layout">
      <SideBar />

      <main className="p-4">
        <header className="bg-teal-200">Header</header>
        <Outlet />
      </main>
    </div>
  );
};

export default Adminindex;
