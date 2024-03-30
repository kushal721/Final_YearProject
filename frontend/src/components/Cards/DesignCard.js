import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const DesignCard = ({ design }) => {
  return (
    <div>
      <Link to={`/design-desc/${design._id}`} className="card">
        <div className="img-container">
          <img src="/r1.png" alt="Design photo" className="card-img" />
        </div>
        <div className="card-content">
          <div className="header">
            <h5 className="title">{design.designName}</h5>
            <p className="rating">★ {design.rating}</p>
          </div>
          <p className="short-description">{design.designDescription}</p>
          <p className="designer">Designed by {design._id}</p>
        </div>
      </Link>
      <button className="fav-btn">Add to Favorites</button>
    </div>
  );
};

export default DesignCard;
