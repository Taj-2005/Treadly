import Footer from "../components/Foooter/Footer";
import Navbar from "../components/NavBar/NavBar";
import Places from "../components/Places/Places";
import QuizInput from "../components/QuizInput/QuizInput";

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