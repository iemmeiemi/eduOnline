import React from "react";


const PopularClass = () => {
  const popClasses = [
    {
      id: 1,
      title: "Product Management Basic",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "380",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 2,
      title: "BM Data Science Professional",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "550",
      tag: ["technologies", "data"],
      img: "/images/home/BMclass.png",
    },
    {
      id: 3,
      title: "The Science of Well-Being",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "470",
      tag: ["skills", "business"],
      img: "/images/home/wellClass.png",
    },
    {
      id: 4,
      title: "Python for Everybody Specialization",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "280",
      tag: ["skills", "business"],
      img: "/images/home/pythonClass.png",
    },
    {
      id: 5,
      title: "Front-End Development",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "600",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 6,
      title: "UX/UI for Beginners",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "280",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 7,
      title: "BM Data Science Professional",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "550",
      tag: ["technologies", "data"],
      img: "/images/home/BMclass.png",
    },
    {
      id: 8,
      title: "The Science of Well-Being",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "470",
      tag: ["skills", "business"],
      img: "/images/home/wellClass.png",
    },
  ];

  return (
    <div className="home-container py-10 md:py-20 flex flex-col justify-center items-center gap-7">
      <h1 className="home-title">
        Popular <span className="text-orange">Classes</span>
      </h1>
      <div className="flex flex-wrap justify-between items-center">
        {popClasses.map((item, index) => (
          
          <div key={item.id} className="card card-compact bg-base-100 w-72 h-72 my-3 shadow-xl flex flex-col">
            <figure className="flex-grow">
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover"
              />
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
        ))}
      </div>
      <div className="w-full flex justify-end">
        <a href="" className="text-lg hover:text-light-blue text-dark-blue">
          more...
        </a>
      </div>
    </div>
  );
};

export default PopularClass;
