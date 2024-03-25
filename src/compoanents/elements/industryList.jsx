import {
  faAngleRight,
  faCancel,
  faCheck,
  faCross,
  faIndustry,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { jobIndustries } from "../constants/constants";
import { useFilterData } from "../../store/store";

const IndustryList = ({
  inFilter = false,
  className,
  jobIndustries,
  listType,
}) => {
  const [menuOpen, setmenuOpen] = useState(false);

  const { filters, setFilters, clearFilters } = useFilterData();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [industries, setIndustries] = useState(jobIndustries);
  const [selectedIndustry, setSelectedIndustry] = useState(filters.industries);

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

  const toggleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  const handleIndustrySelect = (e) => {
    const industry = e.target.textContent;

    console.log(industry);

    if (selectedIndustry.includes(industry)) {
      setSelectedIndustry(selectedIndustry.filter((item) => item !== industry));
    } else {
      setSelectedIndustry((prev) => [...prev, industry]);
      setIndustries((prev) => [
        industry,
        ...prev.filter((item) => item !== industry),
      ]);
    }
  };

  useEffect(() => {
    const filters = { industries: selectedIndustry };
    if (selectedIndustry.length > 0) {
      setFilters(filters);
    } else {
      clearFilters();
    }
  }, [selectedIndustry]);

  return (
    <div className="w-100p">
      <div
        className={`relative ${className} flex items-center bg-transparent p-2  w-100p     border-b-[2px] border-opacity-[0.3] outline-none transition-all duration-300 text-center text-slate-300 border-white focus:border-opacity-[1] `}
      >
        <span
          className="w-100p  flex  justify-center hover:cursor-pointer "
          onClick={toggleMenu}
        >
          {selectedIndustry.length > 0 && !inFilter ? (
            <ul className="flex justify-center gap-4 w-80p ">
              <li className="bg-blue-950 flex items-center rounded-lg px-2">
                {selectedIndustry[0]}
              </li>
              {screenWidth > 1180 && selectedIndustry[1] ? (
                <li className="bg-blue-950 flex items-center rounded-lg px-2">
                  {selectedIndustry[1]}
                </li>
              ) : (
                <span className="bg-transparent"></span>
              )}
              <li>
                {selectedIndustry.length > 2 ? (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faPlus} />
                    {screenWidth > 1180
                      ? selectedIndustry.length - 2
                      : selectedIndustry.length - 1}
                  </span>
                ) : (
                  ""
                )}
              </li>
            </ul>
          ) : (
            "Select Industry"
          )}
        </span>
        <FontAwesomeIcon
          icon={faIndustry}
          color="white"
          className=" absolute left-0"
        />

        <FontAwesomeIcon icon={faAngleRight} className="absolute right-0" />
        {selectedIndustry.length > 0 ? (
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              setSelectedIndustry([]);
              setIndustries(jobIndustries);
            }}
            className="absolute right-10 transition-all duration-150 hover:scale-[30px] cursor-pointer"
          />
        ) : (
          ""
        )}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute bg-transparent  backdrop-blur-2xl z-10 text-slate-300   ${
            inFilter
              ? "md:top-10 border-white border-x-[1px] border-b-[1px] rounded-b-2xl"
              : "md:-right-[17rem] md:top-0 rounded-2xl "
          } 4xl:top-10 
 "md:backdrop-blur-lg"
         4xl:backdrop-blur-2xl md:bg-transparent top-[100%]  w-100p md:w-auto  `}
        >
          <ul className="flex flex-col gap-[1rem] overflow-auto h-[30vh]">
            {industries.map((industry, key) => {
              return (
                <li
                  className=" relative flex justify-center items-center border-b-[2px] pr-5 border-slate-400 text-slate-300 hover:cursor-pointer hover:text-slate-100 hover:border-white"
                  onClick={handleIndustrySelect}
                  key={key}
                >
                  {industry}
                  {selectedIndustry.includes(industry) ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="absolute right-0 bg-green-400"
                    />
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {inFilter ? (
        <div className="selected-items  w-100p p-2">
          <ul className="flex flex-row flex-wrap  text-sm gap-2">
            {selectedIndustry.map((ind) => {
              return (
                <li className="flex items-baseline bg-blue-950 px-2 rounded-xl py-1 gap-2">
                  {ind}{" "}
                  <span className="">
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => {
                        setSelectedIndustry((prev) =>
                          prev.filter((item) => item !== ind)
                        );
                      }}
                      className="hover:scale-110 cursor-pointer"
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default IndustryList;
