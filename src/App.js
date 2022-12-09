import './styling/App.css'
import Nav from './components/Nav'
import { useLoggedInContext } from './context/LoggedIn'
import Body from './components/Body'
import { useEffect } from 'react'

function App() {
  const { setLoggedIn } = useLoggedInContext()
  useEffect(() => {
    fetch('/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    }).then((r) => {
      if (r.ok) {
        r.json().then((loggedUser) => {
          setLoggedIn(() => ({ user: { ...loggedUser } }))
          fetch('/user_cargos', {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
          })
            .then((r) => r.json())
            .then((cargos) => {
              setLoggedIn((prevData) => ({
                user: { ...prevData.user, cargos: cargos },
              }))
            })
        })
      }
    })
    // eslint-disable-next-line
  }, [])
  return (
    <div className="App">
      <Nav />
      <Body />
    </div>
  )
}

export default App
