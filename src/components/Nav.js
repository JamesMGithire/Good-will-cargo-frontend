import {  useNavigate, NavLink } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedIn";

export default function Nav(){
    const navigate = useNavigate()
    const {loggedIn:{user}} = useLoggedInContext();
    function handleLogout(){
        navigate("/")
    }
    return(
    <nav>
        {user?<>
        <NavLink>Account</NavLink>
        <span onClick={handleLogout}>Logout</span>
        </>:<>
        <NavLink>Login</NavLink>
        </>}
        <NavLink>Ships</NavLink>
    </nav>
    )
}