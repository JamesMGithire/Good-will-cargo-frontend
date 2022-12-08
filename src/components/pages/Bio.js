import InputDiv from "../InputDiv";

export default function Bio(){
    let userBio=""
    const handleChange=e=>{
        userBio=e.target.value
    }
    function handleSubmit(e){
        e.preventDefault();
        fetch("https://good-will-cargo-spark-production.up.railway.app/me",{
            method:"PATCH",
            headers:{"Authorze": `Bearer ${localStorage.getItem("jwt")}`, 
            "Content-Type" : "application/json"},
            body:JSON.stringify({
                bio:userBio
            })
        })
        .then(r=>r.json())
        .then(data=>console.log(data))
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
        <InputDiv form/>
    )
}