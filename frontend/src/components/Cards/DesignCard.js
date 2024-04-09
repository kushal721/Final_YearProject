// import React from "react";
// import { Link } from "react-router-dom";
// import "./card.css";

// const DesignCard = ({ design }) => {
//   return (
//     <div>
//       <Link to={`/design-desc/${design._id}`} className="card">
//         <div className="img-container">
//           <img src="/r1.png" alt="Design photo" className="card-img" />
//         </div>
//         <div className="card-content">
//           <div className="header">
//             <h5 className="title">{design.designName}</h5>
//             <p className="rating">★ {design.rating}</p>
//           </div>
//           <p className="short-description">{design.designDescription}</p>
//           <p className="designer">Designed by {design._id}</p>
//         </div>
//       </Link>
//       <button className="fav-btn">Add to Favorites</button>
//     </div>
//   );
// };

// export default DesignCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const DesignCard = ({ design }) => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const { user } = useAuthContext(); // Access the user authentication state

  const addToFavorites = async () => {
    setIsAddingToFavorites(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/favorites/addFavorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace YOUR_AUTH_TOKEN with the actual authentication token
          },
          body: JSON.stringify({ userId: user.userId, designId: design._id }), // Replace YOUR_USER_ID with the actual user ID
        }
      );

      if (response.ok) {
        alert("Design added to favorites!");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to add design to favorites: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error adding design to favorites:", error);
      alert("An error occurred while adding design to favorites");
    } finally {
      setIsAddingToFavorites(false);
    }
  };

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
      <button
        className="fav-btn"
        onClick={addToFavorites}
        disabled={isAddingToFavorites}
      >
        {isAddingToFavorites ? "Adding to Favorites..." : "Add to Favorites"}
      </button>
    </div>
  );
};

export default DesignCard;
