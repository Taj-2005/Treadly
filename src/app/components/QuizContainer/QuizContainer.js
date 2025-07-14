"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Question from '@/app/components/Question/Question';
import Button from '@/app/components/Button/Button';
import confetti from 'canvas-confetti';

export default function QuizContainer({ givenText }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(-1)); // -1 means not answered
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextRoute, setNextRoute] = useState(null);

  const blockingRef = useRef(false); 

  const handleAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quiz-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ givenText }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Unexpected error occurred');
      console.log('Quiz data:', json);
      setData(json);
      const initialAnswers = json.map(q => q.options.findIndex(opt => opt === q.answer));
      setAnswers(initialAnswers);
    } catch (err) {
      console.error('Quiz generation error:', err.message);
      setError(err.message);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleRouteChangeStart = (url) => {
      if (!blockingRef.current && data.length > 0) {
        blockingRef.current = true;
        setShowExitModal(true);
        setNextRoute(url);
        throw 'Navigation cancelled';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events?.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events?.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [data]);

  const confirmExit = () => {
    blockingRef.current = false;
    setShowExitModal(false);
    router.push(nextRoute);
  };

  useEffect(() => {
    handleAudit();
  }, []);

  const triggerConfetti = () => {
    const duration = 500;
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

  return (
    <div className="min-h-screen px-4 py-6 bg-[#fef7f1]">
    {loading && (
        <div className="text-center text-gray-600 text-lg">Generating quiz, please wait...</div>
    )}

    {error && (
        <div className="text-red-500 text-center mb-4 text-base font-medium">{error}</div>
    )}

    {data.length > 0 && (
        <>
        <Question
            question={data}
            index={index}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
        />

        <div className="flex flex-col gap-6 mt-12 justify-center items-center">
            <div className="flex flex-row gap-4">
            {index > 0 && (
                <button
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                className="px-5 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                Prev
                </button>
            )}
            {index < 9 && (
                <button
                onClick={() => setIndex((prev) => Math.min(9, prev + 1))}
                className="px-5 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                >
                Next
                </button>
            )}
            </div>

            <Button
            onClick={() => setShowModal(true)}
            text="Submit"
            />

            {showModal && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Confirm Submission</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to submit your answers?</p>
                <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    triggerConfetti();
                    localStorage.setItem("quiz_data", JSON.stringify(data));
                    localStorage.setItem("quiz_answers", JSON.stringify(answers));
                    localStorage.setItem("quiz_selected", JSON.stringify(selectedAnswers));

                    setTimeout(() => {
                      router.push(`/results?place=${encodeURIComponent(givenText)}`);
                    }, 1000);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Yes, Submit
                </button>
                    <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg transition"
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            )}

            {showExitModal && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">Leave Quiz?</h2>
                  <p className="text-gray-600 mb-6">Your progress will be lost if you leave now.</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={confirmExit}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    >
                      Yes, Leave
                    </button>
                    <button
                      onClick={() => {
                        setShowExitModal(false);
                        blockingRef.current = false;
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition"
                    >
                      Stay
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