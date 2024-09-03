import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Ensure to include the CSS file

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    about: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    about: ''
  });

  useEffect(() => {
    // Fetch user profile data on component mount
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    axios.put('/api/user/profile', formData)
      .then(response => {
        setUser(response.data);
        setIsEditing(false);
        alert('Profile updated successfully!');
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="user-profile">
      <div className="profile-avatar">
        <img src={user.avatar} alt="User Avatar" width="100" />
        {isEditing && (
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
          />
        )}
      </div>
      {isEditing ? (
        <div className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </label>
          <button onClick={handleUpdateProfile}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>About:</strong> {user.about}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
