import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import { logout, updateUser } from "../../redux/slices/users/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { userData } = useSelector((state: RootState) => state.users);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
  });

  const dispatch: AppDispatch = useDispatch();

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {...prevUser, [name]: value }
    });
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const updateUserData = { id: userData?.id, ...user };
    dispatch(updateUser(updateUserData));
  }

  return (
    <div className="profile-container">
      <div className="profile-main-content">
        {userData && (
        <div className="profile">

          <div className="profile-img-n-title">
              <img src="/images/user.png" alt="" width="90"/>
              <h1>{`${userData?.firstName} ${userData?.lastName}`}</h1>
          </div>

          <div className="profile-data">
            <p>Email: {userData.email}</p>
            <p>Password: {userData.password}</p>
          </div>
          <button className="edit-profile-data" onClick={handleFormOpen}>Edit Profile</button>

          <div className="user-profile-form">
            {isFormOpen && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required/>
              <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required/>
              <button type="submit">UPDATE</button>
            </form>
            )}

            <div className="logout-option">
              <Link to="/" className="logout-link" onClick={handleLogout}>
                <FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket} size="lg"/>
                Log out
              </Link>
            </div>
          </div>

        </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile;