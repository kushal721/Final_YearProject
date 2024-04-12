import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import "./../../Designs/Description.css";

import { Sidebar } from "flowbite-react";

const MyDesignDesc = ({ match }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [designDesc, setDesignDesc] = useState();
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  console.log("iduse", id);
  console.log("user", user);

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
      <div>
        <Sidebar />
      </div>
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
    </div>
  );
};

export default MyDesignDesc;
