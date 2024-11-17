import React from "react";

const Introducetion = () => {
  const instructor = "/images/home/for-instructors.png";
  const student = "/images/home/for-students.png";

  return (
    <div className="home-container flex flex-col justify-center items-center gap-8">
      <h1 className="home-title ">
        What is <span className="text-orange">Skilline?</span>
      </h1>
      <p className="text-sm text-gray-400 text-center w-2/3 md:w-1/2">
        Skilline is a platform that allows educators to create online classes
        whereby they can store the course materials online; manage assignments,
        quizzes and exams; monitor due dates; grade results and provide students
        with feedback all in one place.
      </p>

      <div className="flex md:flex-row flex-col justify-between items-center lg:items-start w-full">
        <div className="relative bg-base-100 w-72 lg:w-5/12 shadow-xl rounded-2xl">
          <img src={instructor} alt="" className="w-full h-auto rounded-xl" />
          <div className="rounded-xl absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
            <h2 className="font-bold text-2xl text-white md:text-4xl">FOR INSTRUCTORS</h2>
            <p className="text-white md:text-xl">Become our instructors</p>
            <div className="justify-center mt-4">
              <button className="btn text-white bg-transparent rounded-full">
                Start a class today
              </button>
            </div>
          </div>
        </div>
        <div className="relative bg-base-100 w-72 lg:w-5/12 shadow-xl rounded-xl">
          <img src={student} alt="" className="w-full h-auto rounded-2xl" />
          <div className="rounded-xl absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
            <h2 className="font-bold text-2xl text-white md:text-4xl">FOR STUDENTS</h2>
            <p className="text-white md:text-xl">Join us and Start Study Now</p>
            <div className="justify-center mt-4">
              <button className="btn text-white bg-transparent rounded-full">
                Join a class today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introducetion;
