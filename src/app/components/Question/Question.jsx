"use client";

import { useState, useEffect } from "react";

export default function Question({ question, index, selectedAnswers, setSelectedAnswers }) {
  if (!question || question.length === 0) return null;

  const current = question[index];
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(selectedAnswers[index] ?? null);
  }, [index, selectedAnswers]);

  function handleClick(i) {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = i;
    setSelectedAnswers(updatedAnswers);
    setSelectedOption(i);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-6 transition duration-500">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 leading-snug">
        {current.question}
      </h2>

      <div className="flex flex-col gap-3 w-full max-w-2xl text-center">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`text-lg md:text-xl px-5 py-3 rounded-lg border transition-colors duration-200
              ${
                i === selectedOption
                  ? "bg-[#6dc679] text-white border-transparent"
                  : "bg-white hover:bg-gray-100 transition-colors duration-300 text-gray-800 border-gray-300"
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
