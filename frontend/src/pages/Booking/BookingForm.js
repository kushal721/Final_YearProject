import React, { useState } from "react";
import "./BookingForm.css"; // Import CSS file
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const BookingForm = ({ appointmentId }) => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    appointment: appointmentId,
    professional: id,
    client: user.userId, // Get client ID from authenticated user
    appointmentTime: "",
    remark: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/appointments/book-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Appointment booked successfully!");
        // Reset form data after successful booking
        setFormData({
          appointment: appointmentId,
          professional: id,
          client: user.userId,
          appointmentTime: "",
          remark: "",
        });
      } else {
        const errorMessage = await response.text();
        alert(`Failed to book appointment: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment");
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="remark">Remark:</label>
        <textarea
          id="remark"
          name="remark"
          value={formData.remark}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
