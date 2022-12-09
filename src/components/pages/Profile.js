import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/LoggedIn'
import '../../styling/JavaScript/profilePageStyle'

export default function Profile({ user }) {
  const nav = useNavigate();
  console.log(user.cargos)
  const { setLoggedIn } = useLoggedInContext();
  function deleteProfile() {
    fetch('/me', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    })
    .then(r=>{
      if(r.ok){
        localStorage.removeItem("jwt");
        setLoggedIn(()=>({user:null}));
        nav("/");
      }
    })
  }
  return (
    <>
      <div className="page-scroller">
        <a className="profile-nav" href="#profile">
          <div></div>
        </a>
        <a className="profile-nav" href="#user-cargos">
          <div></div>
        </a>
      </div>
      <div id="profile" className="profile-page">
        <div className="user-div">
          <div className="user-img"></div>
          <div className="username">{user.username}</div>
          <div className="bio">
            <input
              type="text"
              placeholder={user.bio ? `bio: ${user.bio}` : 'bio'}
            />
          </div>
          <div className="button-div">
            <button className="change-password">Change Password</button>
            <button className="delete-profile" onClick={deleteProfile}>Delete Profile</button>
          </div>
        </div>
      </div>
      <div id="user-cargos" className="user-cargos">
        {}
      </div>
    </>
  )
}
