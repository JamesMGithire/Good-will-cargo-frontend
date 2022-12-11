import { useNavigate } from 'react-router-dom'
import { useLoggedInContext } from '../../context/LoggedIn'
import '../../styling/JavaScript/profilePageStyle'
import ShipDiv from './ShipDiv'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useRef } from 'react'

export default function Profile({ user }) {
  const nav = useNavigate()
  const { setLoggedIn, loggedIn } = useLoggedInContext()
  let userBio = ''
  const profileDiv = useRef()
  const userCargosDiv = useRef()

  const scrollUp = () =>profileDiv.current.scrollIntoView({ behavior: 'smooth' });

  const scrollDown = () =>userCargosDiv.current.scrollIntoView({ behavior: 'smooth' });

  function deleteProfile() {
    fetch('https://good-will-cargo-spark-production.up.railway.app/me', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((r) => {
      if (r.ok) {
        localStorage.removeItem('jwt')
        setLoggedIn(() => ({ user: null }))
        nav('/')
      }
    })
  }

  function handleCancelClick(id) {
    fetch(
      `https://good-will-cargo-spark-production.up.railway.app/user_cargos/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      },
    ).then((r) => {
      if (r.ok) {
        setLoggedIn((prev) => ({
          user: {
            ...prev.user,
            cargos: prev.user.cargos.filter((car) => car.id !== id),
          },
        }))
      }
    })
  }

  function handleChangeBio() {
    fetch('https://good-will-cargo-spark-production.up.railway.app/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...loggedIn.user,
        bio: userBio,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn((prev) => ({ ...prev, user: { ...data } }))
        console.log(loggedIn.user)
        window.location.reload()
      })
  }

  return (
    <>
      <div className="page-scroller">
        <button
          onClick={scrollUp}
          className="profile-nav up"
        >
          <div value="up">
            <AiOutlineUp className="scrollers up" />
          </div>
        </button>
        <button
          onClick={scrollDown}
          className="profile-nav down"
        >
          <div value="down">
            <AiOutlineDown className="scrollers down" name="down" />
          </div>
        </button>
      </div>
      <div ref={profileDiv} id="profile" className="profile-page">
        <div className="user-div">
          <div className="user-img"></div>
          <div className="username">{user.username}</div>
          <div className="bio">
            <input
              type="text"
              onChange={(e) => {
                userBio = e.target.value
              }}
              placeholder={user.bio ? `bio: ${user.bio}` : 'bio'}
            />
          </div>
          <div className="button-div">
            <button className="change-password" onClick={handleChangeBio}>
              Change Bio
            </button>
            <button className="delete-profile" onClick={deleteProfile}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      <div ref={userCargosDiv} id="user-cargos" className="cargo-ships-page">
        {user.cargos &&
          user.cargos.map((cargo) => (
            <ShipDiv
              key={uuidv4()}
              id={cargo.id}
              ship={cargo.cargo_ship}
              amount={cargo.amount}
              count={cargo.count}
              handleCancelClick={handleCancelClick}
            />
          ))}
        <div />
      </div>
    </>
  )
}
