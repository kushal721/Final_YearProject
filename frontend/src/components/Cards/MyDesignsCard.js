import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const MyDesignCard = ({ my_design }) => {
  console.log("My Design Data:", my_design); // Log the value of my_design

  return (
    <div>
      {/* Render design details */}
      <Link to={`/mydesign-desc/${my_design._id}`} className="card">
        <img src="/r1.png" alt="Design photo" />
        <span className="design-name">{my_design.designName}</span> <br />
      </Link>
      <span className="design-actions">
        <button className="edit-button">Edit</button> <br />
        <button className="delete-button">Delete</button>
      </span>
    </div>
  );
};
// {/* <Link to={`/design-desc/${design._id}`} className="card">
//         <div className="img-container">
//           <img src="/r1.png" alt="Design photo" className="card-img" />
//         </div>
//         <div className="card-content">
//           <div className="header">
//             <h5 className="title">{design.designName}</h5>
//             <p className="rating">★ {design.averageRating}</p>
//           </div>
//           <p className="short-description">{design.designDescription}</p>
//           <p className="designer">Designed by {design._id}</p>
//         </div>
//       </Link> */}
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
