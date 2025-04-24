"use client"

export default function Question({ question, index }) {
    if (!question || question.length === 0) return null;
  
    const current = question[index];
  
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-5xl text-center font-bold">{current.question}</div>
        {current.options.map((opt, i) => (
          <div key={i} className="text-4xl">{opt}</div>
        ))}
      </div>
    );
  }
  