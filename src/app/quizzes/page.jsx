import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/NavBar/NavBar";
import Places from "@/app/components/Places/Places";
import QuizInput from "@/app/components/QuizInput/QuizInput";

export default function quizzes(){
    return(
        <>
            <Navbar/>
            <QuizInput/>
            <Places/>
            <Footer/>
        </>
    )
}