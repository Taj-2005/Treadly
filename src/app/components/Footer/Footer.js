'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const isOnQuizPage = pathname === '/quiz';
  const isOnResultsPage = pathname === '/results';

  const [showExitModal, setShowExitModal] = useState(false);
  const [showExitModalResults, setShowExitModalResults] = useState(false);
  const [nextRoute, setNextRoute] = useState('');

  const handleFooterNav = (path) => {
    if (isOnQuizPage) {
      setNextRoute(path);
      setShowExitModal(true);
    } else if (isOnResultsPage) {
      setNextRoute(path);
      setShowExitModalResults(true);
    } else {
      router.push(path);
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    router.push(nextRoute);
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

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
    setShowExitModalResults(false);
    router.push(nextRoute);
  };

  const handleDiscardAndExit = () => {
    localStorage.removeItem("quiz_data");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_selected");
    triggerConfetti();
    setShowExitModalResults(false);
    router.push(nextRoute);
  };

  return (
    <>
      <footer className="bg-[#635d59] text-white px-6 py-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div className='text-center'>
            <h1 className="font-great-vibes text-7xl text-white">Treadly</h1>
            <p className="mt-2 text-gray-400">
              © 2025 <span className='font-great-vibes font-black'>Treadly</span> All rights reserved.
            </p>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
              <span className="text-center text-gray-400 pt-1">Powered by </span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png"
                alt="Gemini Logo"
                className="h-5 w-15"
              />
            </div>
          </div>

          <div className='text-center'>
            <h2 className="font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li><span onClick={() => handleFooterNav('/')} className="cursor-pointer hover:underline">Home</span></li>
              <li><span onClick={() => handleFooterNav('/about')} className="cursor-pointer hover:underline">About</span></li>
              <li><span onClick={() => handleFooterNav('/quizzes')} className="cursor-pointer hover:underline">Quizzes</span></li>
              <li><span onClick={() => handleFooterNav('/contact')} className="cursor-pointer hover:underline">Contact</span></li>
            </ul>
          </div>

          <div className='text-center'>
            <h2 className="font-semibold mb-3">Explore More</h2>
            <ul className="space-y-2">
              <li><span onClick={() => handleFooterNav('/quizzes')} className="cursor-pointer hover:underline">Destinations</span></li>
              <li><span onClick={() => handleFooterNav('/quizzes')} className="cursor-pointer hover:underline">Trivia</span></li>
              <li><span onClick={() => handleFooterNav('/quizzes')} className="cursor-pointer hover:underline">Blog</span></li>
            </ul>
          </div>

          <div className='text-center'>
            <h2 className="font-semibold mb-3">Connect With Us</h2>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="mailto:email@example.com" className="hover:underline">Email Me</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {showExitModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
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
                onClick={cancelExit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {showExitModalResults && (
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
