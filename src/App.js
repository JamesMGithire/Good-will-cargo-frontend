import './styling/App.css'
import Nav from './components/Nav'
import { useLoggedInContext } from './context/LoggedIn'
import Body from './components/Body'
import { useEffect, useRef } from 'react'

function App() {
  const { setLoggedIn } = useLoggedInContext()
  const customCursor = useRef()
  const moveCursor = (e) => {
    const mouseY = e.clientY
    const mouseX = e.clientX

    customCursor.current.style.transform = `translate3d(${mouseX - 20}px, ${
      mouseY - 20
    }px, 0)`
  }

  window.addEventListener('mousemove', moveCursor)
  useEffect(() => {
    fetch('https://good-will-cargo-spark-production.up.railway.app/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    }).then((r) => {
      if (r.ok) {
        r.json().then((loggedUser) => {
          setLoggedIn(() => ({ user: { ...loggedUser } }))
          fetch(
            'https://good-will-cargo-spark-production.up.railway.app/user_cargos',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              },
            },
          )
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
    <>
      <div ref={customCursor} className="custom-cursor">
        <div></div>
      </div>
      <div className="App">
        <Nav />
        <Body />
      </div>
    </>
  )
}

export default App
