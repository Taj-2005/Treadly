import { useState } from "react";
import { useRouter } from "next/navigation";
import Question from "@/app/components/Question/Question.jsx";
import NavBar from "../Navbar/Navbar";

export default function QuizContainer() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";

  function resetAll() {
    setData([]);
    setIndex(0);
    setPrompt("");
    setSelectedAnswers(Array(10).fill(null));
  }

  async function fetchData(givenText) {
    setLoading(true);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 10 multiple-choice questions designed to build excitement and curiosity in travelers about an upcoming trip. Each question should be related to the trip experience and help the traveler learn more about the destination.

Format the output as a valid JSON array.

Each object should have:

"question": the question string.

"options": an array of 4 possible answers.

"answer": a key from the ${givenText} that correctly corresponds to the question.

Use only content from ${givenText} to form answers.

Do not include any explanations, descriptions, or additional text—only return the raw JSON.`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    setLoading(false);
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

  function handleHomeClick() {
    if (data.length > 0) {
      setShowExitModal(true);
    } else {
      router.push("/");
    }
  }

  function confirmExit() {
    resetAll();
    setShowExitModal(false);
    router.push("/");
  }

  return (
    <>
      <NavBar handleHomeClick={handleHomeClick} />
      <div className="flex flex-col justify-center items-center p-10 relative">
        {loading && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-50"></div>
        )}

        {data.length === 0 ? (
          <>
          <div className="text-5xl py-20">Where would you like to go ?</div>
            <input
              className="m-5 border border-gray-400 p-3 rounded-xl w-80"
              value={prompt || ""}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  fetchData(prompt);
                }
              }}
              placeholder="Enter a Destination"
            />

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-5"
              onClick={() => fetchData(prompt)}
            >
              Start
            </button>
            <div className="text-2xl">Take the Travel Quiz</div>
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
                          resetAll();
                          setShowModal(false);
                          router.push("/");
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
