import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { banner1, banner2, banner3 } from "../assets/index.js";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    <img src={banner1} alt="img1" />,
    <img src={banner2} alt="img2" />,
    <img src={banner3} alt="img3" />,
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-sreen h-[650px] relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100})` }}
          className="w-[400vw] h-full flex transition-transform duration-700"
        >
          {data.map((image, index) => (
            <div
              key={index}
              className={`w-screen h-full object-cover position:relative ${
                index === currentSlide ? "" : "hidden"
              }`}
            >
              {image}
            </div>
          ))}
        </div>

        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44">
          <div
            onClick={prevSlide}
            className="w-11 h-11 border-[1px] flex items-center justify-center hover:bg-gray-500 text-yellow-300 active:bg-gray-700"
          >
            <AiOutlineArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-11 h-11 border-[1px] flex items-center justify-center hover:bg-gray-500 text-yellow-300 active:bg-gray-700"
          >
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
