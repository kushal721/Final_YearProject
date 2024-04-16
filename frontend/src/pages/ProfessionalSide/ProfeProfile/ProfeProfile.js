// import React from "react";
// import Sidebar from "../../../components/Sidebar/Sidebar";
// import "./ProfeProfile.css";

// const ProfeProfile = () => {
//   return (
//     <div className="my-designs-container">
//       <Sidebar />
//       <div className="content">
//         <div className="page-name">
//           <h1 className="page-title">Profile</h1>
//           <div className="action-buttons">
//             <button className="action-button">Add Information</button>
//             <button className="action-button">Edit Information</button>
//             <button className="action-button">Change Password</button>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="profile-section">
//           <h2 className="section-title">Personal Information</h2>
//           <div className="profile-info">
//             <div className="profile-picture">
//               <img
//                 src="/path/to/profile-picture.jpg"
//                 alt="Profile Picture"
//                 className="profile-img"
//               />
//             </div>
//             <div className="info">
//               <span className="label">Full Name:</span>
//               <span className="value">John Doe</span>
//             </div>
//             <br />
//             <div className="info">
//               <span className="label">Email:</span>
//               <span className="value">john@example.com</span>
//             </div>
//             {/* Add more personal information fields */}
//           </div>
//         </div>

//         {/* Professional Experience */}
//         <div className="profile-section">
//           <h2 className="section-title">Professional Experience</h2>
//           <div className="experience-item">
//             <h3 className="experience-title">Senior Developer</h3>
//             <p className="experience-details">
//               Company Name, Location | Jan 2020 - Present
//             </p>
//             <p className="experience-description">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//               blandit urna vitae felis fermentum, sit amet eleifend velit
//               consequat.
//             </p>
//           </div>
//           {/* Add more experience items */}
//         </div>

//         {/* Skills */}
//         <div className="profile-section">
//           <h2 className="section-title">Skills</h2>
//           <ul className="skill-list">
//             <li className="skill-item">JavaScript</li>
//             <li className="skill-item">React.js</li>
//             <li className="skill-item">Node.js</li>
//             {/* Add more skills */}
//           </ul>
//         </div>

//         {/* Education */}
//         <div className="profile-section">
//           <h2 className="section-title">Education</h2>
//           <div className="education-item">
//             <h3 className="education-title">
//               Bachelor's Degree in Computer Science
//             </h3>
//             <p className="education-details">
//               University Name, Location | Graduated: May 2018
//             </p>
//           </div>
//           {/* Add more education items */}
//         </div>

//         {/* Contact Information */}
//         <div className="profile-section">
//           <h2 className="section-title">Contact Information</h2>
//           <div className="info">
//             <span className="label">Phone:</span>
//             <span className="value">123-456-7890</span>
//           </div>
//           <div className="info">
//             <span className="label">Address:</span>
//             <span className="value">123 Main St, City, Country</span>
//           </div>
//           {/* Add more contact information fields */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfeProfile;
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddInformation from "./AddInformation"; // Import the AddInformation component
import EditProfile from "./EditProfile"; // Import the EditProfile component
import "./ProfeProfile.css";
import ChangePassword from "../../../components/ChangePassword/ChangePassword";
import { useAuthContext } from "../../../hooks/useAuthContext";
import styled from "styled-components";

const ProfeProfile = () => {
  // State variables to control the visibility of the Add Information popup and Edit Information popup
  const [showAddInfoPopup, setShowAddInfoPopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [professionalData, setProfessionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const professionalId = user?.userId;
  console.log("user", professionalData);
  console.log("pid", professionalId);

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/userr/professionals/${professionalId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfessionalData(data);
          console.log(data, "data");
          setLoading(false);
        } else {
          throw new Error("Failed to fetch professional data");
        }
      } catch (error) {
        console.error("Error fetching professional data:", error.message);
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfessionalData();
    }
  }, [user?.token]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <div className="maindiv">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="profile-container">
          <div className="profile-content">
            <div className="page-name">
              <div className="action-buttons">
                <button
                  className="action-button"
                  onClick={() => setShowAddInfoPopup(true)} // Show the Add Information popup when clicked
                >
                  Add Information
                </button>
                <button
                  className="action-button"
                  onClick={() => setShowEditProfilePopup(true)} // Show the Edit Profile popup when clicked
                >
                  Edit Information
                </button>
                <button
                  className="action-button"
                  onClick={() => setShowChangePasswordPopup(true)}
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="profile-section">
              <div className="profile-info">
                <div className="profile-picture">
                  <img
                    src="/path/to/profile-picture.jpg"
                    alt="Profile Picture"
                    className="profile-img"
                  />
                </div>
                <div className="info">
                  <span className="label">Full Name: {user.username} </span>

                  <span className="label">Email:{user.email}</span>
                  <span className="label">
                    Phone:{professionalData.contact}
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="profile-section">
              <h2 className="section-title">Professional Experience</h2>
              <div className="experience-item">
                <h3 className="experience-title">
                  Specialization: {professionalData.specialization}
                </h3>
                <p className="experience-details">
                  Experience: {professionalData.experience}
                </p>
                <p className="experience-description">
                  {professionalData.description}
                </p>
              </div>
              {/* Add more experience items */}
            </div>

            {/* Skills */}
            <div className="profile-section">
              <h2 className="section-title">Skills</h2>
              <p>{professionalData.skills}</p>
            </div>

            {/* Education */}
            <div className="profile-section">
              <h2 className="section-title">Education</h2>
              <div className="education-item">
                <p className="education-details">
                  {professionalData.education}
                </p>
              </div>
              {/* Add more education items */}
            </div>

            {/* Contact Information */}

            {/* Add Information Popup */}
            {showAddInfoPopup && (
              <div className="add-info-popup">
                <AddInformation />
                <button
                  className="close-popup-btn"
                  onClick={() => setShowAddInfoPopup(false)} // Hide the Add Information popup when clicked
                >
                  ❌
                </button>
              </div>
            )}

            {/* Edit Profile Popup */}
            {showEditProfilePopup && (
              <div className="edit-profile-popup">
                <EditProfile />
                <button
                  className="close-popup-btn"
                  onClick={() => setShowEditProfilePopup(false)} // Hide the Edit Profile popup when clicked
                >
                  ❌
                </button>
              </div>
            )}

            {/* change password Popup */}
            {showChangePasswordPopup && (
              <div className="change-password-popup">
                <ChangePassword />
                <button
                  className="close-popup-btn"
                  onClick={() => setShowChangePasswordPopup(false)} // Hide the change password popup when clicked
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Loading = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
  color: #6a5acd;
`;

export default ProfeProfile;
