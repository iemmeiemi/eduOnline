import React from "react";

const Break1 = () => {
  return (
    <div className="home-container py-20 md:py-24 flex flex-col md:flex-row">
      <div className="md:w-1/2 flex justify-center items-center relative bg-light-orange rounded-full
        hover:-translate-y-3 transition-all duration-200 ease-in-out hover:shadow-md
      ">
        <img
          src="./images/home/expert.png"
          alt="Expert"
          className="w-72 rounded-lg relative z-10 " // Đặt z-index để hình ảnh ở trên
        />
        <div className="absolute bg-orange rounded-full w-3/4 h-2/3 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className=" py-10 px-20 md:w-1/2 flex items-center justify-center">
        <div className="">
          <h2 className="home-title-half">We are <span className="text-orange">Experts</span> Learning Institutions</h2>
          <p className="home-des lg:w-3/4">
            We are Experts Learning Institutions, committed to excellence in education. Our curriculum combines theory and practical skills, fostering innovation and personalized learning while empowering students to become future leaders.
          </p>
          <br />
          <a href="" className="btn-orange ">Enroll Now!</a>
        </div>
      </div>
    </div>
  );
};

export default Break1;
