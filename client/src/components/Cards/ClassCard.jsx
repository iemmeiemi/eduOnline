import React from "react";
import { useNavigate } from "react-router-dom";

export const ClassCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/class/${item._id}`); // Điều hướng đến trang chi tiết lớp
  };

  return (
    <div 
      className="card card-compact bg-base-100 w-72 h-80 my-3 shadow-xl flex flex-col cursor-pointer" 
      onClick={handleCardClick} // Thêm sự kiện click vào thẻ
    >
      <figure className="flex-grow">
        <img
          src={item.photoURL}
          alt={item.name} // Sửa alt để sử dụng đúng tên lớp
          className="w-full h-40 object-cover" // Đặt chiều cao cố định cho hình ảnh
        />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <h2 className="font-bold text-lg truncate">{item.name}</h2>
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