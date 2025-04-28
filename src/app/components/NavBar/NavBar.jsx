
export default function NavBar({ handleHomeClick }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white min-w-screen">
      <div className="font-greatVibes text-3xl font-extrabold">Treadly</div>
      <div className="flex space-x-4">
        <button onClick={handleHomeClick} className="hover:text-gray-400 transition-colors duration-300">Home</button>
        <a href="#" className="hover:text-gray-400 transition-colors duration-300">About</a>
        <a href="#" className="hover:text-gray-400 transition-colors duration-300">Contact</a>
      </div>
    </div>
  );
}
