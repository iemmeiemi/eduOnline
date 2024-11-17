import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card1 from "../../../components/Cards/Card1";
import { MdNavigateNext } from "react-icons/md";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        textColor: "orange",
        borderRadius: "15px",
      }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const Category = () => {
  const slider = React.useRef(null);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const categories = [
    {
      id: 1,
      title: "Marketing",
      des: "One powerful online software suite that combines",
      img: "/images/home/marketing.jpg",
      icon: "",
    },
    {
      id: 2,
      title: "Design",
      des: "One powerful online software suite that combines",
      img: "/images/home/designer.jpg",
      icon: "",
    },
    {
      id: 3,
      title: "Programming",
      des: "One powerful online software suite that combines",
      img: "/images/home/programmer.jpg",
      icon: "",
    },
    {
      id: 4,
      title: "Language",
      des: "One powerful online software suite that combines",
      img: "/images/home/interpreter.jpg",
      icon: "",
    },
    {
      id: 5,
      title: "Medical",
      des: "One powerful online software suite that combines",
      img: "/images/home/medical.jpg",
      icon: "",
    },
    {
      id: 6,
      title: "Nutrition",
      des: "One powerful online software suite that combines",
      img: "/images/home/nutrition.png",
      icon: "",
    },
  ];

  return (
    <div className="mt-10 bg-light-orange home-container py-10 ">
      <h1 className="flex justify-center home-title text-center mx-auto">
        Top <span className="text-orange">Category</span>
      </h1>
      <div className="slider-container mt-10 ">
        <Slider ref={slider} {...settings} className="space-x-5 flex">
          {categories.map((item, i) => (
            <Card1 item={item} key={i} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
