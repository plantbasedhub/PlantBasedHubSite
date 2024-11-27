import React, { useState } from "react";
import Image from "next/image";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      text: "",
      image: "/Recipes/coockies.jpg", 
    },
    {
      id: 2,
      text: "",
      image: "/Recipes/oatmeal.jpg", 
    },
    {
      id: 3,
      text: "",
      image: "/Recipes/pumpkin.jpg", 
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative bg-lime-500 py-8 px-4">
      {/* Slide ativo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Texto */}
        <div className="max-w-md bg-lime-500 rounded-lg shadow p-4 text-green-700">
          <p className="text-lg">{slides[currentSlide].text}</p>
        </div>

        {/* Imagem */}
        <div className="w-[600px] h-[400px]">
  <Image
    src={slides[currentSlide].image}
    alt="Carousel Slide"
    width={600}
    height={400}
    className="object-cover rounded-lg"
  />
</div>

      </div>

      {/* Navegação do Carrossel */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevSlide}
          className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
