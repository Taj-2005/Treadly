"use client";

import Footer from "@/app/components/Footer/Footer";
import QuizContainer from "@/app/components/QuizContainer/QuizContainer";
import Navbar from "@/app/components/NavBar/NavBar";
import { useSearchParams } from "next/navigation";

export default function Quiz(){
    const searchParams = useSearchParams();
    const input = searchParams.get("place");
    return(
        <>
            <QuizContainer givenText={input}/>
        </>
    )
}