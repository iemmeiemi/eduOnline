import React from "react";

const Benefit = () => {
  const video = "/images/home/video-class.png";
  return (
    <div className="home-container py-20 md:py-24 flex flex-col md:flex-row gap-8 justify-center items-center">
      <div className=" w-2/3 md:w-1/2 flex flex-col gap-5">
        <h2 className="text-3xl font-bold">
          Everything you can do in a physical classroom,
          <span className="text-orange"> you can do with Skilline</span>
        </h2>
        <p className="text-sm text-gray-500">
          Skilline’s school management software helps traditional and online
          schools manage scheduling, attendance, payments and virtual classrooms
          all in one secure cloud-based system.
        </p>
        <a href="" className="text-sm text-gray-500">
          Learn more
        </a>
      </div>
      <div className="w-2/3 md:w-1/2"></div>
    </div>
  );
};

export default Benefit;
