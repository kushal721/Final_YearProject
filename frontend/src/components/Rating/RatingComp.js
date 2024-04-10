import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const RatingComp = ({ designId, onClose }) => {
  const [rating, setRating] = useState(0);
  const { user } = useAuthContext();

  const handleRatingSubmit = async () => {
    try {
      if (!user) {
        console.error("User object does not exist");
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/designs/addrating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            designId: designId,
            userId: user.userId,
            ratingValue: rating,
          }),
        }
      );

      if (response.ok) {
        alert("Rating submitted successfully!");
        onClose(); // Close the rating popup
      } else {
        const errorMessage = await response.text();
        alert(`Failed to submit rating: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting rating");
    }
  };

  return (
    <>
      <div>
        <div>
          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <span
                key={star}
                className="star"
                style={{
                  cursor: "pointer",
                  color: rating >= star ? "gold" : "gray",
                  fontSize: `35px`,
                }}
                onClick={() => {
                  setRating(star);
                }}
              >
                ★
              </span>
            );
          })}
        </div>
        <button onClick={handleRatingSubmit}>Submit Rating</button>
      </div>
    </>
  );
};

export default RatingComp;
