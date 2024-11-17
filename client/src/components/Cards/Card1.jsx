import React from "react";

const Card1 = ({ item }) => {
  return (
    <div className="relative bg-base-100 w-64 h-64 md:w-90 md:h-76 shadow-sm rounded-xl
          hover:shadow-2xl hover:shadow-orange 
    ">
      <img
        src={item.img || '/images/home/beauty.png'}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="p-5 rounded-xl absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end bg-black bg-opacity-50">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-bold text-xl text-white">{item.title || item.name}</h2> 
          <p className="text-white text-xs capitalize">{item.position}</p>
        </div>
        <p className="text-white text-sm">{item.des}</p>
        
        
      </div>
    </div>
  );
};

export default Card1;
