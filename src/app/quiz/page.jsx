import Navbar from "../components/NavBar/NavBar";
import { useState } from "react";

export default function Quiz({place}) {
    const [data, setData] = useState([]);
    const GEMINI_API_KEY = "AIzaSyC6Jr2Eeg5E6VcpFu4L-Xn36-jqY9XvA5A";
    async function fetchData(givenText) {
        setLoading(true);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `give 10 mcq question for travellers to know about the trip which will make them enthuastic to go for the trip, options -> array, anser as the keys of ${givenText} with question dont include any extra text just give the json file dont include any para heading or reply just return the json file to me `
                }]
              }]
            }),
          }
        );
    
        const data = await response.json();
        setLoading(false);
        let jsonString = data.candidates[0].content.parts[0].text.trim();
    
        if (jsonString.startsWith("```json")) jsonString = jsonString.substring(7).trimStart();
        if (jsonString.endsWith("```")) jsonString = jsonString.slice(0, -3).trimEnd();
    
        try {
          const outputData = JSON.parse(jsonString);
          setData(outputData);
          console.log(outputData);
          setIndex(0);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Please provide a valid Travel Place");
          console.error("Problematic JSON string:", jsonString);
          setData([]);
        }
      }
      fetchData(place);
    return (
        <>
            <Navbar/>

        </>
    )
}