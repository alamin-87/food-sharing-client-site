import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeSlider = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch data from backend
  useEffect(() => {
    fetch("https://server-site-alpha-umber.vercel.app/slider")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      <div className="w-full h-full relative">
        {slides.map((slide, i) => (
          <div
            key={slide._id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-lg p-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="mb-4 text-lg">{slide.subtitle}</p>
                <button className="btn bg-orange-500 text-white hover:bg-orange-600">
                  {slide.buttonText} <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Prev/Next Buttons */}
        <div className="absolute flex justify-between items-center left-0 right-0 top-1/2 transform -translate-y-1/2 px-4 z-20">
          <button
            onClick={handlePrev}
            className="btn btn-circle bg-white/80 text-green-700 hover:bg-white"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="btn btn-circle bg-white/80 text-green-700 hover:bg-white"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
