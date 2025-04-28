"use client"

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function MainContent() {
    const inputRef = useRef(null);

    useEffect(() => {
      const placeholderText = "Enter your Destination";
      let currentText = "";
      let index = 0;
      let intervalId;
  
      function startTyping() {
        currentText = "";
        index = 0;
        intervalId = setInterval(() => {
          if (!inputRef.current) return;
          
          if (index < placeholderText.length) {
            currentText += placeholderText[index];
            inputRef.current.placeholder = currentText;
            index++;
          } else {
            clearInterval(intervalId);
            setTimeout(startTyping, 1000); // wait for 1s before typing again
          }
        }, 150); // typing speed
      }
  
      startTyping();
  
      return () => clearInterval(intervalId);
    }, []);

    return(
        <>
            <div className="flex flex-col items-center justify-center bg-[#fef7f1] text-black pb-100 pt-30">
                <div className="font-playfair md:text-7xl font-extrabold text-center text-5xl">Discover the world of quizzes<br></br> with Treadly!</div>
                <div className="md:text-2xl font-archivo text-[#aaa5a0] font-medium text-center">Unlock your secrets of your destination with Treadly, the Ultimate Travel Quiz App</div>
                <div className="flex flex-row items-center justify-center mt-10 gap-6">
                    <input
                        ref={inputRef}
                        className="font-archivo bg-white text-black p-4 md:p-5 font-semibold rounded"
                        placeholder="Enter your Destination"
                    />
                    <button className="text-[#C7C5C2] text-archivo font-semibold bg-[#211E21] p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl">
                        Start
                    </button>
                </div>



            </div>
            <div className="flex flex-col justify-center items-center ">
                <div className="w-full h-auto top-0 text-5xl font-bold min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-hidden sticky pt-10 sm:pt-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl font-extrabold text-center font-archivo mb-6 text-black drop-shadow-lg"
                    >
                        Personalized Quizzes
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-xl md:text-2xl text-center text-gray-700 mb-12 font-poppins"
                    >
                        Discover the world 🌍, one question at a time ✈️
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-8">
                        <motion.img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                        alt="Beach Travel"
                        className="w-72 h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        />
                        <motion.img
                        src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=800&q=80"
                        alt="City Adventure"
                        className="w-72 h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        />
                    </div>
                    <div className="absolute top-0 left-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                </div>
                <div className="w-full h-auto top-0 text-5xl font-bold min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400 sticky overflow-hidden  pt-10 sm:pt-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-6xl font-extrabold text-center font-archivo mb-6 text-black drop-shadow-lg"
                        >
                            Engaging Trivia
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-xl md:text-2xl text-center text-gray-700 mb-12 font-poppins"
                        >
                            Challenge your mind 🧠🎯 and explore the world!
                        </motion.p>

                        <div className="flex flex-wrap justify-center gap-8">
                            <motion.img
                            src="https://media.istockphoto.com/id/2209845602/photo/magnifying-glass-focusing-on-question-marks-concept-of-search-and-answers.webp?a=1&b=1&s=612x612&w=0&k=20&c=DtKcEmiwwOAaUdlcYRbIDQyy3oeiEL68UEGSnPqLUhA="
                            alt="Brain Challenge"
                            className="w-72 h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            />
                            <motion.img
                            src="https://images.unsplash.com/photo-1536485255710-1bedfeea2d52?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyaXZpYXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Trivia Fun"
                            className="w-72 h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            />
                        </div>

                        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                    </div>   
                    <div className="w-full h-auto top-0 font-bold min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 relative p-10 sm:p-0">
                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-6xl font-extrabold text-center font-archivo mb-4 text-gray-800 drop-shadow-lg"
                        >
                            Informative Results
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-xl md:text-2xl text-center text-gray-600 mb-12 font-poppins"
                        >
                            Unlock Knowledge 🌿📚 after every quiz!
                        </motion.p>

                        {/* Cards */}
                        <div className="flex flex-wrap justify-center gap-10">
                            {/* Card 1 */}
                            <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
                            >
                            <img
                                src="https://images.unsplash.com/photo-1658105501659-41b33edb9255?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Aha Moments"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-lg text-black font-semibold mb-2">Aha Moments!</h3>
                                <p className="text-gray-500">Every result brings a new discovery.</p>
                            </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
                            >
                            <img
                                src="https://images.unsplash.com/photo-1707991396652-cf7827abe722?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Visual Reports"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2 text-black">Visual Reports</h3>
                                <p className="text-gray-500">Get detailed insights after each quiz.</p>
                            </div>
                            </motion.div>
                        </div>

                        {/* Blurred background blobs */}
                        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
                    </div>

                </div>

        </>
    )
}