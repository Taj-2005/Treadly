"use client";

import { useState } from "react";
import Card from "../Card/Card";
import places from "../../../../constants/places.json";

export default function Places() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -1 : 1;
    const scrollContainer = document.getElementById("scroll-container");
    const itemWidth = scrollContainer.querySelector(".flex-shrink-0").offsetWidth;
    const newScrollPosition = scrollPosition + itemWidth * scrollAmount;

    setScrollPosition(newScrollPosition);
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-10 bg-[#fef7f1]">
      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
          Hill Stations
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Hill Stations"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
          Cities and Heritage
        </div>


        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Cities/Heritage"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
          Beaches
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Beaches"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
            Deserts
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Deserts"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
            Wildlife
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Wildlife"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
            Spiritual
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Spiritual"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>


      <div className="relative w-full">
        <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
            Adventure
        </div>

        <div
          id="scroll-container"
          className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide"
        >
          {places["Adventure"].map((place, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(100%)] sm:w-[calc(100%/2)] lg:w-[calc(100%/3)] xs:w-full">
              <Card 
                title={place.name} 
                description={place.description} 
                image={place.image} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-65 left-[-20]  bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &lt;
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
