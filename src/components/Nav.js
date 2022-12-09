import {  useNavigate, NavLink } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedIn";

export default function Nav(){
    const navigate = useNavigate()
    const {loggedIn:{user}, setLoggedIn} = useLoggedInContext();
    function handleLogout(){
        localStorage.removeItem("jwt");
        setLoggedIn(()=>({user:null}));
        navigate("/");
    }
    
    return(
    <nav>
        {user?
        <>
            <NavLink to="/me">Account</NavLink>
            <span onClick={handleLogout}>Logout</span>
        </>:
        <NavLink to="/login">Login</NavLink>}
        <NavLink to="/ships">Ships</NavLink>
    </nav>
    )
}