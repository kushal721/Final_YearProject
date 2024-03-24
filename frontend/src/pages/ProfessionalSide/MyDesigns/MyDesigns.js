// MyDesigns.js

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./MyDesigns.css"; // Import the CSS for MyDesigns
import MyDesignCard from "../../../components/Cards/MyDesignsCard";

const MyDesigns = () => {
  const [my_designs, setMy_Designs] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/designs/");
        if (response.ok) {
          const data = await response.json();
          setMy_Designs(data); // Set designs with fetched data
          console.log(data);
        } else {
          console.error("Failed to fetch designs");
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };
    fetchDesigns();
  }, []);

  console.log("my designs: ", my_designs);

  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="search-box">
          <input type="text" placeholder="Search designs..." />
          <button>Search</button>
        </div>
        <div className="page-name">
          <h1 className="page-title">My Designs</h1>
        </div>
        <div className="designs">
        {my_designs.map((my_design) => (
                <div key={my_design._id}>
                  <MyDesignCard my_design={my_design} />
                  {/* <Description design={design} /> */}
                </div>
              ))}
          {/* <div className="design">
            <img src="/r1.png" alt="Design photo" />
            <span className="design-name">Design Name</span> <br />
            <span className="design-actions">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyDesigns;
