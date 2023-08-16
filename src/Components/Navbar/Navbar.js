import React from "react";
import Logo from "./logo.png";
import './nav.css'

const Navbar = () => {

  return (
    <div
      className="h-14 w-screen fixed z-50
     Nav"
    >
      <div className="flex items-center font-bold text-3xl mx-2 my-1">
        <img className="h-11 my-auto ml-5 " src={Logo} alt="AlmaBetter" />
        <span className="text-black">maBetter</span>
      </div>
    </div>
  );
};

export default Navbar;
