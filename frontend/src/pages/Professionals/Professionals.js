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

// import React, { useState, useEffect } from "react";
// import NavbarComp from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
// import ProfessionalCard from "../../components/Cards/ProfessionalCard";
// import { Pagination } from "@mui/material";

// const Professionals = () => {
//   const [professionals, setProfessionals] = useState([]);
//   const [sortedProfessionals, setSortedProfessionals] = useState([]);
//   const [sortByOption, setSortByOption] = useState("name");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProfessionals, setFilteredProfessionals] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [professionalsPerPage] = useState(6);

//   useEffect(() => {
//     const fetchProfessionals = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/userr/professionals"
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setProfessionals(data);
//         } else {
//           console.error("Failed to fetch professionals");
//         }
//       } catch (error) {
//         console.error("Error fetching professionals:", error);
//       }
//     };
//     fetchProfessionals();
//   }, []);

//   useEffect(() => {
//     const sorted = professionals.slice().sort((a, b) => {
//       if (a[sortByOption] < b[sortByOption]) return -1;
//       if (a[sortByOption] > b[sortByOption]) return 1;
//       return 0;
//     });
//     setSortedProfessionals(sorted);
//   }, [professionals, sortByOption]);

//   useEffect(() => {
//     const filtered = sortedProfessionals.filter((professional) =>
//       professional.designName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProfessionals(filtered);
//   }, [sortedProfessionals, searchTerm]);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const indexOfLastProfessional = currentPage * professionalsPerPage;
//   const indexOfFirstProfessional =
//     indexOfLastProfessional - professionalsPerPage;
//   const currentProfessionals = filteredProfessionals.slice(
//     indexOfFirstProfessional,
//     indexOfLastProfessional
//   );

//   return (
//     <div>
//       <NavbarComp />
//       <div className="container">
//         <div className="left">
//           <h2>Filter Search</h2>
//           <h2>Filter Search</h2>
//           <div className="filter-search">
//             <div className="dropdown">
//               <label htmlFor="designType">Location:</label>
//               <select name="designType" id="designType">
//                 <option value="">Select Location</option>
//                 <option value="cottage">Nuwakot</option>
//                 <option value="farmHouse">Kathmandu</option>
//                 <option value="normal">Hetauda</option>
//               </select>
//             </div>
//             <div className="dropdown">
//               <label htmlFor="area">Rating:</label>
//               <select name="area" id="area">
//                 <option value="">Select rating</option>
//                 <option value="0-50">0-3</option>
//                 <option value="50-100">3-5</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="right">
//           <div className="designs">
//             {professionals.map((professional) => (
//               <ProfessionalCard
//                 key={professional._id}
//                 professional={professional}
//               />
//             ))}
//           </div>
//           <div className="flex justify-center mt-4">
//             <Pagination
//               count={Math.ceil(
//                 filteredProfessionals.length / professionalsPerPage
//               )}
//               page={currentPage}
//               onChange={handlePageChange}
//               showFirstButton
//               showLastButton
//               color="primary"
//             />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Professionals;

import React, { useState, useEffect } from "react";
import "./Professionals.css";
import NavbarComp from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProfessionalCard from "../../components/Cards/ProfessionalCard";
import { Pagination } from "@mui/material";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [professionalsPerPage] = useState(6);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/userr/professionals"
        );
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
          setFilteredProfessionals(data); // Set filtered professionals initially to all professionals
        } else {
          console.error("Failed to fetch professionals");
        }
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };
    fetchProfessionals();
  }, []);
  console.log("sdfa0", professionals);
  console.log(searchLocation, "location");

  useEffect(() => {
    // Filter professionals based on search term and location
    const filtered = professionals.filter(
      (professional) =>
        professional.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        professional.location
          ?.toLowerCase()
          .includes(searchLocation.toLowerCase())
    );
    setFilteredProfessionals(filtered);
  }, [professionals, searchTerm, searchLocation]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastProfessional = currentPage * professionalsPerPage;
  const indexOfFirstProfessional =
    indexOfLastProfessional - professionalsPerPage;
  const currentProfessionals = filteredProfessionals.slice(
    indexOfFirstProfessional,
    indexOfLastProfessional
  );

  return (
    <div>
      <div className="container">
        <div className="left">
          <h2>Filter Search</h2>
          <div className="filter-search">
            <div className="mb-4">
              <input
                type="text"
                className="form-control p-2 border rounded"
                placeholder="Search professionals"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control p-2 border rounded"
                placeholder="Search by Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="designs">
            {currentProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional._id}
                professional={professional}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(
                filteredProfessionals.length / professionalsPerPage
              )}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              color="primary"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
