import InputDiv from "../InputDiv";
import { NavLink } from "react-router-dom";

export default function Signup({setLoggedIn}){
    let userInfo = {}
    const handleChange=(e)=>{
        userInfo={...userInfo,[e.target.name]: e.target.value}
    }
    function handleSignup(e){
        e.preventDefault();
        console.log(userInfo);
        // fetch("https://good-will-cargo-spark-production.up.railway.app/signup",{
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(userInfo)
        // })
        // .then(r=>r.json())
        // .then(data=>{
        //     localStorage.setItem("jwt", data.jwt)
        //     setLoggedIn({user: data.user})
        //     fetch("https://good-will-cargo-spark-production.up.railway.app/me",{
        //             headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
        //     })
        //     .then(r=>r.json())
        //     .then(cargos=>{
        //         setLoggedIn(prevData=>({user:{...prevData.user,cargos: cargos}}))
        //     })
        // })
        // .catch(e=>console.error(e))
    }
    const signupForm=<form className="signup-div" onSubmit={handleSignup}>
        <div>
            <input type= "text" name="username" onChange={handleChange} placeholder="username"/>
        </div>
        <div>
            <input type= "text" name="password" onChange={handleChange} placeholder="password"/>
        </div>
        <div className="submit-button">
            <button>Login</button>
        </div>
        <div>
            <span>Don't have an account?   <NavLink to="/signup">Signup</NavLink></span>
        </div>
    </form>
    return(
    <InputDiv form={signupForm}/>
    );
}