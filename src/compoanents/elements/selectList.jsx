import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faIndustry,
  faAngleRight,
  faTimes,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const SelectList = ({
  options,
  selectedOptions,
  onChange,
  clearSelect,
  optionName,
  ExternalMenu = false,
  removeSelectOption,
  icon,
  sortByInput,
  inHome = false
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
  };

  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[m][n];
  }

  function similarity(str1, str2) {
    const maxLen = Math.max(str1.length, str2.length);
    const distance = levenshteinDistance(str1, str2);
    return 1 - distance / maxLen;
  }
  let blurtimeout;

  return (
    <div className="w-100p flex flex-col gap-4 ">
      <div className="relative">
        <div className="flex items-center bg-transparent  transition-all duration-300 text-center text-slate-300  ">
          {/* <span
            className="flex justify-center w-full hover:cursor-pointer"
            onClick={toggleMenu}
          >
            Select {optionName}
          </span> */}
          <input
            type="text"
            value={input}
            className="input"
            placeholder={`${optionName}`}
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
            }}
            onFocus={() => {
              clearTimeout(blurtimeout);
              setMenuOpen(true);
            }}
            onBlur={() => {
              blurtimeout = setTimeout(() => {
                setInput("");
                setMenuOpen(false);
              }, 200);
            }}
          />
          <FontAwesomeIcon
            icon={icon}
            color="white"
            className="absolute left-0"
          />
          <FontAwesomeIcon icon={faAngleRight} className="absolute right-0" />
          {selectedOptions.length > 0 && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={clearSelect}
              className="absolute right-10 transition-all duration-150 hover:scale-[30px] cursor-pointer"
            />
          )}
        </div>
        {menuOpen && (
          <div className={`absolute  z-20  text-slate-300 border-white ${inHome ? 'backdrop-blur-md': 'backdrop-blur-2xl'} border-x-[1px] border-b-[1px] rounded-b-2xl top-[100%]  w-full`}>
            <ul className="flex flex-col gap-3 pt-2 overflow-auto max-h-[100px]">
              {options
                .sort((a, b) => {
                  const scoreA = similarity(a, input);
                  const scoreB = similarity(b, input);

                  return scoreB - scoreA;
                })
                .map((option, index) => (
                  <li
                    className="relative flex justify-center  items-center border-b-[2px] pr-5 border-slate-400 text-slate-300 hover:cursor-pointer hover:text-slate-100 hover:border-white"
                    onClick={() => handleOptionSelect(option)}
                    key={index}
                  >
                    {option}
                    {selectedOptions.includes(option) && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="absolute right-0 bg-green-400"
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {ExternalMenu ? (
        <div>
          <ul className="flex flex-row flex-wrap  text-sm gap-2">
            {selectedOptions.map((opt) => {
              return (
                <li className={`flex items-baseline ${inHome ? 'bg-slate-800 text-slate-400': 'bg-blue-950'} px-2 rounded-xl py-1 gap-2`}>
                  {opt}
                  <span
                    className="hover:scale-110 cursor-pointer"
                    onClick={() => {
                      removeSelectOption(opt);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
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

export default SelectList;
