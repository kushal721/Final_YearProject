// import React, { useState, useEffect } from "react";

// import DesignCard from "../../components/Cards/DesignCard";

// const Designs = () => {
//   const [designs, setDesigns] = useState([]);

//   useEffect(() => {
//     const fetchDesigns = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/designs/");
//         if (response.ok) {
//           const data = await response.json();
//           setDesigns(data); // Set designs with fetched data
//         } else {
//           console.error("Failed to fetch designs");
//         }
//       } catch (error) {
//         console.error("Error fetching designs:", error);
//       }
//     };
//     fetchDesigns();
//   }, []);

//   return (
//     <div>
//       <div>
//         <NavbarComp />
//         <div className="container">
//           <div className="left">
//             <h2>Filter Search</h2>
//             <div className="filter-search">
//               <div className="dropdown">
//                 <label htmlFor="designType">Design Type:</label>
//                 <select name="designType" id="designType">
//                   <option value="">Select Design Type</option>
//                   <option value="cottage">Cottage</option>
//                   <option value="farmHouse">Farm House</option>
//                   <option value="normal">Normal</option>
//                 </select>
//               </div>
//               <div className="dropdown">
//                 <label htmlFor="area">Area:</label>
//                 <select name="area" id="area">
//                   <option value="">Select Area Range</option>
//                   <option value="0-50">0 - 50 sqft</option>
//                   <option value="50-100">50 - 100 sqft</option>
//                   <option value="100-200">100 - 200 sqft</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="dropdown">
//                 <label htmlFor="cost">Cost:</label>
//                 <select name="cost" id="cost">
//                   <option value="">Select Cost Range</option>
//                   <option value="1-2">Rs 1 lakh - 2 lakhs</option>
//                   <option value="2-10">Rs 2 lakhs - 10 lakhs</option>
//                   <option value="10-20">Rs 10 lakhs - 20 lakhs</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="right">
//             <div className="designs">
//               {designs.map((design) => (
//                 <div key={design._id}>
//                   <DesignCard design={design} />
//                   {/* <Description design={design} /> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="footer-comp">
//           <FooterComp />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Designs;

// import React, { useState, useEffect } from "react";
// import NavbarComp from "../../components/Navbar/Navbar";
// import FooterComp from "../../components/Footer/Footer";
// import Button from "@mui/material/Button";
// import { sortBy } from "lodash";
// import { Pagination } from "@mui/material";

// const Designs = () => {
//   const [designs, setDesigns] = useState([]);
//   const [sortedDesigns, setSortedDesigns] = useState([]);
//   const [sortByOption, setSortByOption] = useState("designName");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDesigns, setFilteredDesigns] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [designsPerPage] = useState(6);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     const fetchDesigns = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/designs");
//         if (!response.ok) {
//           throw new Error("Failed to fetch designs");
//         }
//         const data = await response.json();
//         setDesigns(data);
//       } catch (error) {
//         console.error("Error fetching designs:", error.message);
//       }
//     };

//     fetchDesigns();
//   }, []);

//   useEffect(() => {
//     const sorted = sortBy(designs, sortByOption);
//     setSortedDesigns(sorted);
//   }, [designs, sortByOption]);

//   useEffect(() => {
//     const filtered = sortedDesigns.filter((design) =>
//       design.designName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDesigns(filtered);
//   }, [sortedDesigns, searchTerm]);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const indexOfLastDesign = currentPage * designsPerPage;
//   const indexOfFirstDesign = indexOfLastDesign - designsPerPage;
//   const currentDesigns = filteredDesigns.slice(
//     indexOfFirstDesign,
//     indexOfLastDesign
//   );

