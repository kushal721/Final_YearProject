

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Import your CSS file
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to your backend to initiate the password reset process
      const response = await axios.post("/forgot-password", { email });

      // Check the response from the server and handle it accordingly
      if (response.status === 200) {
        // Password reset link sent successfully
        alert("Password reset link sent successfully. Check your email.");
        navigate("/login"); // Redirect to the login page or another appropriate page
      } else {
        // Handle other possible responses
        console.error("Error sending password reset link");
        alert("Error sending password reset link. Please try again.");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="email" className="f-label">Email</label>
          <input className="f-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            id="email"
            placeholder="Enter Email Address"
          />
        </div>

        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
