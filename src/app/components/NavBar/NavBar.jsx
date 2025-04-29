'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-[#fef7f1] text-black w-full sticky top-0 z-50 shadow-md">
        <Link href="/">
          <div className="font-great-vibes text-3xl font-bold cursor-pointer">Treadly</div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center space-x-4 px-4 py-2 text-[#878587] font-bebas">
          <Link href="/home">
            <div className="hover:text-black transition-colors duration-300 px-2 cursor-pointer">Home</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-black transition-colors duration-300 px-2 cursor-pointer">About</div>
          </Link>
          <Link href="/quizzes">
            <div className="hover:text-black transition-colors duration-300 px-2 cursor-pointer">Quizzes</div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-black transition-colors duration-300 px-2 cursor-pointer">Contact</div>
          </Link>
        </div>

        {/* Hamburger Button */}
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

      {/* Slide-in Menu (right 70%) */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#fef7f1] w-[70%] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:hidden flex flex-col items-start p-6 space-y-6 text-[#878587] font-bebas overflow-y-auto`}
      >
        <Link href="/home" onClick={() => setMenuOpen(false)}>
          <div className="hover:text-black transition-colors duration-300 cursor-pointer pt-20">Home</div>
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          <div className="hover:text-black transition-colors duration-300 cursor-pointer">About</div>
        </Link>
        <Link href="/quizzes" onClick={() => setMenuOpen(false)}>
          <div className="hover:text-black transition-colors duration-300 cursor-pointer">Quizzes</div>
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          <div className="hover:text-black transition-colors duration-300 cursor-pointer">Contact</div>
        </Link>
      </div>

      {/* Transparent Overlay over remaining 30% */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-[30%] z-30 sm:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
