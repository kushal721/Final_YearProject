import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./../../Designs/Description.css";
import "./MyDesigns.css";
import EditDesign from "../../../components/Edit/EditDesign";

const MyDesignDesc = ({ match }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [designDesc, setDesignDesc] = useState();

  const [showEditDesignPopup, setShowEditDesignPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // State to control visibility of confirmation popup

  console.log("iduse", id);
  console.log("user", user);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/designs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
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

  const handleRemoveDesign = async () => {
    // Display confirmation popup
    setShowConfirmationPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/designs/mydesigns/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Design removed successfully");
        navigate("/my-designs");
      } else {
        console.error("Failed to remove design");
      }
    } catch (error) {
      console.error("Error removing design:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close confirmation popup
    setShowConfirmationPopup(false);
  };

  const handleEditDesign = () => {
    setShowEditDesignPopup(true);
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
    <>
      <div className="maindiv">
        <div className="sidebar">
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
                  <div className="button-container">
                    <button
                      className="mr-2 btn-black"
                      onClick={handleEditDesign}
                    >
                      Edit Design
                    </button>
                    <button className="btn-danger" onClick={handleRemoveDesign}>
                      Remove Design
                    </button>
                  </div>
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

            {reviews.map((review, index) => (
              <div key={index} className="review">
                <h4>{review.name}</h4>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation popup */}
      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <h3>Are you sure you want to delete?</h3>
          <div className="popup-buttons">
            <button className="popup-button" onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className="popup-button" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {showEditDesignPopup && (
        <div className="edit-design-popup">
          <EditDesign designId={id} />
          <button
            className="close-popup-btn"
            onClick={() => setShowEditDesignPopup(false)}
          >
            ❌
          </button>
        </div>
      )}
    </>
  );
};

export default MyDesignDesc;
