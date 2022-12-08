import { NavLink } from "react-router-dom";
import InputDiv from "../InputDiv";

export default function Login(){
    let userInfo =  {}
    const handleChange = (e)=>{
        userInfo = {...userInfo, [e.target.name]: e.target.value}
    }

    function handleLogin(e){
        e.preventDefault();
        console.log(userInfo)
        // fetch("https://good-will-cargo-spark-production.up.railway.app/login",{
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(userInfo)
        // })
    }
    const loginForm=<form  onSubmit={handleLogin}>
        <div>
            <input type= "text" name="username" onChange={handleChange} placeholder="username"/>
        </div>
        <div>
            <input type= "password" name="password" onChange={handleChange} placeholder="password"/>
        </div>
        <div className="submit-button">
            <button>Login</button>
        </div>
        <div>
            <span>Already have an account?   <NavLink to="/signup">Signup</NavLink></span>
        </div>
    </form>
    return(
    <div className="login-div">
    <InputDiv form={loginForm}/>
    </div>
    );
}