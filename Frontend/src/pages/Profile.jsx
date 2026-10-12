import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaLock,
  FaTicketAlt,
  FaHeart,
  FaBell,
  FaSignOutAlt,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "./profile.css";

function Profile() {
  const navigate = useNavigate();

  const { user, updateUser, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
    gender: "",
  });

  /*
  =========================================
  LOAD USER DATA
  =========================================
  */

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.username || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  /*
  =========================================
  START EDITING
  =========================================
  */

  const handleEdit = () => {
    setFormData({
      name: user?.name || user?.username || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
    });

    setIsEditing(true);
  };

  /*
  =========================================
  INPUT CHANGE
  =========================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  =========================================
  CANCEL
  =========================================
  */

  const handleCancel = () => {
    setFormData({
      name: user?.name || user?.username || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
    });

    setIsEditing(false);
  };

  /*
  =========================================
  SAVE
  =========================================
  */

  const handleSave = () => {
    const updatedUser = {
      ...user,

      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender.trim(),
    };

    /*
    Update AuthContext
    */
    updateUser(updatedUser);

    /*
    Close edit mode
    */
    setIsEditing(false);
  };

  /*
  =========================================
  LOGOUT
  =========================================
  */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /*
  =========================================
  DISPLAY VALUES
  =========================================
  */

  const displayName =
    user?.name ||
    user?.username ||
    "Eventix User";

  const displayUsername =
    user?.username ||
    "eventixuser";

  const displayEmail =
    user?.email ||
    "user@example.com";

  const displayPhone =
    user?.phone ||
    "Not provided";

  const displayLocation =
    user?.location ||
    "Not provided";

  const displayDateOfBirth =
    user?.dateOfBirth ||
    "Not provided";

  const displayGender =
    user?.gender ||
    "Not provided";

  const firstLetter =
    displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="profile-header">

          <div className="profile-label">
            ACCOUNT
          </div>

          <h1 className="profile-title">
            My Profile
          </h1>

          <p className="profile-description">
            Manage your Eventix account and personal
            information.
          </p>

        </div>

        {/* =====================================
            PROFILE CARD
        ===================================== */}

        <div className="profile-card">

          <div className="profile-cover"></div>

          <div className="profile-main">

            <div className="profile-main-content">

              <div className="profile-user">

                <div className="profile-avatar">
                  {firstLetter}
                </div>

                <div className="profile-user-info">

                  <h2 className="profile-user-name">
                    {displayName}
                  </h2>

                  <p className="profile-username">
                    @{displayUsername}
                  </p>

                  <span className="profile-role">
                    {user?.role || "Attendee"}
                  </span>

                </div>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={handleEdit}
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}

            </div>

          </div>

        </div>

        {/* =====================================
            EDIT PROFILE
        ===================================== */}

        {isEditing ? (

          <div className="profile-section edit-profile-section">

            <div className="edit-profile-header">

              <div>
                <h2 className="profile-section-title">
                  Edit Profile
                </h2>

                <p className="edit-profile-subtitle">
                  Update your personal information below.
                </p>
              </div>

              <button
                type="button"
                className="edit-close-button"
                onClick={handleCancel}
              >
                <FaTimes />
              </button>

            </div>

            <div className="profile-form">

              {/* FULL NAME */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Full Name
                </label>

                <input
                  className="profile-form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

              </div>

              {/* USERNAME */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Username
                </label>

                <input
                  className="profile-form-input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />

              </div>

              {/* EMAIL */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Email Address
                </label>

                <input
                  className="profile-form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />

              </div>

              {/* PHONE */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Phone Number
                </label>

                <input
                  className="profile-form-input"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />

              </div>

              {/* LOCATION */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Location
                </label>

                <input
                  className="profile-form-input"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />

              </div>

              {/* DATE OF BIRTH */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Date of Birth
                </label>

                <input
                  className="profile-form-input"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />

              </div>

              {/* GENDER */}

              <div className="profile-form-group">

                <label className="profile-form-label">
                  Gender
                </label>

                <select
                  className="profile-form-input"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="profile-form-actions">

              <button
                type="button"
                className="profile-cancel-button"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>

              <button
                type="button"
                className="profile-save-button"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

            </div>

          </div>

        ) : (

          <>
            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <div className="profile-section">

              <h2 className="profile-section-title">
                Personal Information
              </h2>

              <div className="profile-info-grid">

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaUser />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Full Name
                    </div>

                    <div className="profile-info-value">
                      {displayName}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaUser />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Username
                    </div>

                    <div className="profile-info-value">
                      @{displayUsername}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Email Address
                    </div>

                    <div className="profile-info-value">
                      {displayEmail}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaPhone />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Phone Number
                    </div>

                    <div className="profile-info-value">
                      {displayPhone}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Location
                    </div>

                    <div className="profile-info-value">
                      {displayLocation}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaCalendarAlt />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Date of Birth
                    </div>

                    <div className="profile-info-value">
                      {displayDateOfBirth}
                    </div>
                  </div>

                </div>

                <div className="profile-info-item">

                  <div className="profile-info-icon">
                    <FaUser />
                  </div>

                  <div>
                    <div className="profile-info-label">
                      Gender
                    </div>

                    <div className="profile-info-value">
                      {displayGender}
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================
                STATISTICS
            ================================= */}

            <div className="profile-stat-grid">

              <div className="profile-stat-card">

                <div className="profile-stat-content">

                  <div>
                    <div className="profile-stat-label">
                      Total Bookings
                    </div>

                    <div className="profile-stat-number">
                      0
                    </div>
                  </div>

                  <FaTicketAlt className="profile-stat-icon" />

                </div>

              </div>

              <div className="profile-stat-card">

                <div className="profile-stat-content">

                  <div>
                    <div className="profile-stat-label">
                      Favorites
                    </div>

                    <div className="profile-stat-number">
                      0
                    </div>
                  </div>

                  <FaHeart className="profile-stat-icon" />

                </div>

              </div>

              <div className="profile-stat-card">

                <div className="profile-stat-content">

                  <div>
                    <div className="profile-stat-label">
                      Notifications
                    </div>

                    <div className="profile-stat-number">
                      0
                    </div>
                  </div>

                  <FaBell className="profile-stat-icon" />

                </div>

              </div>

            </div>

            {/* =================================
                ACCOUNT SETTINGS
            ================================= */}

            <div className="profile-section">

              <h2 className="profile-section-title">
                Account Settings
              </h2>

              <div className="profile-settings">

                <button
                  className="profile-setting"
                  onClick={() =>
                    navigate("/my-bookings")
                  }
                >
                  <div className="profile-setting-icon">
                    <FaTicketAlt />
                  </div>

                  <div>
                    <div className="profile-setting-title">
                      My Bookings
                    </div>

                    <div className="profile-setting-description">
                      View your booked events
                    </div>
                  </div>
                </button>

                <button
                  className="profile-setting"
                  onClick={() =>
                    alert(
                      "Change Password will be connected later."
                    )
                  }
                >
                  <div className="profile-setting-icon">
                    <FaLock />
                  </div>

                  <div>
                    <div className="profile-setting-title">
                      Change Password
                    </div>

                    <div className="profile-setting-description">
                      Update your account password
                    </div>
                  </div>
                </button>

                <button
                  className="profile-setting"
                  onClick={() =>
                    alert(
                      "Notification settings will be connected later."
                    )
                  }
                >
                  <div className="profile-setting-icon">
                    <FaBell />
                  </div>

                  <div>
                    <div className="profile-setting-title">
                      Notifications
                    </div>

                    <div className="profile-setting-description">
                      Manage your notifications
                    </div>
                  </div>
                </button>

                <button
                  className="profile-setting"
                  onClick={handleLogout}
                >
                  <div className="profile-setting-icon">
                    <FaSignOutAlt />
                  </div>

                  <div>
                    <div className="profile-setting-title">
                      Logout
                    </div>

                    <div className="profile-setting-description">
                      Sign out of your Eventix account
                    </div>
                  </div>
                </button>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Profile;