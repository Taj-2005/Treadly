"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button/Button";
import {Home, Download} from "lucide-react"
import confetti from "canvas-confetti";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Results({ place }) {
  const router = useRouter();

  const capitalizedLetter = place?.charAt(0).toUpperCase() + place?.slice(1);

  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("quiz_data");
    const storedAnswers = localStorage.getItem("quiz_answers");
    const storedSelected = localStorage.getItem("quiz_selected");

    if (storedData && storedAnswers && storedSelected) {
      setData(JSON.parse(storedData));
      setAnswers(JSON.parse(storedAnswers));
      setSelectedAnswers(JSON.parse(storedSelected));
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 1000; 
    const animationEnd = Date.now() + duration;
    const defaults = {
      origin: { y: 0.6 },
      shapes: ["square"],
      colors: ["#FF4C4C", "#4C8CFF", "#34D399", "#FFD700", "#A855F7"],
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        ...defaults,
        particleCount: randomInRange(20, 40),
        spread: randomInRange(60, 100),
        scalar: randomInRange(0.8, 1.2),
      });
    }, 200);
  };

  const handleSaveAndExit = () => {
    localStorage.removeItem("quiz_data");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_selected");
    triggerConfetti();
    router.push("/");
  };

  const handleDiscardAndExit = () => {
    localStorage.removeItem("quiz_data");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_selected");
    triggerConfetti();
    router.push("/");
  };

  const downloadPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;
      
      // Helper function to add a line separator
      const addSeparator = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;
      };
      
      // Title with background
      doc.setFillColor(52, 211, 153); // Green background
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 20, 'F');
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Quiz Results', pageWidth / 2, yPosition + 8, { align: 'center' });
      yPosition += 25;
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Destination
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(`Destination: ${capitalizedLetter}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
      
      addSeparator();
      
      // Score summary box
      const correctCount = answers.filter((a, i) => selectedAnswers[i] !== -1 && a === selectedAnswers[i]).length;
      const incorrectCount = answers.filter((a, i) => selectedAnswers[i] !== -1 && a !== selectedAnswers[i]).length;
      const notAnsweredCount = selectedAnswers.filter(selected => selected === -1).length;
      const answeredCount = answers.length - notAnsweredCount;
      const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      
      const summaryBoxHeight = 55;
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, summaryBoxHeight, 'F');
      
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, summaryBoxHeight);
      
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(52, 73, 94);
      doc.text('Score Summary', margin + 10, yPosition + 15);
      
      doc.setTextColor(0, 0, 0);
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`Total Score: ${correctCount}/${answeredCount} answered (${percentage}%)`, margin + 10, yPosition + 28);
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      
      doc.text(`Correct Answers: ${correctCount}`, margin + 10, yPosition + 40);
      doc.text(`Incorrect Answers: ${incorrectCount}`, margin + 10, yPosition + 48);
      
      const rightColumnX = margin + (pageWidth - 2 * margin) / 2 + 10;
      doc.text(`Total Questions: ${data.length}`, rightColumnX, yPosition + 40);
      doc.text(`Not Answered: ${notAnsweredCount}`, rightColumnX, yPosition + 48);
      
      yPosition += summaryBoxHeight + 10;
      addSeparator();
      
      // Color legend
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Color Legend:', margin, yPosition);
      yPosition += 12;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      // Dark green - answered correct
      doc.setTextColor(22, 101, 52);
      doc.text('Dark Green - Your Correct Answer', margin, yPosition);
      yPosition += 8;
      
      // Light green - correct answer
      doc.setTextColor(34, 197, 94);
      doc.text('Light Green - Correct Answer', margin, yPosition);
      yPosition += 8;
      
      // Red - wrong answer
      doc.setTextColor(239, 68, 68);
      doc.text('Red - Your Wrong Answer', margin, yPosition);
      yPosition += 12;
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      addSeparator();
      
      // Questions and answers
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Detailed Results', margin, yPosition);
      yPosition += 20;
      
      data.forEach((q, i) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          doc.addPage();
          yPosition = margin;
        }
        
        // Question number and text
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Question ${i + 1}:`, margin, yPosition);
        yPosition += 8;
        
        // Question text with proper wrapping
        doc.setFont(undefined, 'normal');
        const questionText = q.question;
        const questionLines = doc.splitTextToSize(questionText, pageWidth - 2 * margin);
        doc.text(questionLines, margin, yPosition);
        yPosition += questionLines.length * 6 + 8;
        
        // Options with better formatting
        doc.setFontSize(11);
        q.options.forEach((opt, idx) => {
          const isCorrect = idx === answers[i];
          const isSelected = idx === selectedAnswers[i];
          const isNotAnswered = selectedAnswers[i] === -1;
          
          let textColor = [0, 0, 0]; // Default black
          let fontWeight = 'normal';
          
          if (isNotAnswered) {
            // For unanswered questions, only highlight the correct answer
            if (isCorrect) {
              textColor = [34, 197, 94]; // Green for correct answer
              fontWeight = 'bold';
            }
          } else {
            // For answered questions
            if (isSelected && isCorrect) {
              // Selected correct answer - Dark Green
              textColor = [22, 101, 52]; // Dark Green
              fontWeight = 'bold';
            } else if (isSelected && !isCorrect) {
              // Selected incorrect answer - Red
              textColor = [239, 68, 68]; // Red
              fontWeight = 'bold';
            } else if (!isSelected && isCorrect) {
              // Unselected correct answer - Green (to show what was right)
              textColor = [34, 197, 94]; // Green
              fontWeight = 'bold';
            } else {
              // Other unselected options - Default
              textColor = [0, 0, 0]; // Black
              fontWeight = 'normal';
            }
          }
          
          // Set text color and font weight
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFont(undefined, fontWeight);
          
          // Format option text with letter labels
          const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D
          const optionText = `${optionLabel}. ${opt}`;
          const optionLines = doc.splitTextToSize(optionText, pageWidth - 2 * margin - 15);
          doc.text(optionLines, margin + 15, yPosition);
          yPosition += optionLines.length * 5 + 2;
        });
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
        
        // Add space between questions
        yPosition += 10;
        
        // Add a light separator line between questions
        if (i < data.length - 1) {
          doc.setDrawColor(240, 240, 240);
          doc.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      });
      
      // Footer
      const date = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.text(`Generated on: ${date}`, margin, pageHeight - 10);
      
      // Save the PDF
      doc.save(`quiz-results-${capitalizedLetter}-${date}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const COLORS = ["#34D399", "#F87171", "#FCD34D"]; // green, red, yellow
  const correctCount = answers.filter((a, i) => selectedAnswers[i] !== -1 && a === selectedAnswers[i]).length;
  const incorrectCount = answers.filter((a, i) => selectedAnswers[i] !== -1 && a !== selectedAnswers[i]).length;
  const notAnsweredCount = selectedAnswers.filter(selected => selected === -1).length;

  const summaryData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
    { name: "Not Answered", value: notAnsweredCount },
  ];

  const barData = data.map((q, i) => ({
    name: `Q${i + 1}`,
    correct: answers[i] === selectedAnswers[i] ? 1 : 0,
  }));

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fef7f1] text-black">
        <h1 className="text-4xl md:text-5xl font-semibold font-archivo mb-6 text-center">Results</h1>
        <p className="text-lg md:text-xl font-bold mb-4">Destination: {capitalizedLetter}</p>
        
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Score Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Score Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={summaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-4 text-sm text-gray-700 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#34D399] inline-block rounded-full" />
                Correct: {correctCount}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#F87171] inline-block rounded-full" />
                Incorrect: {incorrectCount}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FCD34D] inline-block rounded-full" />
                Not Answered: {notAnsweredCount}
              </span>
            </div>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="w-full max-w-3xl px-6">
            {data.map((q, i) => (
              <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold text-start">{i + 1}. {q.question}</p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === answers[i];
                    const isSelected = idx === selectedAnswers[i];
                    const isNotAnswered = selectedAnswers[i] === -1;

                    let bgClass = "";
                    let textClass = "";

                    if (isNotAnswered) {
                      // For unanswered questions, only highlight the correct answer
                      if (isCorrect) {
                        bgClass = "bg-green-200";
                        textClass = "font-semibold text-green-800";
                      }
                    } else {
                      // For answered questions
                      if (isSelected && isCorrect) {
                        // Selected correct answer - Dark Green
                        bgClass = "bg-green-600";
                        textClass = "text-white font-semibold";
                      } else if (isSelected && !isCorrect) {
                        // Selected incorrect answer - Red
                        bgClass = "bg-red-400";
                        textClass = "text-white font-semibold";
                      } else if (!isSelected && isCorrect) {
                        // Unselected correct answer - Green (to show what was right)
                        bgClass = "bg-green-200";
                        textClass = "font-semibold text-green-800";
                      }
                      // Other unselected options remain with default styling
                    }

                    return (
                      <li key={idx} className={`px-3 py-1 rounded ${bgClass} ${textClass}`}>
                        {opt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading results...</p>
        )}

        <div className="flex gap-4 m-5">
          <button
            onClick={downloadPDF}
            className="flex flex-row justify-center items-center gap-2 text-[#C7C5C2] bg-blue-600 hover:bg-blue-700 text-archivo font-semibold p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl"
          >
            <Download/>
            Download PDF
          </button>
          <button
            onClick={() => setShowExitModal(true)}
            className="flex flex-row justify-center items-center gap-2 text-[#C7C5C2] bg-[#211E21] text-archivo font-semibold p-4 md:py-5 md:px-10 rounded-2xl hover:text-white hover:scale-105 transition shadow-2xl"
          >
            <Home/>
            Go Back to Home
          </button>
        </div>

      </div>

      {showExitModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Save your progress? 💾</h2>
            <p className="text-gray-600 mb-6">
              Would you like to save your progress before exiting?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleSaveAndExit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Yes, Save
              </button>
              <button
                onClick={handleDiscardAndExit}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                No, Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}