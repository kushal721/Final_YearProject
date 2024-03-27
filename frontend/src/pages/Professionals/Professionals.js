// // Professionals.js

// import React from "react";
// import "./Professionals.css"; // Import the CSS file
// import Footer from "../../components/Footer/Footer";
// import NavbarComp from "../../components/Navbar/Navbar";
// import ProfessionalCard from "../../components/Cards/ProfessionalCard";

// const Professionals = () => {

//   return (

//     <div>
//       <NavbarComp />
//       <div className="container">
//         <div className="left">
// <h2>Filter Search</h2>
// <div className="filter-search">
//   <div className="dropdown">
//     <label htmlFor="designType">Location:</label>
//     <select name="designType" id="designType">
//       <option value="">Select Location</option>
//       <option value="cottage">Nuwakot</option>
//       <option value="farmHouse">Kathmandu</option>
//       <option value="normal">Hetauda</option>
//     </select>
//   </div>
//   <div className="dropdown">
//     <label htmlFor="area">Rating:</label>
//     <select name="area" id="area">
//       <option value="">Select rating</option>
//       <option value="0-50">0-3</option>
//       <option value="50-100">3-5</option>
//     </select>
//   </div>
// </div>
//         </div>

//         <div className="right">
//           <div className="designs">
//             <ProfessionalCard />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Professionals;

import React, { useState, useEffect } from "react";
import "./Professionals.css"; // Import the CSS file
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/Navbar/Navbar";
import ProfessionalCard from "../../components/Cards/ProfessionalCard";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/user/professionals"
        );
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
          console.log(data);
        } else {
          console.error("Failed to fetch professionals");
        }
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };
    fetchProfessionals();
  }, []);

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
            {/* <ProfessionalCard /> */}
            {professionals.map((professional) => (
              <div key={professional._id}>
                <ProfessionalCard professional={professional} />
              </div>

              // <ProfessionalCard
              //   key={professional._id}
              //   professional={professional}
              // />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
