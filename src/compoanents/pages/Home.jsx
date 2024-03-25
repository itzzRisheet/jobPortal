import React, { useEffect, useState } from "react";
import heroBGLarge from "../assests/bgImages/heroBGLarge.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndustry,
  faLocation,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import IndustryList from "../elements/industryList";
import JobByCatagory from "../elements/jobByCatagory";
import { useNavigate } from "react-router-dom";
import JobsOfTheDay from "../elements/jobsOfTheDay";
import { useFilterData } from "../../store/store";
import Footer from "../elements/Footer";
import { cities, jobIndustries } from "../constants/constants";
import SelectList from "../elements/selectList";

const Home = () => {
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [locationCities, setLocationCities] = useState(cities);
  const [selectedLocationCities, setSelectedLocationCities] = useState([]);
  const { filters, initialFilters, setFilters, isAddedFilters } =
    useFilterData();

  useEffect(() => {
    setFilters({ locations: selectedLocationCities });
  }, [selectedLocationCities]);

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
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let timeoutId;

  return (
    <div className="center-div  ">
      <div
        className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-1] brightness-[50%] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.3)), url(${heroBGLarge})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute top-0 left-0 z-10 pt-[15vh] min-h-[100vh] w-[100vw] ">
        <div className=" h-[85vh] w-[100vw]  flex flex-col items-center p-[4rem]  ">
          <div className="flex flex-col gap-[1rem] transition-all  duration-300 h-80p w-100p mg:h-80p md:w-60p rounded-2xl">
            <div className="slogan text-white sm:text-2xl lg:text-3xl xl:text-4xl text-center font-sans font-bold">
              Embark on the Journey to Your Dream Career: Where Opportunities
              Await!
            </div>
            <div className="text-[0.9em] sm:text-sm lg:text-sm xl:text-md text-white text-center">
              Each month, more than 3 million job seekers turn to website in
              their search for work, making over 140,000 applications every
              single day
            </div>
            <div className=" flex justify-center w-100p  ">
              <div className="w-100p flex flex-col justify-center items-center gap-[1rem]">
                <div className="relative flex items-center w-100p md:w-70p  ">
                  <IndustryList jobIndustries={jobIndustries} />
                </div>
                <div className="small-form">
                  <div className="relative flex items-center ">
                    <div className="relative w-100p ">
                      <SelectList
                        inHome={true}
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
                          setSelectedLocationCities((prev) =>
                            prev.filter((item) => item !== option)
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (
                      JSON.stringify(initialFilters) !== JSON.stringify(filters)
                    ) {
                      navigate("/jobs");
                    }
                  }}
                  className="bg-blue-400 transition-all duration-100 px-6 py-2 rounded-xl hover:scale-105 md:w-50p "
                >
                  Find Jobs
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex ${
              screenWidth < 800 ? "hidden" : ""
            } flex-wrap w-100p justify-between  gap-2  text-white`}
          >
            <div className="w-[20vw]  flex flex-col items-center">
              <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold">
                25K+
              </h1>
              <h3 className="text-sm lg:text-md md:text-xl text-slate-300">
                cases completed
              </h3>
              <h5 className="text-xs lg:text-sm md:text-md text-center text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                accusantium.
              </h5>
            </div>
            <div className="w-[20vw] flex flex-col items-center">
              <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold ">
                17K+
              </h1>
              <h3 className="text-sm lg:text-md md:text-xl text-slate-300">
                Placed by us
              </h3>
              <h5 className="text-xs lg:text-sm md:text-md text-center text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                accusantium.
              </h5>
            </div>
            <div className="w-[20vw] flex flex-col items-center">
              <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold">
                500+{" "}
              </h1>
              <h3 className="text-sm lg:text-md md:text-xl text-slate-300">
                skilled employees
              </h3>
              <h5 className="text-xs lg:text-sm md:text-md text-center text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                accusantium.
              </h5>
            </div>
            <div className="w-[20vw] flex flex-col items-center">
              <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold">
                100+{" "}
              </h1>
              <h3 className="text-sm lg:text-md md:text-xl text-slate-300">
                jobs posted/week
              </h3>
              <h5 className="text-xs lg:text-sm md:text-md text-center text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                accusantium.
              </h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center browse-by-catagory  h-[100vh] w-[100vw]  bg-bghero">
          <JobByCatagory />
        </div>
        <div className="h-[100vh] md:h-auto w-[100vw] py-10 flex flex-col  items-center z-10 bg-bghero">
          <JobsOfTheDay />
        </div>
        <div className="flex h-[30vh] text-white bg-blue-950 ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
