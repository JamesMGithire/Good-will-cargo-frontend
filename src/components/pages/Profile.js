import "../../styling/JavaScript/profilePageStyle"

export default function Profile({ user }) {


  return (
    <>
      <div className="page-scroller">
        <a className="profile-nav" href="#profile"><div></div></a>
        <a className="profile-nav" href="#user-cargos"><div></div></a>
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
            <button className="delete-profile">Delete Profile</button>
          </div>
        </div>
      </div>
      <div id="user-cargos" className="user-cargos"></div>
    </>
  )
}
