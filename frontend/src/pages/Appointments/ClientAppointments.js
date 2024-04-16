import React, { useState, useEffect } from "react";
import "./ClientAppointments.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import NavbarComp from "../../components/Navbar/Navbar";

const ClientAppointments = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const { user } = useAuthContext();
  console.log(confirmedAppointments, "confirmedAppointments");
  console.log(pendingAppointments, "pendingAppointments");

  useEffect(() => {
    const fetchClientAppointments = async () => {
      try {
        // Check if the user object or its token property is null
        if (!user || !user.token) {
          console.error("User object or token is null.");
          // You can display an error message or redirect the user to the login page
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/appointments/client-appointments`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.appointments)) {
            // Filter appointments based on status
            const confirmed = data.appointments.filter(
              (appointment) => appointment.appointment.status === "confirmed"
            );
            const pending = data.appointments.filter(
              (appointment) => appointment.appointment.status === "pending"
            );
            setConfirmedAppointments(confirmed);
            setPendingAppointments(pending);
          } else {
            console.error("Appointments data is not an array:", data);
          }
        } else {
          console.error("Failed to fetch client appointments");
        }
      } catch (error) {
        console.error("Error fetching client appointments:", error);
      }
    };

    fetchClientAppointments();
  }, [user]);

  return (
    <div>
      
      <div className="client-appointments-container">
        <div className="appointment-section">
          <h1 className="page-title">Your Appointments</h1>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Professional Name</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Location</th>
                <th className="table-heading">Remark</th>
              </tr>
            </thead>
            <tbody>
              {confirmedAppointments.map((appointment) => (
                <tr key={appointment.appointment._id} className="table-row">
                  <td className="table-data">
                    {appointment.professionalDetails &&
                      appointment.professionalDetails.username}
                  </td>
                  <td className="table-data">
                    {
                      new Date(appointment.appointmentDetails.date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td className="table-data">
                    {appointment.appointment.appointmentTime}
                  </td>
                  <td className="table-data">
                    {appointment.appointmentDetails.location}
                  </td>
                  <td className="table-data">
                    {appointment.appointment.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pending-appointment">
          <h1 className="page-title">Pending Appointments</h1>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Professional Name</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Location</th>
                <th className="table-heading">Remark</th>
              </tr>
            </thead>
            <tbody>
              {pendingAppointments.map((appointment) => (
                <tr key={appointment.appointment._id} className="table-row">
                  <td className="table-data">
                    {appointment.professionalDetails &&
                      appointment.professionalDetails.username}
                  </td>
                  <td className="table-data">
                    {
                      new Date(appointment.appointmentDetails.date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td className="table-data">
                    {appointment.appointment.appointmentTime}
                  </td>
                  <td className="table-data">
                    {appointment.appointmentDetails.location}
                  </td>
                  <td className="table-data">
                    {appointment.appointment.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointments;
