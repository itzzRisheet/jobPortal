import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFilterData, usejobData } from "../../store/store";
import JobCard from "../elements/JobCard";
import { cities, jobIndustries } from "../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faFilter,
  faLocation,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../elements/Footer";
import IndustryList from "../elements/industryList";
import SelectList from "../elements/selectList";
import bgImage from "../assests/bgImages/softwareDev.jpg";

const Jobs = () => {
  const { filteredJobs } = usejobData();
  const { filters, setFilters, clearFilters } = useFilterData();
  const locations = ["On-site", "work from home"];
  const [filterOpen, setFilterOpen] = useState(true);
  const [location, setLocation] = useState("");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [locationCities, setLocationCities] = useState(cities);
  const [selectedLocationCities, setSelectedLocationCities] = useState(
    filters.locations
  );
  useEffect(() => {
    console.log(filters);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleJobTypeSelect = (option) => {
    console.log(option);
    if (selectedJobType.includes(option)) {
      setSelectedJobType(selectedJobType.filter((item) => item !== option));
    } else {
      setSelectedJobType((prev) => [...prev, option]);
    }
  };
  const handleLocationSelect = (option) => {
    if (selectedLocationCities.includes(option)) {
      setSelectedLocationCities(
        selectedLocationCities.filter((item) => item !== option)
      );
    } else {
      setSelectedLocationCities((prev) => [...prev, option]);
    }
  };

  useEffect(() => {
    axios.get("");
  });

  return (
    <div className="pt-[15vh] flex flex-col bg-bghero items-center gap-2  h-auto min-h-[100vh] w-[100vw]">
      {/* <div className="bgJobs brightness-75 z-[-1] bc absolute top-0 left-0 h-full w-full"></div> */}
      <div className="w-100p h-100p z-10 flex flex-col gap-2 md:px-4 md:flex-row md:gap-4">
        <h3
          className="text-white text-center block md:hidden cursor-pointer"
          onClick={() => {
            setFilterOpen(!filterOpen);
          }}
        >
          {" "}
          <span>
            <FontAwesomeIcon icon={faFilter} />
          </span>{" "}
          Filters
        </h3>
        <div
          className={`filters bc ${
            filterOpen ? "h-100p p-[2rem]" : "h-0 overflow-hidden"
          }   flex flex-col gap-4 backdrop-blur-2xl overflow-auto   items-center transition-all duration-150 md:p-[2rem]   md:h-[80vh] w-100p md:w-[20vw]  text-white  rounded-2xl  border-2 border-transparent hover:border-white `}
        >
          <h3 className="text-white text-center hidden md:block ">
            {" "}
            <span>
              <FontAwesomeIcon icon={faFilter} />
            </span>{" "}
            Filters
          </h3>
          <div className="relative bcg w-100p p-4">
            <span className="absolute -top-3 left-5 z-[2] bg-bghero px-2 text-white">
              select Industry
            </span>
            <IndustryList
              inFilter={true}
              className={"mt-4 "}
              jobIndustries={jobIndustries}
            />
          </div>
          <div className="locationType relative w-100p flex flex-col gap-2 bcg p-4 mb-2">
            <span className="absolute -top-3 left-5 z-[2] bg-bghero px-2 text-slate-500">
              Location Type
            </span>
            <ul className="flex flex-col gap-2">
              {locations.map((loc) => {
                return (
                  <li
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      setLocation(loc);
                    }}
                  >
                    <span className="">
                      <FontAwesomeIcon
                        icon={faCheck}
                        size=""
                        className={`${
                          loc !== location ? "invisible" : "block"
                        }  `}
                      />
                    </span>
                    <span
                      className={`border-b-2  border-transparent transition-all duration-300 ${
                        loc === location ? "border-white" : "hover:border-white"
                      } `}
                    >
                      {loc}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative bcg w-100p p-4">
            <span className="absolute -top-3 left-5 z-[2] bg-bghero px-2 text-slate-500">
              select Job type
            </span>
            <SelectList
              icon={faNewspaper}
              options={["part-time", "full-time", "intern", "contract"]}
              selectedOptions={selectedJobType}
              onChange={handleJobTypeSelect}
              optionName={"Job type"}
              clearSelect={() => {
                setSelectedJobType([]);
              }}
              ExternalMenu={true}
              removeSelectOption={(option) => {
                setSelectedJobType((prev) =>
                  prev.filter((item) => item !== option)
                );
              }}
              sortByInput={(input) => {
                if (selectedJobType.includes(input)) {
                  setSelectedJobType(prev.filter((item) => item !== input));
                  setSelectedJobType((prev) => [input, ...prev]);
                }
              }}
            />
          </div>
          <div className="relative bcg w-100p p-4">
            <span className="absolute -top-3 left-5 z-[2] bg-bghero px-2 text-slate-500">
              select Location
            </span>
            <SelectList
              icon={faLocation}
              options={locationCities}
              selectedOptions={selectedLocationCities}
              onChange={handleLocationSelect}
              optionName={"Location"}
              clearSelect={() => {
                setSelectedLocationCities([]);
              }}
              ExternalMenu={true}
              removeSelectOption={(option) => {
                setSelectedJobType((prev) =>
                  prev.filter((item) => item !== option)
                );
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1  auto-rows-min scroll-py-10 md:grid-cols-2  lg:grid-cols-3 h-[80vh] w-100p md:w-[80vw] rounded-2xl overflow-auto gap-6 p-[2rem] transition-all duration-150 border-2 border-transparent hover:border-white ">
          {filteredJobs.map((job, i) => {
            return <JobCard job={job} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
