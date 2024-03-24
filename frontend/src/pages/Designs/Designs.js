import React, { useState, useEffect } from "react";
import NavbarComp from "../../components/Navbar/Navbar";
import FooterComp from "../../components/Footer/Footer";
import DesignCard from "../../components/Cards/DesignCard";
import Description from "../../components/Cards/Description";

const Designs = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/designs/");
        if (response.ok) {
          const data = await response.json();
          setDesigns(data); // Set designs with fetched data
        } else {
          console.error("Failed to fetch designs");
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <div>
      <div>
        <NavbarComp />
        <div className="container">
          <div className="left">
            <h2>Filter Search</h2>
            <div className="filter-search">
              <div className="dropdown">
                <label htmlFor="designType">Design Type:</label>
                <select name="designType" id="designType">
                  <option value="">Select Design Type</option>
                  <option value="cottage">Cottage</option>
                  <option value="farmHouse">Farm House</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="area">Area:</label>
                <select name="area" id="area">
                  <option value="">Select Area Range</option>
                  <option value="0-50">0 - 50 sqft</option>
                  <option value="50-100">50 - 100 sqft</option>
                  <option value="100-200">100 - 200 sqft</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="cost">Cost:</label>
                <select name="cost" id="cost">
                  <option value="">Select Cost Range</option>
                  <option value="1-2">Rs 1 lakh - 2 lakhs</option>
                  <option value="2-10">Rs 2 lakhs - 10 lakhs</option>
                  <option value="10-20">Rs 10 lakhs - 20 lakhs</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="designs">
              {designs.map((design) => (
                <div key={design._id}>
                  <DesignCard design={design} />
                  {/* <Description design={design} /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-comp">
          <FooterComp />
        </div>
      </div>
    </div>
  );
};

export default Designs;
