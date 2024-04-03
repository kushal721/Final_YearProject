import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AddAppointment.css"; // Import the CSS file for styling

import { Navigate } from "react-router-dom"; // Change Navigate to navigate for redirect
import { useAuthContext } from "../../../hooks/useAuthContext";

const AddAppointment = () => {
  //   const { user } = useAuthContext(); // Access the user authentication state
  //   console.log("puser", user);
  //   //   const profeId = user.userId;
  //   //   console.log("profeid", profeId);

  //   const [appointmentData, setAppointmentData] = useState({
  //     professional: user ? user.userId : "", // Check if user is not null before accessing userId
  //     date: "",
  //     startTime: "",
  //     endTime: "",
  //     location: "",
  //   });
  const { user } = useAuthContext();

  const [appointmentData, setAppointmentData] = useState({
    professional: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  console.log(appointmentData);

  useEffect(() => {
    if (user) {
      setAppointmentData((prevData) => ({
        ...prevData,
        professional: user.userId,
      }));
    }
  }, [user]);

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...appointmentData };

      const response = await fetch(
        "http://localhost:4000/api/appointments/add-appointment",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Include the authentication token in the request headers
          },
        }
      );
      // Check if the user is authenticated before rendering the component
      if (!user) {
        Navigate("/login"); // Redirect to login page if user is not authenticated
        return;
      }

      if (response.ok) {
        alert("Appointment created successfully!");
        console.log("Appointment created successfully!");
      } else {
        const errorData = await response.json(); // Get error message from response body
        setError(errorData.error); // Set error message state
        console.log("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("Failed to create appointment. Please try again."); // Generic error message
    }
  };

  return (
    <div className="my-appointments-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Add New Appointment</h1>
        </div>
        <form className="add-appointment-form" onSubmit={handleSubmit}>
          <h1 className="appointment-details-title">Appointment Details</h1>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={appointmentData.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={appointmentData.endTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={appointmentData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </div>
          <div className="btn-create">
            <button className="create-button" type="submit">
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
