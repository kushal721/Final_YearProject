import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./ProfeAppointments.css";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ProfeAppointments = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const { user } = useAuthContext();
  console.log("appointmetreq", appointmentRequests);

  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      try {
        const professionalId = user.userId;
        const response = await fetch(
          `http://localhost:4000/api/appointments/booking-request/${professionalId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.bookingRequests)) {
            setAppointmentRequests(data.bookingRequests);
          } else {
            console.error("Data does not contain booking requests:", data);
          }
        } else {
          console.error("Failed to fetch appointment requests");
        }
      } catch (error) {
        console.error("Error fetching appointment requests:", error);
      }
    };

    fetchAppointmentRequests();
  }, [user]);

  const handleAction = async (id, action) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/${id}/${action}`,
        // `http://localhost:4000/api/appointments`,
        // `http://localhost:4000/api/appointments/booking-request/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        // Update appointment status locally
        const updatedAppointments = appointmentRequests.map((appointment) => {
          if (appointment.bookingRequest._id === id) {
            return {
              ...appointment,
              bookingRequest: {
                ...appointment.bookingRequest,
                status: action === "confirm" ? "confirmed" : "cancelled",
              },
            };
          }
          return appointment;
        });
        setAppointmentRequests(updatedAppointments);
      } else {
        console.error(`Failed to update appointment status (${action})`);
      }
    } catch (error) {
      console.error(`Error updating appointment status (${action}):`, error);
    }
  };

  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Confirmed Appointments</h1>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Client Name</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Location</th>

                <th className="table-heading">Remark</th>
                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequests
                .filter(
                  (appointment) =>
                    appointment.bookingRequest.status !== "cancelled"
                )
                .map((appointment) => (
                  <tr
                    key={appointment.bookingRequest._id}
                    className="table-row"
                  >
                    <td className="table-data">
                      {appointment.clientDetails.username}
                    </td>
                    <td className="table-data">
                      {appointment.bookingRequest.appointmentTime}
                    </td>
                    <td className="table-data">Kathmandu</td>

                    <td className="table-data">
                      {appointment.bookingRequest.remark}
                    </td>
                    <td className="table-data">
                      <button
                        className="reject-button"
                        onClick={() =>
                          handleAction(appointment.bookingRequest._id, "cancel")
                        }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="appointment-requests">
          <h2 className="table-title">Appointment Requests</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Client Name</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Location</th>
                <th className="table-heading">Status</th>
                <th className="table-heading">Remark</th>
                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequests
                .filter(
                  (appointment) =>
                    appointment.bookingRequest.status !== "cancelled"
                )
                .map((appointment) => (
                  <tr
                    key={appointment.bookingRequest._id}
                    className="table-row"
                  >
                    <td className="table-data">
                      {appointment.clientDetails.username}
                    </td>
                    <td className="table-data">
                      {appointment.bookingRequest.appointmentTime}
                    </td>
                    <td className="table-data">Kathmandu</td>
                    <td className="table-data">
                      {appointment.bookingRequest.status}
                    </td>
                    <td className="table-data">
                      {appointment.bookingRequest.remark}
                    </td>
                    <td className="table-data">
                      <button
                        className="accept-button"
                        onClick={() =>
                          handleAction(
                            appointment.bookingRequest._id,
                            "confirm"
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="reject-button"
                        onClick={() =>
                          handleAction(appointment.bookingRequest._id, "cancel")
                        }
                      >
                        Reject
                      </button>
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

export default ProfeAppointments;
