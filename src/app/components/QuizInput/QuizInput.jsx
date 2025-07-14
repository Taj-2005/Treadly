"use client";

import { useRef, useEffect } from "react";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

export default function QuizInput() {
    const router = useRouter();
    const quizRef = useRef("")

    useEffect(() => {
        const placeholderText = "Enter your Destination...";
        let currentText = "";
        let index = 0;
        let intervalId;
    
        function startTyping() {
          currentText = "";
          index = 0;
          intervalId = setInterval(() => {
            if (!quizRef.current) return;
            
            if (index < placeholderText.length) {
              currentText += placeholderText[index];
              quizRef.current.placeholder = currentText;
              index++;
            } else {
              clearInterval(intervalId);
              setTimeout(startTyping, 1000);
            }
          }, 150);
        }
    
        startTyping();
    
        return () => clearInterval(intervalId);
      }, []);

      const handleClick = () => {
        const value = quizRef.current?.value || "";
        router.push(`/quiz?place=${encodeURIComponent(value.toLowerCase())}`);
      };

    return (
        <div className="px-6 md:px-12 py-10 bg-[#FBF6EF] text-[#2E2C2A]">
            <h1 className="text-4xl md:text-5xl font-bold font-archivo mb-6 text-center">Explore & Learn</h1>
  
            <div className="flex flex-row items-center justify-center mt-10 gap-6 md:gap-8">
                <input
                    ref={quizRef}
                    className="font-archivo bg-white text-black p-4 md:p-5 font-semibold rounded"
                    placeholder="Enter your Destination"
                />
                <Button onClick={handleClick} text="Attempt Quiz"/>
            </div>
        </div>
    )
}