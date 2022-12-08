export default function Profile({user}){
    return(
        <div className="profile-page">
            <div className="user-div">
                <div className="user-img"></div>
                <div className="username">{user.username}</div>
                <div className="bio">
                    <input type="text" placeholder={user.bio?`bio: ${user.bio}`: "bio"}/>
                </div>
                <div className="button-div">
                    <button className="change-password">Change Password</button>
                    <button className="delete-profile">Delete Profile</button>
                </div>
            </div>
        </div>
    );
}