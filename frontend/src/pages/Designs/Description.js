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
  console.log("iddd", id);

  const [designDesc, setDesignDesc] = useState();
  // const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  console.log("design desc", designDesc);
  console.log("addComment", addComment);

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

  // useEffect(() => {
  //   const fetchComment = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4000/api/designs/${id}/comments`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setComments(data);
  //       } else {
  //         console.error("Failed to fetch comments");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching design:", error);
  //     }
  //   };

  //   fetchComment();
  // }, [id]);

  const addToFavorites = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/favorites/addFavorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.userId}`,
          },
          body: JSON.stringify({ userId: user?.userId, designId: id }),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to add professional information
      const response = await fetch(
        `http://localhost:4000/api/designs/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            content: addComment,
            createdBy: user?.userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      alert("Comment added successfully");
      console.log("Comment added:", data);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error adding comment:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div>
      <div className="main-container">
        <div>
          {designDesc && ( // Conditionally render when designDesc is available
            <div className="desc-container">
              <div className="left-side">
                {designDesc.designImages.length > 0 && (
                  <img
                    src={`http://localhost:4000/${designDesc.designImages[0]}`}
                    alt={`Image 0`}
                  />
                )}
              </div>
              <div className="right-side">
                <h2>Name: {designDesc.designName}</h2>
                <h2>Category: {designDesc.designCategory}</h2>
                <p>Description: {designDesc.designDescription}</p>
                <p className="rating">
                  ★ {designDesc.averageRating}
                  <span>({designDesc.totalRatings})</span>
                </p>
                {/* Add logic to display designer name */}
                <p>Designer: {designDesc.designer_name}</p>

                <div className="buttons-container">
                  <button className="fav-btn" onClick={addToFavorites}>
                    Add to Favorites
                  </button>
                  <button
                    style={{ margin: "5px", background: "orange" }}
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
          <div className="cmt-main">
            <form className="cmt-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="comment"
                name="comment"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                placeholder="Comment here"
              />
              <div type="submit" className="btn-addCmt">
                <button>Add</button>
              </div>
            </form>
          </div>

          {designDesc &&
            designDesc.comments && // Conditionally render when designDesc and comments are available
            designDesc.comments.map((comment) => (
              <div key={comment._id} className="review">
                <h4>Comment by: {comment.commenterName}</h4>
                <p>{comment.content}</p>
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
