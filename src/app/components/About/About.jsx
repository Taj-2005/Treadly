import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <div className="flex flex-col bg-[#fef7f1]">
        <div className="flex flex-col h-auto lg:min-h-[90vh] md:flex-row items-center justify-around px-10 py-20 ld:gap-0 gap-10">
            <Image 
            src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/c817166e-d987-41b9-b41d-427b1fc4a503/ecc2bc8d-8a22-4cc1-a8c5-9fa1ba55f907.png" 
            alt="Trecking"
            width={500}
            height={500}
            className="rounded-4xl shadow-lg hover:scale-105 duration-400"
            />
            <div className="flex flex-col justify-center items-center md:items-start">
                <div className="text-4xl sm:text-5xl md:text-6xl font-archivo font-extrabold text-black pt-10 pb-5 text-center md:text-start">Discover Hidden Gems</div>
                <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-center">Treadly's curated trivia covers a wide range of topics,<br></br> from local history and culture to popular attractions and<br></br> off-the-beaten-path adventures</div>
                <Link href="/quizzes">
                    <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                        Start Quizzing
                    </button>
                </Link>

            </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-20">
            <div className="text-black text-center text-5xl md:text-7xl font-archivo font-extrabold p-10">Elevate your Travel Experience</div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6 text-start items-start m-10 md:gap-10">
                <div className="flex flex-col justify-center items-start bg-[#ffffff] md:p-10 p-5 rounded-4xl hover:scale-105 duration-400">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-archivo font-extrabold text-black pt-10 pb-5 text-start md:text-start">Personalized Quizzes</div>
                    <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-start">Treadly's travel quizzes are tailored to your interests and preferences, ensuring you learn about destinations that truly inspire you</div>
                    <Link href="/quizzes">
                        <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-2 md:py-3 md:px-6 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                            Take the Quiz
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-start bg-[#ffffff] md:p-10 p-5 rounded-4xl hover:scale-105 duration-400">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-archivo font-extrabold text-black pt-10 pb-5 text-start md:text-start">Engaging Trivia</div>
                    <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-start">Treadly's trivia questions are designed to be both informative and entertaining, challenging you to expand your travel knowledge while keeping you engaged and entertained</div>
                    <Link href="/quizzes">
                        <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-2 md:py-3 md:px-6 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                            Explore More
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-start bg-[#ffffff] md:p-10 p-5 rounded-4xl hover:scale-105 duration-400">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-archivo font-extrabold text-black pt-10 pb-5 text-start md:text-start">Discover Hidden Gems</div>
                    <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-start">Treadly's curated content covers a wide range of destinations, from well-known hotspots to off-the-beaten-path gems. Expand your travel horizons and uncover the secrets of the world</div>
                    <Link href="/quizzes">
                        <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-2 md:py-3 md:px-6 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                            Start Quizzing
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-start bg-[#ffffff] md:p-10 p-5 rounded-4xl hover:scale-105 duration-400">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-archivo font-extrabold text-black pt-10 pb-5 text-start md:text-start">Informative Results</div>
                    <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-start">Treadly's quiz results not only test your travel knowledge but also provide valuable insights and recommendations to help you plan your next adventure</div>
                    <Link href="/quizzes">
                        <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-2 md:py-3 md:px-6 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-col-reverse h-auto lg:min-h-[90vh] md:flex-row items-center justify-around px-10 py-20 ld:gap-0 gap-10">
            <div className="flex flex-col justify-center items-center md:items-start">
                <div className="text-4xl sm:text-5xl md:text-4xl font-archivo font-extrabold text-black pt-10 pb-5 text-center md:text-start">Plan Your Next Adventure</div>
                <div className="text-xl font-archivo font-bold text-[#7c797a] pt-5 pb-5 md:text-start text-center">With Treadly, you can explore the world like never before. Personalized quizzes, engaging trivia, and informative results help you discover hidden gems, expand your travel horizons,and plan your next unforgettable journey</div>
                <Link href="/quizzes">
                    <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                        Get Started
                    </button>
                </Link>

            </div>
            <Image 
            src="/globe.avif" 
            alt="Trecking"
            width={500}
            height={500}
            className="rounded-4xl shadow-lg hover:scale-105 duration-400"
            />
        </div>
    </div>
    )
}