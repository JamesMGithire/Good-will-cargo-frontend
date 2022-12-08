import InputDiv from "../InputDiv";
import { useNavigate, NavLink } from "react-router-dom";

export default function Signup({setLoggedIn}){
    let userInfo = {}
    const navigate = useNavigate();
    const handleChange=(e)=>{
        userInfo={...userInfo,[e.target.name]: e.target.value}
    }
    function handleSignup(e){
        e.preventDefault();
        console.log(userInfo);
        navigate("/bio")
        // fetch("https://good-will-cargo-spark-production.up.railway.app/signup",{
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(userInfo)
        // })
        // .then(r=>r.json())
        // .then(data=>{
        //     localStorage.setItem("jwt", data.jwt)
        //     setLoggedIn({user: data.user})
        //     fetch("https://good-will-cargo-spark-production.up.railway.app/user_cargos",{
        //             headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
        //     })
        //     .then(r=>r.json())
        //     .then(cargos=>{
        //         setLoggedIn(prevData=>({user:{...prevData.user,cargos: cargos}}))
        //     })
        // })
        // .catch(e=>console.error(e))
    }
    const signupForm=<form onSubmit={handleSignup}>
        <div>
            <input type= "text" name="username" onChange={handleChange} placeholder="username"/>
        </div>
        <div>
            <input type= "text" name="email" onChange={handleChange} placeholder="email"/>
        </div>
        <div>
            <input type= "password" name="password" onChange={handleChange} placeholder="password"/>
        </div>
        <div>
            <input type= "password" name="password_confirmation" onChange={handleChange} placeholder="confirm password"/>
        </div>
        <div className="submit-button">
            <button>Signup</button>
        </div>
        <div>
            <span>Already have an account?   <NavLink to="/login">Login</NavLink></span>
        </div>
    </form>
    return(
        <div  className="signup-div">
            <InputDiv form={signupForm}/>
        </div>
    );
}