// components/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#635d59] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div className='text-center'>
          <h1 className="font-great-vibes text-7xl text-white">Treadly</h1>
          <p className="mt-2 text-gray-400">© 2025 <span className='font-great-vibes font-black'>Treadly</span> All rights reserved.</p>
        </div>

        <div className='text-center'>
          <h2 className="font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/quizzes" className="hover:underline">Quizzes</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div className='text-center'>
          <h2 className="font-semibold mb-3">Explore More</h2>
          <ul className="space-y-2">
            <li><Link href="/quizzes" className="hover:underline">Destinations</Link></li>
            <li><Link href="/quizzes" className="hover:underline">Trivia</Link></li>
            <li><Link href="/quizzes" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        <div className='text-center'>
          <h2 className="font-semibold mb-3">Connect With Us</h2>
          <ul className="space-y-2">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
            <li><a href="mailto:email@example.com" className="hover:underline">Email Me</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
