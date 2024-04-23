// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../../../components/Sidebar/Sidebar";
// import { useAuthContext } from "../../../hooks/useAuthContext";
// import "./../../Designs/Description.css";
// import "./MyDesigns.css";
// import EditDesign from "../../../components/Edit/EditDesign";

// const MyDesignDesc = ({ match }) => {
//   const navigate = useNavigate();
//   const { user } = useAuthContext();
//   const { id } = useParams();
//   const [designDesc, setDesignDesc] = useState();

//   const [showEditDesignPopup, setShowEditDesignPopup] = useState(false);
//   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // State to control visibility of confirmation popup
//   const [addComment, setAddComment] = useState("");
//   console.log("iduse", id);
//   console.log("user", user);

//   useEffect(() => {
//     const fetchDesign = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/designs/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user?.token}`,
//             },
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setDesignDesc(data);
//         } else {
//           console.error("Failed to fetch design");
//         }
//       } catch (error) {
//         console.error("Error fetching design:", error);
//       }
//     };

//     fetchDesign();
//   }, [id]);

//   const handleRemoveDesign = async () => {
//     // Display confirmation popup
//     setShowConfirmationPopup(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/designs/mydesigns/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${user?.token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         console.log("Design removed successfully");
//         navigate("/my-designs");
//       } else {
//         console.error("Failed to remove design");
//       }
//     } catch (error) {
//       console.error("Error removing design:", error);
//     }
//   };

//   const handleCancelDelete = () => {
//     // Close confirmation popup
//     setShowConfirmationPopup(false);
//   };

//   const handleEditDesign = () => {
//     setShowEditDesignPopup(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to the server to add professional information
//       const response = await fetch(
//         `http://localhost:4000/api/designs/${id}/comments`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             content: addComment,
//             createdBy: user?.userId,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to add comment");
//       }

//       const data = await response.json();
//       alert("Comment added successfully");
//       console.log("Comment added:", data);
//       // Optionally, you can redirect the user or show a success message
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       // Optionally, you can show an error message to the user
//     }
//   };

//   return (
//     <>
//       <div className="maindiv">
//         <div className="main-container">
//           <div>
//             {designDesc && (
//               <div className="desc-container">
//                 <div className="left-side">
//                   <img src="/r1.png" alt="Design" className="design-image" />
//                 </div>
//                 <div className="right-side">
//                   <div className="button-container">
//                     <button
//                       className="mr-2 btn-black"
//                       onClick={handleEditDesign}
//                     >
//                       Edit Design
//                     </button>
//                     <button className="btn-danger" onClick={handleRemoveDesign}>
//                       Remove Design
//                     </button>
//                   </div>
//                   <h2>{designDesc.designName}</h2>
//                   <p>{designDesc.designDescription}</p>
//                   <p className="rating">
//                     ★ {designDesc.averageRating}
//                     <span>({designDesc.totalRatings})</span>
//                   </p>
//                   <p>Designer: Designer Name</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="review-section">
//             <h3>Customer Reviews</h3>
//             <div className="cmt-main">
//               <form className="cmt-form" onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   id="comment"
//                   name="comment"
//                   value={addComment}
//                   onChange={(e) => setAddComment(e.target.value)}
//                   placeholder="Comment here"
//                 />
//                 <div type="submit" className="btn-addCmt">
//                   <button>Add</button>
//                 </div>
//               </form>
//             </div>

//             {designDesc &&
//               designDesc.comments &&
//               designDesc.comments.map((comment) => (
//                 <div key={comment._id} className="review">
//                   <div className="review-header" >
//                     <h4>Comment by: {comment.commenterName}</h4>
//                     <div>
//                       <button
//                         className="delete-comment-btn"
//                         // onClick={() => handleDeleteComment(comment._id)}
//                       >
//                         ❌
//                       </button>
//                     </div>
//                   </div>
//                   <p>{comment.content}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* Confirmation popup */}
//       {showConfirmationPopup && (
//         <div className="confirmation-popup">
//           <h3>Are you sure you want to delete?</h3>
//           <div className="popup-buttons">
//             <button className="popup-button" onClick={handleConfirmDelete}>
//               Yes
//             </button>
//             <button className="popup-button" onClick={handleCancelDelete}>
//               No
//             </button>
//           </div>
//         </div>
//       )}

//       {showEditDesignPopup && (
//         <div className="edit-design-popup">
//           <EditDesign designId={id} />
//           <button
//             className="close-popup-btn"
//             onClick={() => setShowEditDesignPopup(false)}
//           >
//             ❌
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyDesignDesc;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./../../Designs/Description.css";
import "./MyDesigns.css";
import EditDesign from "../../../components/Edit/EditDesign";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

const MyDesignDesc = ({ match }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [designDesc, setDesignDesc] = useState();

  const [showEditDesignPopup, setShowEditDesignPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // State to control visibility of confirmation popup
  const [addComment, setAddComment] = useState("");
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
      const res = await response.json();
      if (response.ok) {
        toast.success(res.message);

        console.log(res.message);
        navigate("/dashboard/my-designs");
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
      toast.success(data.message);
      console.log("Comment added:", data);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("An error occurred while adding the comment"); // Display error message using toast
      // Optionally, you can show an error message to the user
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/designs/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Remove the deleted comment from the designDesc state
        const updatedComments = designDesc.comments.filter(
          (comment) => comment._id !== commentId
        );
        setDesignDesc((prevDesignDesc) => ({
          ...prevDesignDesc,
          comments: updatedComments,
        }));
        toast.success(data.message);
        console.log("Comment deleted successfully");
      } else {
        toast.error(data.message);
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("An error occurred while deleting the comment"); // Display error message using toast
    }
  };

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
                  {designDesc.designImages.length > 0 && (
                    <img
                      src={`http://localhost:4000/${designDesc.designImages[0]}`}
                      alt={`Image 0`}
                    />
                  )}
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
                  <h2>Name: {designDesc?.designName}</h2>
                  <h2>Category: {designDesc?.designCategory}</h2>
                  <p>Description: {designDesc?.designDescription}</p>
                  <p>Description: {designDesc?.area}</p>
                  <p>Description: {designDesc?.estimateCost}</p>
                  <p className="rating">
                    Rating(★): {designDesc?.averageRating}
                    <span>({designDesc?.totalRatings})</span>
                  </p>
                  <p>Designer: {designDesc?.designer_name}</p>
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
              designDesc.comments &&
              designDesc.comments.map((comment) => (
                <div key={comment._id} className="review">
                  <div className="review-header">
                    <h4>Comment by: {comment.commenterName}</h4>
                    <button
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      ❌
                    </button>
                  </div>
                  <p className="review-content">{comment.content}</p>
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
