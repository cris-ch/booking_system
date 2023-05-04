import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="flex gap-2 border border-color-gray-300 rounded-full py-2 px-4 shadow-md shadow-color-gray-300 items-center">
      <div>Anywhere</div>
      <div className="border-l border-gray-300"></div>
      <div>Anytime</div>
      <div className="border-l border-gray-300"></div>
      <div>Add guests</div>
      <button className="bg-primary text-white p-1 rounded-full">
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
