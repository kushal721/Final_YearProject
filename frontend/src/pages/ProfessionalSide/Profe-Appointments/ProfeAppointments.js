import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './ProfeAppointments.css';

const ProfeAppointments = () => {
  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Appointments</h1>
        </div>

        {/* Appointment List */}
        <div className="appointment-list">
          <h2 className="table-title">Appointment List</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Client Name</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Phone Number</th>
                <th className="table-heading">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-data">John Doe</td>
                <td className="table-data">2024-02-05</td>
                <td className="table-data">10:00 AM</td>
                <td className="table-data">1234567890</td>
                <td className="table-data">123 Main St, City</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Appointment Requests */}
        <div className="appointment-requests">
          <h2 className="table-title">Appointment Requests</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Client Name</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Time</th>
                <th className="table-heading">Phone Number</th>
                <th className="table-heading">Location</th>
                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-data">Jane Smith</td>
                <td className="table-data">2024-02-10</td>
                <td className="table-data">2:00 PM</td>
                <td className="table-data">9876543210</td>
                <td className="table-data">456 Park Ave, Town</td>
                <td className="table-data">
                  <button className="accept-button">Accept</button>
                  <button className="reject-button">Reject</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfeAppointments;
