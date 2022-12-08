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
    const loginForm=<form onSubmit={handleLogin}>
        <div>
            <input type= "text" name="usernmae" onChange={handleChange} placeholder="username"/>
        </div>
        <div>
            <input type= "text" name="usernmae" onChange={handleChange} placeholder="username"/>
        </div>
        <div className="submit-button">
            <button>Login</button>
        </div>
    </form>
    return(
    <>
    <InputDiv form={loginForm}/>
    </>
    );
}