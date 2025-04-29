export default function Button({ text, onClick }) {
    return (
      <button
        onClick={onClick ?? undefined}
        className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl"
      >
        {text}
      </button>
    );
  }
  