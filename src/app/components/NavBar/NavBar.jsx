export default function NavBar({ handleHomeClick }) {
  return (
    <div className="flex gap-[55vw] sm:justify-between items-center p-4 bg-[#fef7f1] text-black min-w-screen sticky top-0 z-50 shadow-md">
      <div href="#" className="font-greatVibes text-3xl font-bold">Treadly</div>
      <div className="flex items-center justify-between w-full px-4 py-2">

      <div className="flex sm:hidden">
        <button className="text-[#878587] hover:text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="hidden sm:flex space-x-4 text-[#878587] font-bebas">
        <button onClick={handleHomeClick} className="hover:text-black transition-colors duration-300 px-2">Home</button>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">About</a>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">Quizzes</a>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">Contact</a>
      </div>

      </div>
          </div>
  );
}
