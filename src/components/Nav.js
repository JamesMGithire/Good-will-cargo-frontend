import {  useNavigate, NavLink } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedIn";

export default function Nav(){
    const navigate = useNavigate()
    const {loggedIn:{user}} = useLoggedInContext();
    function handleLogout(){
        navigate("/")
    }
    console.log(user)
    return(
    <nav>
        {user?
        <>
            <NavLink to="/me">Account</NavLink>
            <span onClick={handleLogout}>Logout</span>
        </>:
        <NavLink to="/login">Login</NavLink>}
        <NavLink>Ships</NavLink>
    </nav>
    )
}