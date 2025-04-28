import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-[#fef7f1] text-black min-w-screen sticky top-0 z-50 shadow-md">
      
      <Link href="/">
        <div className="font-great-vibes text-3xl font-bold cursor-pointer">Treadly</div>
      </Link>

      <div className="flex items-center space-x-4 px-4 py-2 text-[#878587] font-bebas">
        
        {/* Mobile Hamburger Icon */}
        <div className="flex sm:hidden">
          <button className="text-[#878587] hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4">
          <Link href="/">
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

      </div>
    </div>
  );
}
