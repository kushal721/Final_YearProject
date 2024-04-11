import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarComp from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./ProfessionalDesc.css";

const ProfessionalDesc = () => {
  const { id } = useParams(); // Get the professional ID from the route parameters
  const { user } = useAuthContext(); // Access the user authentication state

  const [professionalDesc, setProfessionalDesc] = useState(null); // Set initial state to null
  const [designs, setDesigns] = useState([]); // Initialize designs state as an empty array

  // Function to handle the message request
  const handleMessageRequest = async () => {
    if (!user) {
      console.error("User object is null.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user.userId,
          receiverId: id,
        }),
      });
      if (response.ok) {
        // Handle success
        console.log("Message sent successfully");
        // You can update the UI or show a success message here if needed
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Check if user object exists before logging userId
  useEffect(() => {
    if (user) {
      console.log(user.userId, "suid");
    }
  }, [user]);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/userr/professionals/personal/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProfessionalDesc(data); // Set the professionalDesc state with fetched data
          console.log("data", data);
        } else {
          console.error("Failed to fetch professional details");
        }
      } catch (error) {
        console.error("Error fetching professional details:", error);
      }
    };

    fetchProfessional();
  }, [id]); // Fetch professional details when ID changes

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/designs/${id}/designs`
        );
        if (response.ok) {
          const data = await response.json();
          setDesigns(data); // Set the designs state with fetched data
          console.log("designs", data);
        } else {
          console.error("Failed to fetch professional designs");
        }
      } catch (error) {
        console.error("Error fetching professional designs:", error);
      }
    };

    fetchDesigns();
  }, [id]); // Fetch designs when ID changes

  // Render loading state while waiting for data to be fetched
  // if (!professionalDesc || designs.length === 0) {
  //   return (
  //     <div>
  //       <NavbarComp />
  //       <div className="container">
  //         <h2>Loading...</h2>
  //       </div>
  //     </div>
  //   );
  // }

  // Render the professional description and designs once data is fetched
  // Render the professional description and designs once data is fetched
  return (
    <div>
      <NavbarComp />
      <div className="container">
        {professionalDesc && ( // Check if professionalDesc is not null
          <div className="title">
            <h2>{professionalDesc.username}</h2>
            <h3>{professionalDesc.email}</h3>
            {/* Conditionally render the booking link */}
            {user ? (
              <>
                <Link
                  to={`/chat`}
                  onClick={handleMessageRequest}
                  className="btn-book-appoint"
                >
                  Message Now
                </Link>
                <Link to={`/${id}/booking`} className="btn-book-appoint">
                  Book Appointment
                </Link>
              </>
            ) : (
              <p>Please log in to book an appointment</p>
            )}
          </div>
        )}

        {/* Display professional designs if available */}
        {designs.length > 0 && (
          <div className="designs-container">
            <h2>Professional Designs</h2>
            <ul>
              {designs.map((design) => (
                <li key={design.id}>
                  <h3>Design Name: {design.designName}</h3>
                  <p>Area: {design.area}</p>
                  <p>Estimate Cost: {design.estimateCost}</p>
                  <p>Description: {design.designDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDesc;
