import React from "react";
import Navbar from "./compoanents/pages/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" relative">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
