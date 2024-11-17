import React, { useState } from "react";
import { HiSearch } from 'react-icons/hi'; // Import icon tìm kiếm

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home-container py-10 flex flex-col gap-4 justify-center items-center">
      <h1 className="home-title-small">
        Search among <span className="text-orange">58340 </span>courses and find
        your favorite course
      </h1>
      <div className="flex md:flex-row flex-col gap-3 justify-center items-center">
        <div className="flex flex-row justify-center items-center bg-super-light-gray rounded-full p-2 gap-4">
          <a
            href=""
            className=" btn rounded-full font-semibold bg-light-blue text-dark-blue"
          >
            Category
          </a>
          <input
            type="text"
            className="flex-1 bg-super-light-gray focus:outline-none"
            placeholder="Search Anything..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search courses"
          />
          <HiSearch className="text-3xl"/>
          
        </div>
        <p className="w-full text-center">Or explore more about us...</p>
      </div>
    </div>
  );
};

export default Search;
