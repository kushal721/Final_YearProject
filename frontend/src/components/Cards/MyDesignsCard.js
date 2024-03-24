import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const MyDesignCard = ({ my_design }) => {
  console.log("My Design Data:", my_design); // Log the value of my_design
  
  
  return (
    <div>
      {/* Render design details */}
      <img src="/r1.png" alt="Design photo" />
      <span className="design-name">{my_design.designName}</span> <br />
      <span className="design-actions">
        <button className="edit-button">Edit</button> <br />
        <button className="delete-button">Delete</button>
      </span>
    </div>
  );
};


export default MyDesignCard;
