import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import {useLoggedInContext} from "../context/LoggedIn";
import { useEffect, useState } from "react";
import Ships from "./pages/Ships";

export default function Body(){

    const [cargoShips, setCargoShips] = useState([]);
    useEffect(()=>{
        fetch("https://good-will-cargo-spark-production.up.railway.app/cargo_ships")
        .then(r=>r.json())
        .then(cargoShips=>setCargoShips(cargoShips))
    },[])
    
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
        <Route path="/ships" element={<Ships cargoShips= {cargoShips}/>}/>
    </Routes>
    );
}