"use client"

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
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="text-4xl font-bold text-center">{current.question}</div>
      <div className="flex flex-col gap-4 w-full max-w-xl text-center">
        {current.options.map((opt, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`text-2xl px-6 py-3 rounded-xl cursor-pointer transition-colors duration-200
              ${i === selectedOption ? "bg-green-500 text-white" : " hover:bg-gray-600"}
            `}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
