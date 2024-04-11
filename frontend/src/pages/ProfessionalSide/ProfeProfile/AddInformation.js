import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./AddInformation.css"; // Create a CSS file for styling

const AddInformation = () => {
  const { user } = useAuthContext();
  // State variable to hold form data
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    description: "",
    skills: "",
    education: "",
    contact: "",
  });
  console.log("user u", user);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to add professional information
      const response = await fetch(
        "http://localhost:4000/api/userr/addProfessionalDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add professional information");
      }

      const data = await response.json();
      alert("Professional information added");
      console.log("Professional information added:", data);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error adding professional information:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="add-info-container">
      <h2 className="section-title">Add Information</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="left-form-group">
          <div className="form-group">
            <label htmlFor="specialization" className="label">
              Specialization:
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="input-field"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience" className="label">
              Experience:
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              className="input-field"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills" className="label">
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="input-field"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="right-form-group">
          <div className="form-group">
            <label htmlFor="education" className="label">
              Education:
            </label>
            <input
              type="text"
              id="education"
              name="education"
              className="input-field"
              value={formData.education}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact" className="label">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="input-field"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="input-field"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInformation;
