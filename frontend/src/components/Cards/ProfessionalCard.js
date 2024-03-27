import React from "react";
import "./card.css";
const ProfessionalCard = () => {
  return (
    <div>
      <div className="card">
        <div className="profe-img-container">
          <img src="/r1.png" alt="Design photo" className="profe-img" />
        </div>
        <div className="card-content">
          <div className="header">
            <h5 className="title">Professional Name</h5>
            <p className="rating">★ 5.0</p>
          </div>
          {/* <p className="short-description">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </p> */}
          <p className="message-now">Message Now</p>
          <button className="btn-book-appoint">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