//   return (
//     <div>
//       <NavbarComp /> {/* Include NavbarComp here */}
//       <div className="flex">
//         <nav className="w-60 md:w-1/4 bg-light p-4 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4 text-dark">Explore</h2>
//           <div className="mb-4">
//             <label
//               htmlFor="category"
//               className="form-label text-sm font-medium text-dark mb-1"
//             >
//               Category
//             </label>
//             <select
//               id="category"
//               className="form-select p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">All Categories</option>
//               {/* Add category options */}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="sortBy"
//               className="form-label text-sm font-medium text-dark mb-1"
//             >
//               Sort By
//             </label>
//             <select
//               id="sortBy"
//               className="form-select p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
//               value={sortByOption}
//               onChange={(e) => setSortByOption(e.target.value)}
//             >
//               <option value="designName">Design Name</option>
//               <option value="authorName">Author Name</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               className="form-control p-2 border rounded"
//               placeholder="Search designs"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </nav>

//         <div className="w-full md:w-3/4 p-4">
//           <h2 className="text-2xl font-bold mb-4 text-blue-800">Designs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentDesigns.map((design) => (
//               <div
//                 className="card bg-white dark:bg-neutral-700 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
//                 key={design._id}
//               >
//                 <div className="relative h-56 overflow-hidden rounded-t-lg">
//                   <img
//                     src={design.imageUrl} // Use appropriate field from your design data
//                     alt="card-image"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold mb-2 text-blue-800">
//                     {design.designName}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-2">
//                     Author: {design.authorName}
//                   </p>
//                   <p className="text-sm">{design.designDescription}</p>
//                   <br></br>
//                   <Button
//                     variant="contained"
//                     href="#contained-buttons"
//                     className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//                   >
//                     Read More
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center mt-4">
//             <Pagination
//               count={Math.ceil(filteredDesigns.length / designsPerPage)}
//               page={currentPage}
//               onChange={handlePageChange}
//               showFirstButton
//               showLastButton
//               color="primary"
//             />
//           </div>
//         </div>
//       </div>
//       <FooterComp /> {/* Include FooterComp here */}
//     </div>
//   );
// };

// export default Designs;

import React, { useState, useEffect } from "react";
import NavbarComp from "../../components/Navbar/Navbar";
import FooterComp from "../../components/Footer/Footer";
import Button from "@mui/material/Button";
import { sortBy } from "lodash";
import { Pagination } from "@mui/material";
import DesignCard from "../../components/Cards/DesignCard"; // Import DesignCard component

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [sortedDesigns, setSortedDesigns] = useState([]);
  const [sortByOption, setSortByOption] = useState("designName");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [designsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/designs");
        if (!response.ok) {
          throw new Error("Failed to fetch designs");
        }
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error("Error fetching designs:", error.message);
      }
    };

    fetchDesigns();
  }, []);

  useEffect(() => {
    const sorted = sortBy(designs, sortByOption);
    setSortedDesigns(sorted);
  }, [designs, sortByOption]);

  useEffect(() => {
    const filtered = sortedDesigns.filter((design) =>
      design.designName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDesigns(filtered);
  }, [sortedDesigns, searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastDesign = currentPage * designsPerPage;
  const indexOfFirstDesign = indexOfLastDesign - designsPerPage;
  const currentDesigns = filteredDesigns.slice(
    indexOfFirstDesign,
    indexOfLastDesign
  );

  return (
    <div>
      <NavbarComp />
      <div className="flex">
        <nav className="w-1000 md:w-1/4 bg-light p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-dark">Explore</h2>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="form-label text-sm font-medium text-dark mb-1"
            >
              Category
            </label>
            <select
              id="category"
              className="form-select p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {/* Add category options */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="sortBy"
              className="form-label text-sm font-medium text-dark mb-1"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              className="form-select p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={sortByOption}
              onChange={(e) => setSortByOption(e.target.value)}
            >
              <option value="designName">Design Name</option>
              <option value="authorName">Author Name</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control p-2 border rounded"
              placeholder="Search designs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </nav>

        <div className="w-full md:w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDesigns.map((design) => (
              <DesignCard key={design._id} design={design} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredDesigns.length / designsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              color="primary"
            />
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Designs;
