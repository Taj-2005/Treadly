"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Question from "../components/Question/Question"; // Assuming you have a Question component
import Navbar from "../components/NavBar/NavBar";

export default function Quiz({place}) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";
  const router = useRouter();


  function resetAll() {
    setData([]);
    setIndex(0);
    setSelectedAnswers(Array(10).fill(null));
  }

  async function fetchData(givenText) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate 10 multiple-choice quiz questions strictly about travel to "${givenText}". Each question must be informative for a traveler visiting ${givenText}. Do not include explanations, just return a pure JSON array in the following format:

                    [
                      {
                        "question": "string",
                        "options": ["string", "string", "string", "string"],
                        "answer": "string"
                      },
                      ...
                    ]
                    Ensure all questions are directly related to the destination "${givenText}". Do not give any extra text, just return the JSON file. The options should be an array of strings, and the answer should be the key of the correct option.`,
                    
                  },
                ],
              },
            ],
          }),
        }
      );

      const responseData = await response.json();

      let jsonString = responseData.candidates[0].content.parts[0].text.trim();

      if (jsonString.startsWith("```json")) jsonString = jsonString.substring(7).trimStart();
      if (jsonString.endsWith("```")) jsonString = jsonString.slice(0, -3).trimEnd();

      const outputData = JSON.parse(jsonString);
      setData(outputData);
      setIndex(0);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Failed to fetch quiz data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(place);
  }, [place]);

  const handleNext = () => {
    if (index < 9) setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-10 relative">
        {loading && <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-50"></div>}

        {error && <div className="text-red-500">{error}</div>}

        {data.length === 0 ? (
          null
        ) : (
          <>
            <Question
              question={data}
              index={index}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
            />
            <div className="flex flex-col gap-4 mt-8 justify-center items-center">
              <div className="flex flex-row mt-8 gap-4 justify-center items-center">
                <button
                  onClick={handlePrev}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>

              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fadeIn scale-95">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Confirm Submission</h2>
                    <p className="text-gray-600 mb-6">Are you sure you want to submit your answers?</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          resetAll();
                          setShowModal(false);
                          router.push("/home");
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        Yes, Submit
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showExitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Wait! 😯</h2>
                    <p className="text-gray-600 mb-6">
                      You're in the middle of the quiz. Are you <span className="text-red-500 font-semibold">sure</span> you want to leave? <br />
                      Your progress will be <span className="font-semibold">lost</span>!
                    </p>
                    <div className="flex justify-center gap-6">
                      <button
                        onClick={confirmExit}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        Yes, Exit
                      </button>
                      <button
                        onClick={() => setShowExitModal(false)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        No, Stay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
