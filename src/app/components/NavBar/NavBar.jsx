'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [nextRoute, setNextRoute] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const isOnQuizPage = pathname === '/quiz';
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavClick = (path) => {
    if (isOnQuizPage) {
      setNextRoute(path);
      setShowExitModal(true);
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

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-[#fef7f1] text-black w-full sticky top-0 z-50 shadow-md">
        <Link href="/home">
          <div className="font-great-vibes text-3xl font-bold cursor-pointer">Treadly</div>
        </Link>

        <div className="hidden sm:flex items-center space-x-4 px-4 py-2 text-[#878587] font-bebas">
          <div
            className="hover:text-black transition-colors duration-300 px-2 cursor-pointer"
            onClick={() => handleNavClick('/home')}
          >
            Home
          </div>
          <div
            className="hover:text-black transition-colors duration-300 px-2 cursor-pointer"
            onClick={() => handleNavClick('/about')}
          >
            About
          </div>
          <div
            className="hover:text-black transition-colors duration-300 px-2 cursor-pointer"
            onClick={() => handleNavClick('/quizzes')}
          >
            Quizzes
          </div>
          <div
            className="hover:text-black transition-colors duration-300 px-2 cursor-pointer"
            onClick={() => handleNavClick('/contact')}
          >
            Contact
          </div>
        </div>

        <button
          className="sm:hidden focus:outline-none z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative">
            <span
              className={`block absolute h-0.5 w-full bg-[#878587] transform transition duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 top-2.5' : 'top-1'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-[#878587] transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100 top-2.5'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-[#878587] transform transition duration-300 ease-in-out ${
                menuOpen ? '-rotate-45 bottom-2.5' : 'bottom-1'
              }`}
            ></span>
          </div>
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-[#fef7f1] w-[70%] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:hidden flex flex-col items-start p-6 space-y-6 text-[#878587] font-bebas overflow-y-auto`}
      >
        <div
          className="hover:text-black transition-colors duration-300 cursor-pointer pt-20"
          onClick={() => handleNavClick('/home')}
        >
          Home
        </div>
        <div
          className="hover:text-black transition-colors duration-300 cursor-pointer"
          onClick={() => handleNavClick('/about')}
        >
          About
        </div>
        <div
          className="hover:text-black transition-colors duration-300 cursor-pointer"
          onClick={() => handleNavClick('/quizzes')}
        >
          Quizzes
        </div>
        <div
          className="hover:text-black transition-colors duration-300 cursor-pointer"
          onClick={() => handleNavClick('/contact')}
        >
          Contact
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-[30%] z-30 sm:hidden"
          onClick={toggleMenu}
        />
      )}

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
    </>
  );
}
