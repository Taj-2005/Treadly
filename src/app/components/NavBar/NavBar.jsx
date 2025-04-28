export default function NavBar({ handleHomeClick }) {
  return (
    <div className="flex justify-between items-center p-4 bg-[#fef7f1] text-black min-w-screen sticky top-0 z-50 shadow-md">
      <div href="#" className="font-greatVibes text-3xl font-bold">Treadly</div>
      <div className="flex space-x-4 text-[#878587] font-bebas">
        <button onClick={handleHomeClick} className="hover:text-black transition-colors duration-300 px-2">Home</button>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">About</a>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">Quizzes</a>
        <a href="#" className="hover:text-black transition-colors duration-300 px-2">Contact</a>
      </div>
    </div>
  );
}
