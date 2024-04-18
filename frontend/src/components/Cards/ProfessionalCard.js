import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { useAuthContext } from "../../hooks/useAuthContext";
const ProfessionalCard = ({ professional }) => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="card">
        <Link to={`/professional-desc/${professional?._id}`} className="card">
          <div className="profe-img-container">
            {/* <img src="/r1.png" alt="Design photo" className="profe-img" /> */}
            {professional?.profile?.length > 0 ? (
              <img
                src={`http://localhost:4000/${professional?.profile}`}
                alt="Profile Picture"
                className="profile-image"
              />
            ) : (
              <img
                src="./profile.png"
                alt="Profile Picture"
                className="profile-image"
              />
            )}
          </div>
          <div className="card-content">
            <div className="header">
              <h5 className="title">{professional?.username}</h5>
              <p className="">Location: {professional?.location}</p>
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
