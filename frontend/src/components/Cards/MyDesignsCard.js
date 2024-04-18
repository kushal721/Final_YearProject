import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const MyDesignCard = ({ my_design, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleRemoveDesign = async () => {
    setShowConfirmationPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/designs/mydesigns/${my_design._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Design removed successfully");
        setShowConfirmationPopup(false);
        onDelete(my_design._id);
      } else {
        console.error("Failed to remove design");
      }
    } catch (error) {
      console.error("Error removing design:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationPopup(false);
  };
  console.log("my design", my_design.designImages[0]);

  return (
    <div>
      <Link to={`/dashboard/mydesign-desc/${my_design._id}`} className="card">
        {my_design.designImages.length > 0 && (
          <img
            src={`http://localhost:4000/${my_design.designImages[0]}`}
            alt={`Image 0`}
          />
        )}
        <span className="design-name">{my_design.designName}</span> <br />
      </Link>
      <span className="design-actions">
        <button className="edit-button">Edit</button> <br />
        <button className="btn-danger" onClick={handleRemoveDesign}>
          Delete
        </button>
      </span>

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
    </div>
  );
};

export default MyDesignCard;

// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import "./card.css";

// const MyDesignCard = ({ my_design }) => {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [updatedDesignName, setUpdatedDesignName] = useState(
//     my_design.designName
//   );
//   const [updatedDesignDescription, setUpdatedDesignDescription] = useState(
//     my_design.designDescription
//   );
//   const [updatedArea, setUpdatedArea] = useState(my_design.area);
//   const [updatedEstimateCost, setUpdatedEstimateCost] = useState(
//     my_design.estimateCost
//   );

//   const handleEdit = () => {
//     setShowEditModal(true);
//   };

//   const handleClose = () => {
//     setShowEditModal(false);
//   };

//   const handleSave = () => {
//     // Implement save functionality here
//     console.log("Updated Design Name:", updatedDesignName);
//     console.log("Updated Design Description:", updatedDesignDescription);
//     console.log("Updated Area:", updatedArea);
//     console.log("Updated Estimate Cost:", updatedEstimateCost);
//     setShowEditModal(false);
//   };

//   return (
//     <>
//       <div className="design-card-container">
//         {/* Render design details */}
//         <img src="/r1.png" alt="Design photo" />
//         <span className="design-name">{my_design.designName}</span> <br />
//         <span className="design-actions">
//           <button className="edit-button" onClick={handleEdit}>
//             Edit
//           </button>{" "}
//           <br />
//           <button className="delete-button">Delete</button>
//         </span>
//       </div>

//       {/* Edit Design Modal */}
//       <Modal
//         show={showEditModal}
//         onHide={handleClose}
//         centered
//         dialogClassName="edit-design-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Design</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="mb-3">
//               <label htmlFor="designName">Design Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="designName"
//                 value={updatedDesignName}
//                 onChange={(e) => setUpdatedDesignName(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="designDescription">Design Description:</label>
//               <textarea
//                 className="form-control"
//                 id="designDescription"
//                 value={updatedDesignDescription}
//                 onChange={(e) => setUpdatedDesignDescription(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="area">Area:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="area"
//                 value={updatedArea}
//                 onChange={(e) => setUpdatedArea(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="estimateCost">Estimate Cost:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="estimateCost"
//                 value={updatedEstimateCost}
//                 onChange={(e) => setUpdatedEstimateCost(e.target.value)}
//               />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default MyDesignCard;
