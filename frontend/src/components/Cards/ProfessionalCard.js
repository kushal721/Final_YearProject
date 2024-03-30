import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
const ProfessionalCard = ({ professional }) => {
  return (
    <div>
      <div className="card">
        <Link to={`/professional-desc/${professional._id}`} className="card">
          <div className="profe-img-container">
            <img src="/r1.png" alt="Design photo" className="profe-img" />
          </div>
          <div className="card-content">
            <div className="header">
              <h5 className="title">{professional.username}</h5>
              <p className="rating">★ 5.0</p>
            </div>
            {/* <p className="short-description">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </p> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfessionalCard;
