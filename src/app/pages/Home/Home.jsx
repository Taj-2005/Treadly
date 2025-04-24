"use client"

import Image from "next/image";
import {useRef, useState } from "react";

export default function Home() {
  const [data,setData] = useState([])
  const promptText = useRef("")
  const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";

  async function fetchData(givenText) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: givenText }]
            }
          ]
        })
      }
    );
    const data = await response.json();
    let jsonString = data.candidates[0].content.parts[0].text;

    // Remove backticks and the "json" keyword if present
    jsonString = jsonString.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.substring(7).trimStart();
    }
    if (jsonString.endsWith("```")) {
      jsonString = jsonString.slice(0, -3).trimEnd();
    }

    try {
      const outputData = JSON.parse(jsonString);
      setData(outputData);
      console.log(outputData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Problematic JSON string:", jsonString);
      setData([]);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <input className="m-10 border-1 border-white p-3 rounded-4xl" ref={promptText} placeholder="Enter Prompt"/>
        {promptText != "" && (<button className="bg-blue-400 w-25 h-10 rounded-2xl" onClick={() => fetchData(promptText.current.value)}>Ask</button>)}
        <div className="flex flex-col p-1 justify-center items-center">
          {data && data.map((question, index) => {
            return (
              <div key={index} className="flex flex-col w-full gap-3 py-4">
                <div className="text-5xl">{question.question}</div>
                <div className="text-4xl">A - {question.options[0]}</div>
                <div className="text-4xl">B - {question.options[1]}</div>
                <div className="text-4xl">C - {question.options[2]}</div>
                <div className="text-4xl">D - {question.options[3]}</div>
              </div>
            )
          })}
        </div>
      </div>
     </>
  );
}
