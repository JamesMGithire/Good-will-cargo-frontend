import './styling/App.css';
import Nav from './components/Nav';
import { useLoggedInContext } from './context/LoggedIn';
import Body from './components/Body';
import { useEffect } from 'react';

function App() {
  const { setLoggedIn } = useLoggedInContext();
  useEffect(()=>{
    fetch("https://good-will-cargo-spark-production.up.railway.app/me",{
      headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
    })
    .then(r=>r.json())
    .then(loggedUser=>{
      setLoggedIn((prevData)=>
    ({...prevData, user:{...prevData.user, user: loggedUser}}))
    fetch("https://good-will-cargo-spark-production.up.railway.app/user_cargos",{
                    headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
            })
            .then(r=>r.json())
            .then(cargos=>{
                setLoggedIn(prevData=>({user:{...prevData.user,cargos: cargos}}))
            })
    })
  },[])
  return (
    <>
       <Nav/>
      <Body/>
    </>
  );
}

export default App;
