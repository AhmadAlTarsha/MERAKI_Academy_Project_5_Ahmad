import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"login"}>Login</NavLink>
      <NavLink>Contact Us</NavLink>
      <NavLink>Logout</NavLink>
    </nav>
  );
};

export default Navbar;
