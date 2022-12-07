import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function Body(){
    return(
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
    </Routes>
    );
}