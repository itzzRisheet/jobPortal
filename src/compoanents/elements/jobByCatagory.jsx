import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { jobIndustries } from "../constants/constants";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const JobByCatagory = () => {
  return (
    <div className="text-white w-80p h-60p flex flex-col gap-3 items-center">
      <h1 className="font-bold text-4xl text-center">Browse by catagory</h1>
      <h4>Find the job that's perfect for you</h4>
      <div className="w-100p h-[30vh] md:h-[40vh] transition-all duration-150 border-x-2 border-x-transparent hover:border-x-white overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-4 px-10 my-[3rem] ">
        {jobIndustries.map((job, i) => {
          return (
            <div
              key={i}
              className="jobCard bg-blue-950  flex items-center justify-between rounded-2xl py-4 px-4"
            >
              <FontAwesomeIcon icon={faComputer} className="w-40p h-60p" />
              <div className="flex flex-col w-60p justify-start">
                <h1 className="font-bold text-lg ">{job}</h1>
                <h3 className="text-md">1 jobs available</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobByCatagory;
