import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    birthday: '',
    phone: '',
    instagram: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Simulating fetch from backend
    setUserDetails({
      name: 'Kareena Jaiswal',
      birthday: '13-11-2004',
      phone: '91+ 8777417805',
      instagram: 'jais_insta',
      email: 'kareenajaiswal123@gmail.com',
      password: '********',
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button">&larr;</button>
        <h2 className="profile-name">{userDetails.name}</h2>
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-item">
          <FontAwesomeIcon icon={faBirthdayCake} />
          <input type="text" value={userDetails.birthday} readOnly />
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faPhone} />
          <input type="text" value={userDetails.phone} readOnly />
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faInstagram} />
          <input type="text" value={userDetails.instagram} readOnly />
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <input type="email" value={userDetails.email} readOnly />
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faLock} />
          <input type="password" value={userDetails.password} readOnly />
        </div>
      </div>

      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default UserProfile;
