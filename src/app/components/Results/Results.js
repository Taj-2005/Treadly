"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button/Button";
import confetti from "canvas-confetti";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Results({ place }) {
  const router = useRouter();

  const capitalizedLetter = place?.charAt(0).toUpperCase() + place?.slice(1);

  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("quiz_data");
    const storedAnswers = localStorage.getItem("quiz_answers");
    const storedSelected = localStorage.getItem("quiz_selected");

    if (storedData && storedAnswers && storedSelected) {
      setData(JSON.parse(storedData));
      setAnswers(JSON.parse(storedAnswers));
      setSelectedAnswers(JSON.parse(storedSelected));
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 1000; 
    const animationEnd = Date.now() + duration;
    const defaults = {
      origin: { y: 0.6 },
      shapes: ["square"],
      colors: ["#FF4C4C", "#4C8CFF", "#34D399", "#FFD700", "#A855F7"],
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        ...defaults,
        particleCount: randomInRange(20, 40),
        spread: randomInRange(60, 100),
        scalar: randomInRange(0.8, 1.2),
      });
    }, 200);
  };
  const handleSaveAndExit = () => {
    localStorage.removeItem("quiz_data");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_selected");
    triggerConfetti();
    router.push("/");
  };

  const handleDiscardAndExit = () => {
    localStorage.removeItem("quiz_data");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_selected");
    triggerConfetti();
    router.push("/");
  };
  const COLORS = ["#34D399", "#F87171"]; // green, red
  const correctCount = answers.filter((a, i) => a === selectedAnswers[i]).length;
  const incorrectCount = answers.length - correctCount;

  const summaryData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
  ];

  const barData = data.map((q, i) => ({
    name: `Q${i + 1}`,
    correct: answers[i] === selectedAnswers[i] ? 1 : 0,
  }));
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fef7f1] text-black">
        <h1 className="text-4xl md:text-5xl font-semibold font-archivo mb-6 text-center">Results</h1>
        <p className="text-lg md:text-xl font-bold mb-4">Destination: {capitalizedLetter}</p>
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Score Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Score Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={summaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-4 text-sm text-gray-700 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#34D399] inline-block rounded-full" />
                Correct: {correctCount}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#F87171] inline-block rounded-full" />
                Incorrect: {incorrectCount}
              </span>
            </div>
          </div>

          {/* Question Performance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Question-wise Accuracy</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(val) => (val === 1 ? "✔" : "")} />
                <Tooltip
                  formatter={(value) => [`Status: ${value === 1 ? "Correct" : "Incorrect"}`]}
                  cursor={{ fill: "#f0f0f0" }}
                />
                <Bar dataKey="correct" fill="#60A5FA" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="w-full max-w-3xl px-6">
            {data.map((q, i) => (
              <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold text-start">{i + 1}. {q.question}</p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === answers[i];
                    const isSelected = idx === selectedAnswers[i];

                    let bgClass = "";

                    if (isSelected && isCorrect) bgClass = "bg-green-400 text-white";
                    else if (isSelected && !isCorrect) bgClass = "bg-red-200";
                    else if (!isSelected && isCorrect) bgClass = "bg-green-200";

                    return (
                      <li key={idx} className={`px-3 py-1 rounded ${bgClass}`}>
                        {opt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading results...</p>
        )}

        <div className="m-5">
          <Button onClick={() => setShowExitModal(true)} text="Go Back to Home" />
        </div>
      </div>

      {showExitModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Save your progress? 💾</h2>
            <p className="text-gray-600 mb-6">
              Would you like to save your progress before exiting?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleSaveAndExit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Yes, Save
              </button>
              <button
                onClick={handleDiscardAndExit}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                No, Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
