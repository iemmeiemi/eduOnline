import React from "react";
import useCategory from "../../../hooks/useCategory";

const ClassInfoBanner = ({ classDetail, isOwner, instructor }) => {
  const { categories = [], isLoading } = useCategory();

  const handleEditClass = () => {};
  const handleCreateInstance = () => {};

  const handleJoinClass = () => {};

  return (
    <div className="flex flex-col justify-stretch items-center gap-8 sm:flex-row">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={classDetail.photoURL}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{classDetail.name}</h1>
            <p className="py-6">{classDetail.des}</p>
            {isOwner ? (
              <div className="flex gap-5">
                <button className="btn bg-orange" onClick={handleEditClass}>
                  Edit Class
                </button>
                <button className="btn bg-orange" onClick={handleCreateInstance}>
                  Create Instance
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <a href="/profile/${instructor._id}">
                  Instructor:{" "}
                  <span className="text-dark-blue hover:text-black">
                    {instructor.name}
                  </span>
                </a>
                <button className="btn bg-light-blue" onClick={handleJoinClass}>
                  Join Class
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center">
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <th>Expected Duration</th>
                <td>{classDetail.expectedDuration}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{classDetail.expectedDuration}</td>
              </tr>
              <tr>
                <th>Attendances</th>
                <td>{classDetail.students}</td>
              </tr>
              <tr>
                <th>Created at</th>
                <td>{classDetail.createdAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoBanner;
