import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComp from "../../components/Navbar/Navbar";
import "./Booking.css"; // Import CSS file

const Booking = () => {
  const { id } = useParams();

  const [appointments, setAppointments] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/appointments/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments);
          setProfessionalDetails(data.professionalDetails);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="booking-container">
      {" "}
      {/* Apply CSS class */}
      <NavbarComp />
      <h1>Book appointments</h1>
      {professionalDetails && (
        <>
          <h2>Professional Details:</h2>
          <p>Username: {professionalDetails.username}</p>
          <p>Email: {professionalDetails.email}</p>
        </>
      )}
      <h2>Appointments:</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="appointment-card">
          {" "}
          {/* Apply CSS class */}
          <h2>Appointment ID: {appointment._id}</h2>
          <h2>
            Appointment Date: {new Date(appointment.date).toLocaleDateString()}
          </h2>
          <p>
            Appointment Timings: {appointment.startTime} to{" "}
            {appointment.endTime}
          </p>
          <p>Location: {appointment.location}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Booking;
