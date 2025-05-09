import { useState } from "react";
import Button from "@/app/components/Button/Button";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const triggerConfetti = () => {
    const duration = 1000; // 1 second
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    triggerConfetti();

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#FBF6EF] text-[#2E2C2A] px-6 md:px-12 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold font-archivo mb-4 text-center">Get in Touch</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-xl font-semibold">
        Have questions, feedback, or partnership ideas? We'd love to hear from you!
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        {error && <p className="text-red-500 font-semibold text-center">{error}</p>}

        <div>
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
          ></textarea>
        </div>

        <div className="flex flex-row justify-center align-center">
          <Button text="Send Message" type="submit" />
        </div>
      </form>
    </div>
  );
}
