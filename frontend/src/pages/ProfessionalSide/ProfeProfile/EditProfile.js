import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./EditProfile.css";

const EditProfile = () => {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const [professionalsData, setProfessionalsData] = useState({});
  const [showProfessionalsForm, setShowProfessionalsForm] = useState(false);
  console.log("usered", user);

  useEffect(() => {
    // Fetch user data
    fetch(`http://localhost:4000/api/userr/${user?.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });

    // Fetch professionals data if user is a professional
    if (user?.isProfessional) {
      fetch(`http://localhost:4000/api/userr/professionals/${user?.userId}`)
        .then((response) => response.json())
        .then((data) => {
          setProfessionalsData(data);
        })
        .catch((error) => {
          console.error("Error fetching professionals data: ", error);
        });
    }
  }, [user]);

  const handleUserEdit = (e) => {
    e.preventDefault();
    // Update user data on the server
    fetch(`http://localhost:4000/api/userr/${user?.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data updated successfully: ", data);
        alert("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  };

  const handleProfessionalsEdit = (e) => {
    e.preventDefault();
    // Update professionals data on the server
    fetch(`http://localhost:4000/api/userr/professionals/${user?.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(professionalsData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Professionals data updated successfully: ", data);
        alert("Professionals data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating professionals data: ", error);
      });
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-heading">Edit Profile</h1>
      <form onSubmit={handleUserEdit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username || ""}
            className="form-control"
            onChange={(event) =>
              setUserData({ ...userData, username: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ""}
            className="form-control"
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary save-btn">
          Save Changes
        </button>
      </form>

      {/* Render professional details form only if user is a professional */}
      {user?.isProfessional && (
        <div className="professionals-section mt-4">
          <button
            className="btn btn-secondary toggle-btn"
            onClick={() => setShowProfessionalsForm(!showProfessionalsForm)}
          >
            {showProfessionalsForm
              ? "Hide Professional Details"
              : "Edit Professional Details"}
          </button>
          {showProfessionalsForm && (
            <form
              onSubmit={handleProfessionalsEdit}
              className="professionals-form"
            >
              {/* Professional details form inputs */}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
