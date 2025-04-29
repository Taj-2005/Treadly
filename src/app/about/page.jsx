import NavBar from "@/app/components/NavBar/NavBar";
import Image from "next/image";

export default function About() {
    return(
        <>
            <NavBar/>
            <div className="flex flex-col bg-[#fef7f1]">
                <div className="flex flex-col md:flex-row items-center justify-around px-10 py-20 ld:gap-0 gap-10">
                    <Image 
                    src="/trekking4.avif" 
                    alt="Trecking"
                    width={500}
                    height={500}
                    className="rounded-4xl shadow-lg"
                    />
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-archivo font-extrabold text-black pt-10 pb-5 text-center md:text-start">Discover Hidden Gems</div>
                        <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-center">Treadly's curated trivia covers a wide range of topics,<br></br> from local history and culture to popular attractions and<br></br> off-the-beaten-path adventures</div>
                        <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                        Start Quizzing
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}