import React from "react";
import NavbarSection from "../components/Navbars/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="root-layout bg-[#F5F5DD]">
      <NavbarSection />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
