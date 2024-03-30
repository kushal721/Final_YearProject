import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./MyDesigns.css"; // Import the CSS for MyDesigns
import MyDesignCard from "../../../components/Cards/MyDesignsCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const MyDesigns = () => {
  const [my_designs, setMy_Designs] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        // const user = user;
        console.log("this is user", user);

        // if (!user || !user.token) {
        //   console.error("User not authenticated");
        //   // Handle unauthenticated user (e.g., redirect to login page)
        //   return;
        // }

        const response = await fetch(
          "http://localhost:4000/api/designs/my-designs",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMy_Designs(data); // Set designs with fetched data
          // console.log(data);
        } else {
          console.error("Failed to fetch designs");
        }
      } catch (error) {
        console.error("Error fetching desagns:", error);
      }
    };
    fetchDesigns();
  }, [user]); // Include user in the dependency array to re-fetch designs when user changes

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
