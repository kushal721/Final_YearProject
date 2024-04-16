import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { Modal } from "react-bootstrap"; // Importing modal from react-bootstrap
import { useNavigate } from "react-router-dom";
import "./List.css";

import { Button } from "flowbite-react";
import NavbarComp from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

export default function UserList() {
  const [items, setItems] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [nameError, setNameError] = useState(""); // State to track name input error
  const [emailError, setEmailError] = useState(""); // State to track email input error
  const [nameTouched, setNameTouched] = useState(false); // State to track whether name field is touched
  const [emailTouched, setEmailTouched] = useState(false); // State to track whether email field is touched
  const navigate = useNavigate();
  console.log(items, "items");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/userr");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      // Ask for confirmation before deleting the user
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      // If the user confirms the action, proceed with deletion
      if (confirmed) {
        // Send a DELETE request to your API to delete the resource
        await fetch(`http://localhost:4000/api/userr/${id}`, {
          method: "DELETE",
        });

        // Update the items state to remove the deleted resource
        setItems(items.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (id, username, email) => {
    // Set the editing row to the ID of the row being edited
    setEditingRow(id);

    // Find the user being edited and set the updated name and email
    const user = items.find((item) => item._id === id);
    if (user) {
      setUpdatedName(username);
      setUpdatedEmail(email);
    }

    // Show the modal
    setShowModal(true);
  };

  const saveChanges = async (id) => {
    try {
      // Validate name and email inputs
      if (!updatedName.trim()) {
        setNameError("Name cannot be empty");
        return;
      } else {
        setNameError(""); // Clear name error if input is valid
      }
      if (!updatedEmail.trim()) {
        setEmailError("Email cannot be empty");
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)) {
        setEmailError("Please enter a valid email address");
        return;
      } else {
        setEmailError(""); // Clear email error if input is valid
      }

      // Send a PUT request to update user information
      const response = await fetch(`http://localhost:4000/api/userr//${id}`, {
        method: "PUT", // Assuming your API endpoint for updating users uses the PUT method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: updatedName, email: updatedEmail }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Fetch the updated user data and set it to the state
      const updatedUserData = await response.json();
      setItems(items.map((item) => (item._id === id ? updatedUserData : item)));

      // Reset editing state after saving changes
      setEditingRow(null);

      // Close the modal after saving changes
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const cancelEditing = () => {
    // Reset editing state without saving changes
    setEditingRow(null);

    // Reset input errors
    setNameError("");
    setEmailError("");

    // Close the modal without saving changes
    setShowModal(false);
  };

  const handleNameChange = (e) => {
    const username = e.target.value;
    setUpdatedName(username);
    setNameTouched(true); // Marking name field as touched
    // Clear name error if input is valid or if the field has been touched
    if (nameError && (username.trim() || nameTouched)) {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUpdatedEmail(email);
    setEmailTouched(true); // Marking email field as touched
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Display error only if the email is invalid and the field has been touched
    if (!emailRegex.test(email) && (emailError || emailTouched)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear email input error if input is valid
    }
  };

  const rows = items.map((item) => ({
    id: item._id,
    userName: item.username,
    userEmail: item.email,
    userRole: item.role,
    userPassword: item.password,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "userName", headerName: "User name", width: 150 },
    { field: "userEmail", headerName: "Email", width: 230 },
    { field: "userRole", headerName: "Role", width: 130 },
    { field: "userPassword", headerName: "Password", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      height: 190,
      renderCell: (params) => (
        <Actions>
          <Button
            type="button"
            color="failure"
            onClick={() => deleteUser(params.row.id)}
          >
            Delete
          </Button>
          <Button
            type="button"
            color="success"
            onClick={() =>
              editUser(params.row.id, params.row.userName, params.row.userEmail)
            }
          >
            Edit
          </Button>
        </Actions>
      ),
    },
  ];

  return (
    <div className="maindiv">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div style={{ padding: "1%" }}>
        <div style={{ height: "84vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            checkboxSelection
          />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingRow && (
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        nameError ? "is-invalid" : ""
                      }`}
                      id="username"
                      value={updatedName}
                      onChange={handleNameChange}
                    />
                    {nameError && (
                      <div className="invalid-feedback">{nameError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        emailError ? "is-invalid" : ""
                      }`}
                      id="email"
                      value={updatedEmail}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                </form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => saveChanges(editingRow)}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const Actions = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;
