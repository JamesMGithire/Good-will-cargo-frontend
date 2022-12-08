import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import {useLoggedInContext} from "../context/LoggedIn";

export default function Body(){
    const {setLoggedIn, loggedIn} = useLoggedInContext();
    return(
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        {loggedIn.user?
        <>
            <Route path="/me" element={<Profile user={loggedIn.user}/>}/>
            <Route path="/bio" element={<></>}/>
        </>:
        <>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>}/>
        </>}
    </Routes>
    );
}