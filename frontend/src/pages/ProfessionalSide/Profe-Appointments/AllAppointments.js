import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./ProfeAppointments.css";
const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuthContext();
  console.log("appointments", appointments);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/appointments/professional-appointment`,
          {
            headers: {
              Authorization: `Bearer ${user?.token || ""}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setAppointments(data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (user?.token) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Confirmed Appointments</h1>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Date</th>
                <th className="table-heading">startTime</th>
                <th className="table-heading">endtimeTime</th>
                <th className="table-heading">Location</th>

                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="table-row">
                  <td className="table-data">{appointment.date}</td>
                  <td className="table-data">{appointment.startTime}</td>
                  <td className="table-data">{appointment.endTime}</td>
                  <td className="table-data">{appointment.location}</td>
                  <td className="table-data">Edit Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
