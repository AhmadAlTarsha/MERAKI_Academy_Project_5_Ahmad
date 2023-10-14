import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/Header/Header";

const Adminindex = () => {
  return (
    <>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen admin-root-layout">
        <SideBar />

        <main className="w-full p-4">
          <Header />
          <Outlet />
        </main>
      </div>
    </>

  );
};

export default Adminindex;
