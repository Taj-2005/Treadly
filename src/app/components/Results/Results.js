"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar/NavBar";
import Footer from "@/app/components/Footer/Footer";
import Button from "@/app/components/Button/Button";
import confetti from "canvas-confetti";

export default function Results({ place }) {
  const capitalizedLetter = place?.charAt(0).toUpperCase() + place?.slice(1);
  const router = useRouter();

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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      shapes: ["square"],
      colors: ["#FF4C4C", "#4C8CFF", "#34D399", "#FFD700", "#A855F7"],
    });
  };

  const handleSaveAndExit = () => {
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fef7f1] text-black">
        <h1 className="text-4xl md:text-5xl font-semibold font-archivo mb-6 text-center">Results</h1>
        <p className="text-lg md:text-xl font-bold mb-4">Destination: {capitalizedLetter}</p>

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
      <Footer />
    </>
  );
}
