import React from "react";

export const ClassCard = ({ item }) => {
  return (
    <div className="card card-compact bg-base-100 w-72 h-72 my-3 shadow-xl flex flex-col">
      <figure className="flex-grow">
        <img src={item.img} alt="" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <h2 className="font-bold text-lg truncate">{item.title}</h2>
        <p className="text-xs text-gray-700 line-clamp-2">{item.des}</p>
        <div className="card-actions justify-end items-center">
          <p className="text-orange font-bold text-lg">$ {item.price}</p>
          <button className="btn-blue">Join Now</button>
        </div>
      </div>
    </div>
  );
};
export default ClassCard;
