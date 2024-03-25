import React from "react";
import softwareDevBg from "../assests/bgImages/softwareDev.jpg";

const JobCard = ({ job, inHome }) => {
  return (
    <div
      className={`flex flex-col gap-2  text-white bg-blue-950
        rounded-xl `}
    >
      {inHome && (
        <div className="thumbnail brightness-50">
          <img
            src={softwareDevBg}
            alt=""
            className="h-100p w-100p rounded-t-2xl"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 px-4 py-4">
        <div className="title text-lg font-bold">{job.title}</div>
        <div className="flex gap-3 text-sm">
          <div className="location text-sm">{job.location}</div>
          <div className="postedtime">{job.postedTime}</div>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2 text-slate- text-sm">
            {job.tags.map((tag, i) => {
              return (
                <li
                  key={i}
                  className="bg-slate-900 px-3 py-[0.1rem] rounded-xl"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="text-sm">{job.jobDetails}</div>
      </div>
    </div>
  );
};

export default JobCard;
