import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComp from "../../components/Navbar/Navbar";
import FooterComp from "../../components/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Description.css";
import RatingComp from "../../components/Rating/RatingComp";

const Description = ({ match }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [designDesc, setDesignDesc] = useState();
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/designs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDesignDesc(data);
        } else {
          console.error("Failed to fetch design");
        }
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    fetchDesign();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/favorites/addFavorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.userId}`,
          },
          body: JSON.stringify({ userId: user.userId, designId: id }),
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
    }
  };

  const reviews = [
    {
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jane Doe",
      review:
        "Sed consequat mauris at purus tempor, a fringilla purus interdum.",
    },
  ];

  return (
    <div>
      <NavbarComp />
      <div className="main-container">
        <div>
          {designDesc && (
            <div className="desc-container">
              <div className="left-side">
                <img src="/r1.png" alt="Design" className="design-image" />
              </div>
              <div className="right-side">
                <h2>{designDesc.designName}</h2>
                <p>{designDesc.designDescription}</p>
                <p className="rating">
                  ★ {designDesc.averageRating}
                  <span>({designDesc.totalRatings})</span>
                </p>
                <p>Designer: Designer Name</p>

                <div className="buttons-container">
                  <button className="fav-btn" onClick={addToFavorites}>
                    Add to Favorites
                  </button>
                  <button
                    className="contact-btn"
                    onClick={() => setShowRatingPopup(true)}
                  >
                    Rate Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="review-section">
          <h3>Customer Reviews</h3>
          {/* Render customer reviews */}
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.name}</h4>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterComp />

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="rating-popup">
          <div className="rating-popup-content">
            <RatingComp
              designId={id}
              userId={user?.userId}
              onClose={() => setShowRatingPopup(false)}
            />
            <button
              className="close-btn"
              onClick={() => setShowRatingPopup(false)}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
