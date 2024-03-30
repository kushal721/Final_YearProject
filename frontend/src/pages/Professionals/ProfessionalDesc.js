import React, { useEffect, useState } from "react";
import NavbarComp from "../../components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";

const ProfessionalDesc = () => {
  const { id } = useParams(); // Get the professional ID from the route parameters
  console.log("id: ", id);

  const [professionalDesc, setProfessionalDesc] = useState(null); // Set initial state to null

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/user/professional/${id}`
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

  // Render loading state while waiting for data to be fetched
  if (!professionalDesc) {
    return (
      <div>
        <NavbarComp />
        <div className="container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Once data is fetched, render the professional description
  return (
    <div>
      <NavbarComp />
      <div className="container">
        <div className="title">
          <h2>{professionalDesc.username}</h2>
          <h3>{professionalDesc.email}</h3>
          <Link to={`/${id}/booking`} className="btn-book-appoint">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDesc;
