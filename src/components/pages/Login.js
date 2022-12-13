import { NavLink, useNavigate } from 'react-router-dom'
import InputDiv from '../InputDiv'
import { useRef, useState } from 'react'

export default function Login({ setLoggedIn }) {
  const [userInfo, setUserInfo] = useState({});
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }
  const [inCorrectInfo, setInCorrectInfo] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    fetch('https://good-will-cargo-spark-production.up.railway.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    }).then((r) => {
        password.current.value="";
        username.current.value="";
        setUserInfo({});
      if (r.ok) {
        r.json().then((data) => {
          localStorage.setItem('jwt', data.jwt)
          fetch(
            'https://good-will-cargo-spark-production.up.railway.app/user_cargos',
            {
              headers: {
                Authorization: `Bearer ${data.jwt}`,
                'Content-Type': 'application/json',
              },
            },
          )
            .then((r) => r.json())
            .then((cargoShips) => {
        setInCorrectInfo(false);
              setLoggedIn((prevData) => ({
                ...prevData,
                user: { ...prevData.user, cargoShips: cargoShips },
              }))
              navigate('/')
            })
        })
      } else {
        setInCorrectInfo(true);
        console.log(username.current)
      }
    })
  }
  const loginForm = (
    <form onSubmit={handleLogin}>
      <div>
        <input
          ref={username}
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
        />
      </div>
      <div>
        <input
          ref={password}
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
      </div>
      <div className="submit-button">
        <button>Login</button>
      </div>
      {inCorrectInfo && (
        <p className='wrong-info'>Wrong username or password</p>
      )}
      <div>
        <span>
          Already have an account? <NavLink to="/signup">Signup</NavLink>
        </span>
      </div>
    </form>
  )
  return (
    <div className="login-div">
      <InputDiv form={loginForm} />
    </div>
  )
}
