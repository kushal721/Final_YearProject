import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./ProfeProfile.css";

const ProfeProfile = () => {
  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Profile</h1>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="profile-info">
            <div className="profile-picture">
              <img
                src="/path/to/profile-picture.jpg"
                alt="Profile Picture"
                className="profile-img"
              />
            </div>
            <div className="info">
              <span className="label">Full Name:</span>
              <span className="value">John Doe</span>
            </div>
            <br />
            <div className="info">
              <span className="label">Email:</span>
              <span className="value">john@example.com</span>
            </div>
            {/* Add more personal information fields */}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="profile-section">
          <h2 className="section-title">Professional Experience</h2>
          <div className="experience-item">
            <h3 className="experience-title">Senior Developer</h3>
            <p className="experience-details">
              Company Name, Location | Jan 2020 - Present
            </p>
            <p className="experience-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              blandit urna vitae felis fermentum, sit amet eleifend velit
              consequat.
            </p>
          </div>
          {/* Add more experience items */}
        </div>

        {/* Skills */}
        <div className="profile-section">
          <h2 className="section-title">Skills</h2>
          <ul className="skill-list">
            <li className="skill-item">JavaScript</li>
            <li className="skill-item">React.js</li>
            <li className="skill-item">Node.js</li>
            {/* Add more skills */}
          </ul>
        </div>

        {/* Education */}
        <div className="profile-section">
          <h2 className="section-title">Education</h2>
          <div className="education-item">
            <h3 className="education-title">
              Bachelor's Degree in Computer Science
            </h3>
            <p className="education-details">
              University Name, Location | Graduated: May 2018
            </p>
          </div>
          {/* Add more education items */}
        </div>

        {/* Contact Information */}
        <div className="profile-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="info">
            <span className="label">Phone:</span>
            <span className="value">123-456-7890</span>
          </div>
          <div className="info">
            <span className="label">Address:</span>
            <span className="value">123 Main St, City, Country</span>
          </div>
          {/* Add more contact information fields */}
        </div>
      </div>
    </div>
  );
};

export default ProfeProfile;
