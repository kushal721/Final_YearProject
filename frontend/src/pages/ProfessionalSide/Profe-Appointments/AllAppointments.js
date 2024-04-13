// import React, { useState, useEffect } from "react";
// import Sidebar from "../../../components/Sidebar/Sidebar";
// import { useAuthContext } from "../../../hooks/useAuthContext";
// import "./ProfeAppointments.css";
// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const { user } = useAuthContext();
//   console.log("appointments", appointments);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/appointments/professional-appointment`,
//           {
//             headers: {
//               Authorization: `Bearer ${user?.token || ""}`,
//             },
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log("data", data);
//           setAppointments(data);
//         } else {
//           console.error("Failed to fetch appointments");
//         }
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//       }
//     };

//     if (user?.token) {
//       fetchAppointments();
//     }
//   }, [user]);

//   return (
//     <div className="my-designs-container">
//       <Sidebar />
//       <div className="content">
//         <div className="page-name">
//           <h1 className="page-title">Confirmed Appointments</h1>
//           <table className="appointment-table">
//             <thead>
//               <tr>
//                 <th className="table-heading">Date</th>
//                 <th className="table-heading">startTime</th>
//                 <th className="table-heading">endtimeTime</th>
//                 <th className="table-heading">Location</th>

//                 <th className="table-heading">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appointment) => (
//                 <tr key={appointment._id} className="table-row">
//                   <td className="table-data">{appointment.date}</td>
//                   <td className="table-data">{appointment.startTime}</td>
//                   <td className="table-data">{appointment.endTime}</td>
//                   <td className="table-data">{appointment.location}</td>
//                   <td className="table-data">Edit Delete</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./ProfeAppointments.css";
import { useParams } from "react-router-dom";

const AllAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const { user } = useAuthContext();

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

  const handleEdit = (appointment) => {
    setEditAppointment({ ...appointment });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditAppointment((prevAppointment) => ({
      ...prevAppointment,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/${editAppointment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token || ""}`,
          },
          body: JSON.stringify(editAppointment),
        }
      );
      if (response.ok) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === editAppointment._id
            ? editAppointment
            : appointment
        );
        setAppointments(updatedAppointments);
        alert("Appointment updated successfully");
        setEditAppointment(null);
      } else {
        console.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditAppointment(null);
  };

  const handleRemoveAppointment = (appointment) => {
    if (!appointment) {
      console.error("No appointment selected for deletion");
      return;
    }
    setEditAppointment(appointment); // Set the appointment to be deleted
    setShowConfirmationPopup(true); // Display confirmation popup
  };

  const handleConfirmDelete = async () => {
    try {
      if (!editAppointment || !editAppointment._id) {
        console.error("No appointment selected for deletion");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/appointments/${editAppointment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.ok) {
        const updatedAppointments = appointments.filter(
          (appointment) => appointment._id !== editAppointment._id
        );
        setAppointments(updatedAppointments);
        alert("Appointment removed successfully");
        setShowConfirmationPopup(false);
      } else {
        console.error("Failed to remove appointment");
      }
    } catch (error) {
      console.error("Error removing appointment:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationPopup(false);
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
                <th className="table-heading">Date</th>
                <th className="table-heading">Start Time</th>
                <th className="table-heading">End Time</th>
                <th className="table-heading">Location</th>
                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="table-row">
                  <td className="table-data">
                    {editAppointment &&
                    editAppointment._id === appointment._id ? (
                      <input
                        type="date"
                        value={editAppointment.date}
                        onChange={(e) => handleInputChange(e, "date")}
                      />
                    ) : (
                      appointment.date
                    )}
                  </td>
                  <td className="table-data">
                    {editAppointment &&
                    editAppointment._id === appointment._id ? (
                      <input
                        type="time"
                        value={editAppointment.startTime}
                        onChange={(e) => handleInputChange(e, "startTime")}
                      />
                    ) : (
                      appointment.startTime
                    )}
                  </td>
                  <td className="table-data">
                    {editAppointment &&
                    editAppointment._id === appointment._id ? (
                      <input
                        type="time"
                        value={editAppointment.endTime}
                        onChange={(e) => handleInputChange(e, "endTime")}
                      />
                    ) : (
                      appointment.endTime
                    )}
                  </td>
                  <td className="table-data">
                    {editAppointment &&
                    editAppointment._id === appointment._id ? (
                      <input
                        type="text"
                        value={editAppointment.location}
                        onChange={(e) => handleInputChange(e, "location")}
                      />
                    ) : (
                      appointment.location
                    )}
                  </td>
                  <td className="table-data">
                    {editAppointment &&
                    editAppointment._id === appointment._id ? (
                      <>
                        <button className="btn-save" onClick={handleSave}>
                          Save
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(appointment)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleRemoveAppointment(appointment)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Confirmation popup */}
      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <h3>Are you sure you want to delete?</h3>
          <div className="popup-buttons">
            <button className="popup-button" onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className="popup-button" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
