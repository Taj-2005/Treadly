"use client";

import { useRef } from "react";
import Card from "../Card/Card";
import places from "@/constants/places.json";

export default function Places() {
  const categories = [
    "Countries",
    "Hill Stations",
    "Cities/Heritage",
    "Beaches",
    "Deserts",
    "Wildlife",
    "Spiritual",
    "Adventure",
  ];

  const scrollRefs = useRef({});

  const scroll = (direction, category) => {
    const scrollAmount = direction === "left" ? -1 : 1;
    const container = scrollRefs.current[category];

    if (!container) return;

    const item = container.querySelector(".flex-shrink-0");
    if (!item) return;

    const itemWidth = item.offsetWidth;
    const newPosition = container.scrollLeft + itemWidth * scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-10 bg-[#fef7f1]">
      {categories.map((category) => (
        <div key={category} className="relative w-full">
          <div className="text-5xl text-gray-700 px-5 py-10 font-poppins font-extrabold">
            {category}
          </div>

          <div
            ref={(el) => (scrollRefs.current[category] = el)}
            className="flex flex-row overflow-x-auto space-x-4 px-4 scrollbar-hide scroll-smooth"
          >
            {places[category].map((place, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xs:w-full"
              >
                <Card
                  title={place.name}
                  description={place.description}
                  image={place.image}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left", category)}
            className="absolute top-65 left-[-20] bg-gray-800 text-white p-2 rounded-full z-10"
          >
            &lt;
          </button>

          <button
            onClick={() => scroll("right", category)}
            className="absolute top-65 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
          >
            &gt;
          </button>
        </div>
      ))}
    </div>
  );
}
