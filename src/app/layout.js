import { Geist, Geist_Mono,Great_Vibes, Poppins, Montserrat, Playfair_Display, Roboto, Open_Sans, Lora, Raleway, Quicksand, Oswald, Bebas_Neue, Archivo} from "next/font/google";
import Head from 'next/head';
import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: "400", 
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: "400", 
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400", 
  subsets: ["latin"], 
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400", 
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "400", 
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  weight: "400", 
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400", 
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: "400", 
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  weight: "400", 
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: "400", 
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: "400", 
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: "400", 
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  weight: "400", 
  subsets: ["latin"],
});

export const metadata = {
  title: "Treadly - A Travel Quiz App",
  description:
    "Take engaging quizzes and track your progress over time. Save your quiz scores securely, view detailed results, and improve with every attempt.",
  keywords: [
    "quiz app",
    "online quizzes",
    "track quiz scores",
    "quiz result storage",
    "interactive learning",
    "quiz with user authentication",
    "MongoDB quiz app",
    "quiz history",
    "save quiz results",
    "Next.js quiz platform"
  ],
  authors: [{ name: "Your Name or Team Name", url: "https://yourwebsite.com" }],
  creator: "Your Name or Company",
  robots: "index, follow",
  openGraph: {
    title: "Track Your Quiz Progress with Interactive Quizzes",
    description:
      "Join our quiz platform to save your results, review past performance, and improve through personalized feedback.",
    url: "https://yourdomain.com",
    siteName: "QuizMaster",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quiz App Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz App with Score Tracking | QuizMaster",
    description:
      "Engage with fun quizzes, save results, and boost your knowledge. Try now and monitor your growth!",
    images: ["https://yourdomain.com/twitter-card.jpg"],
    creator: "@yourhandle",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${greatVibes.variable} ${poppins.variable} ${montserrat.variable} ${playfairDisplay.variable} ${roboto.variable} ${openSans.variable} ${lora.variable} ${raleway.variable} ${quicksand.variable} ${oswald.variable} ${bebas.variable} ${archivo.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}