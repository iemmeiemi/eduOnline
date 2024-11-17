import React from "react";
import { HiUserGroup } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";

const Banner = () => {
  // images
  const rightImg = "/images/home/holdingbooks-1.png";
  return (
    <div
      className='  flex flex-col justify-stretch items-center md:flex-row-reverse gap-8
        py-20 bg-[url("/images/home/banner-bg.png")] bg-cover bg-center h-1/2 home-container'
    >
      <div className="w-1/2 flex flex-col justify-center items-center">
        <img src={rightImg} className="" alt="" />
        <div className="flex flex-col sm:flex-row gap-5 justify-stretch -mt-20 md:-mt-5">
          <div className="flex-1 bg-white rounded-2xl flex flex-row gap-3 justify-center items-center p-3 hover:outline hover:outline-orange">
            <HiUserGroup className="text-3xl text-orange" />
            <div className="">
              <h1 className="font-bold text-sm text-dark-blue">Community</h1>
              <p className="text-xs">Total members: 10000+</p>
            </div>
          </div>
          <div className=" flex-1 bg-white rounded-2xl flex flex-row gap-3 justify-center items-center p-3 hover:outline hover:outline-orange">
            <SiGoogleclassroom className="text-3xl text-orange" />
            <div className="">
              <h1 className="font-bold text-sm text-dark-blue">Class</h1>
              <p className="text-xs">Total classes: 100+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-3">
        <h1 className="font-bold text-dark-blue text-3xl md:text-5xl">
          <span className="text-orange">Studying</span> Online is now much
          easier
        </h1>
        <p className="font-light text-lg md:w-2/3">
          Skilline is an interesting platform that will teach you in more an
          interactive way
        </p>
        <div className="flex flex-row gap-3 justify-center items-center md:justify-start md:items-start">
          <a
            href=""
            className="btn bg-orange text-white rounded-full hover:bg-white hover:text-black"
          >
            Join Now
          </a>
          <a
            href=""
            className="btn bg-white rounded-full hover:bg-orange hover:text-white"
          >
            Explore More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
