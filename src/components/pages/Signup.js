import InputDiv from "../InputDiv";

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
    const signupForm=<form onSubmit={handleSignup}>
        <div>
            <input type="text" placeholder="username" onChange={handleChange}/>
        </div>
    </form>
    return(
    <InputDiv form={signupForm}/>
    );
}