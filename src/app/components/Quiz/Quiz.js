"use client";

import QuizContainer from "@/app/components/QuizContainer/QuizContainer";
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