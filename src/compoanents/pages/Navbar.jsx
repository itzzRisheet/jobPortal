import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex text-gray-400 w-100p font-bold justify-center">
      <nav className="h-[10%] w-[80%] px-5 z-20 fixed top-4 overflow-hidden flex backdrop-blur-[40px] rounded-[40px] items-center justify-between">
        <div className="">logo</div>
        <div className="">
          <ul
            className="hidden gap-[2rem]  md:flex lg:flex
          "
          >
            <li className="link">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="link">
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            <li className="link">
              <Link to={"/recruiters"}>Recruiters</Link>
            </li>
            <li className="link">
              <Link to={"/candidates"}>Candidates</Link>
            </li>
          </ul>
        </div>
        <div className="submit-button">Post a job</div>
      </nav>
    </div>
  );
};

export default Navbar;
