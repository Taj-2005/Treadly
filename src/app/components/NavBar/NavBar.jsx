export default function NavBar({ handleHomeClick }) {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">Gemini</div>
        <div className="flex space-x-4">
          <button onClick={handleHomeClick} className="hover:text-gray-400">Home</button>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
    );
  }
  