"use client";

import {useState } from "react";
import { useRouter } from "next/navigation";
import Question from "@/app/components/Question/Question.jsx";

export default function QuizContainer() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";

  function resetAll() {
    setData([]);
    setIndex(0);
    setPrompt("");
  }

  async function fetchData(givenText) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `give 10 mcq question for travellers to know about the trip which will make them enthuastic to go for the trip, options -> array, anser as the keys of ${givenText} with question dont include any extra text just give the json file`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    let jsonString = data.candidates[0].content.parts[0].text.trim();

    if (jsonString.startsWith("```json")) jsonString = jsonString.substring(7).trimStart();
    if (jsonString.endsWith("```")) jsonString = jsonString.slice(0, -3).trimEnd();

    try {
      const outputData = JSON.parse(jsonString);
      setData(outputData);
      setIndex(0);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Please provide a valid Travel Place");
      console.error("Problematic JSON string:", jsonString);
      setData([]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-10">
      {data.length === 0 ? (
        <>
          <input
            className="m-5 border border-gray-400 p-3 rounded-xl w-80"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter Prompt"
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-5"
            onClick={() => fetchData(prompt)}
          >
            Ask
          </button>
        </>
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
              {index > 0 && (
                <button
                  onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Prev
                </button>
              )}
              {index < 9 && (
                <button
                  onClick={() => setIndex((prev) => Math.min(9, prev + 1))}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              )}
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
                            resetAll();         // Reset quiz state
                            setShowModal(false);
                            router.push("/");   // Redirect to home
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


          </div>
        </>
      )}
    </div>
  );
}
