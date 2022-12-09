import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../../context/LoggedIn";
import InputDiv from "../InputDiv";

export default function Bio(){
    let userBio="";
    const {setLoggedIn, loggedIn} = useLoggedInContext();
    const navigator=useNavigate();
    const handleChange=e=>{
        userBio=e.target.value
    }
    function handleSubmit(e){
        e.preventDefault();
        // console.log(loggedIn.user)
        fetch("https://good-will-cargo-spark-production.up.railway.app/me",{
            method:"PATCH",
            headers:{"Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json"},
            body:JSON.stringify({
                ...loggedIn.user,bio:userBio
            })
        })
        .then(r=>r.json())
        .then(data=>{
            setLoggedIn(prev=>({...prev,user:{...data}}));
            console.log(loggedIn.user);
            navigator("/");
        })
    }
    const bioForm = <form onSubmit={handleSubmit}>
        <div>
            <input type="text" placeholder="bio" onChange={handleChange}/>
        </div>
        <div>
            <button type="submit">submit</button>
        </div>
    </form>
    return(
        <div className="bio-div">
            <InputDiv form={bioForm}/>
        </div>
    )
}