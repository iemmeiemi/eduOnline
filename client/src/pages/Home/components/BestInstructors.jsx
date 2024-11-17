import React from "react";
import { MdNavigateNext } from "react-icons/md";


const BestInstructors = () => {
  const experts = [
    {
      id: 1,
      name: "Jon Kantner",
      position: "designer",
      img: "/images/home/expertJon.png",
    },
    {
      id: 2,
      name: "Debbie LaChusa",
      position: "SEO",
      img: "/images/home/expertDebbie.png",
    },
    {
      id: 3,
      name: "Edwin Diaz",
      position: "Composer",
      img: "/images/home/expertErwin.png",
    },
    {
      id: 4,
      name: "Cassie Evans",
      position: "photographer",
      img: "/images/home/expertsCassie.png",
    },
    {
      id: 5,
      name: "Erich Andreas",
      position: "programmer",
      img: "/images/home/expertErich.png",
    },
    {
      id: 6,
      name: "Jason Allen",
      position: "Accounting",
      img: "/images/home/expertJason.png",
    },
  ];

  return (
    <div className="home-container p-5 bg-light-blue bg-opacity-35 flex flex-col md:flex-row justify-center items-center  text-center sm:text-start">
      <div className="w-1/3 pr-10">
        <h1 className="home-title-half ">
          Best <span className="text-dark-blue">Instructors</span>
        </h1>
        <p className="home-des">
          At the Academy, we strive to bring together the best professors for
          the best courses
        </p>
        <br />
        <br className="sm:hidden"/>
        <br className="sm:hidden"/>
        <br className="sm:hidden"/>
        <a href="" className="btn-blue">
          All Instructors
          <MdNavigateNext className="text-2xl" />
        </a>
      </div>
      <div className=" py-10 w-2/3 flex flex-col sm:flex-row gap-5 flex-wrap justify-center items-center bg-light-blue rounded-full">
        {experts.map((item) => (
          <div key={item.id}
            className="relative bg-base-100 w-40 h-40 lg:w-60 lg:h-76 shadow-sm rounded-xl
          hover:shadow-2xl hover:shadow-dark-blue 
    "
          >
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="p-5 rounded-xl absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end bg-black bg-opacity-50">
              <div className="flex flex-row items-center justify-between">
                <h2 className="font-bold text-xl text-white">
                  {item.title || item.name}
                </h2>
                <p className="text-white text-xs capitalize">{item.position}</p>
              </div>
              <p className="text-white text-sm">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestInstructors;
