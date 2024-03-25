import React from "react";
import { jobs } from "../constants/constants";
import softwareDevBg from "../assests/bgImages/softwareDev.jpg";
import JobCard from "./JobCard";

const JobsOfTheDay = () => {
  return (
    <div className="text-white  overflow-auto flex flex-col items-center w-80p gap-2">
      <h1 className="text-4xl font-bold">Jobs of the day</h1>
      <h3 className="text-sm">
        Hunt for the trends and put your skills to work
      </h3>
      <div className="jobCards grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 my-[3rem] transition-all duration-150 border-x-2 border-x-transparent hover:border-x-white px-5 h-[65%] sm:h-auto lg:h-auto overflow-auto ">
        {jobs.map((job, i) => {
          return <JobCard job={job} key={i} inHome={true}/>;
        })}
      </div>
    </div>
  );
};

export default JobsOfTheDay;
