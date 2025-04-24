"use client";

import { useRef, useState } from "react";
import Question from "@/app/components/Question/Question.jsx";

export default function Home() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const promptText = useRef("");

  const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";

  async function fetchData(givenText) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: givenText }] }],
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
      console.error("Problematic JSON string:", jsonString);
      setData([]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-10">
      {data.length == 0 ? (
        <>
        <input
        className="m-5 border border-gray-400 p-3 rounded-xl w-80"
        ref={promptText}
        placeholder="Enter Prompt"
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-5"
        onClick={() => fetchData(promptText.current.value)}
      >
        Ask
      </button>
      </>
      )

       : (
       <>
          <Question question={data} index={index} />

          <div className="flex gap-4 mt-8">
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

            {index === 9 && (
              <button
                onClick={() => alert("Submitted!")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </>
        )}
    </div>
  );
}
