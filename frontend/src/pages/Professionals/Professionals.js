// Professionals.js

import React from "react";
import "./Professionals.css"; // Import the CSS file
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/Navbar/Navbar";
import ProfessionalCard from "../../components/Cards/ProfessionalCard";

const Professionals = () => {
  return (

    
    <div>
      <NavbarComp />
      <div className="container">
        <div className="left">
          <h2>Filter Search</h2>
          <div className="filter-search">
            <div className="dropdown">
              <label htmlFor="designType">Location:</label>
              <select name="designType" id="designType">
                <option value="">Select Location</option>
                <option value="cottage">Nuwakot</option>
                <option value="farmHouse">Kathmandu</option>
                <option value="normal">Hetauda</option>
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="area">Rating:</label>
              <select name="area" id="area">
                <option value="">Select rating</option>
                <option value="0-50">0-3</option>
                <option value="50-100">3-5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="designs">
            <ProfessionalCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
