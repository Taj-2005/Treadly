"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Question from '@/app/components/Question/Question';
import Button from '@/app/components/Button/Button';

export default function QuizContainer({ givenText }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
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
      setData(json);
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
        throw 'Navigation cancelled'; // Cancel route change
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events?.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events?.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [data]);

  // ✨ Allow navigation after confirmation
  const confirmExit = () => {
    blockingRef.current = false;
    setShowExitModal(false);
    router.push(nextRoute);
  };

  useEffect(() => {
    handleAudit();
  }, []);

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
                    onClick={() => router.push("/home")}
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

            
        </div>
        </>
    )}
    </div>
  );
}
