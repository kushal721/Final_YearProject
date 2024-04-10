import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AddDesigns.css";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const AddDesigns = () => {
  const { user } = useAuthContext(); // Access the user authentication state
  const [designData, setDesignData] = useState({
    designName: "",
    area: "",
    estimateCost: "",
    designDescription: "",
  });
  console.log("des", designData);

  const [error, setError] = useState(""); // State variable to hold error message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDesignData({
      ...designData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDesignData({
      ...designData,
      selectedFiles: [...designData.selectedFiles, ...files],
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...designData.selectedFiles];
    updatedFiles.splice(index, 1);
    setDesignData({
      ...designData,
      selectedFiles: updatedFiles,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...designData };

      const response = await fetch(
        "http://localhost:4000/api/designs/adddesign",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // Include the authentication token in the request headers
          },
        }
      );
      // Check if the user is authenticated before rendering the component
      if (!user) {
        return <Navigate to="/login" />; // Redirect to login page if user is not authenticated
      }

      if (response.ok) {
        alert("Designs uploaded successfully!");
        console.log("Designs uploaded successfully!");
      } else {
        const errorData = await response.json(); // Get error message from response body
        setError(errorData.message); // Set error message state
        console.log("Failed to upload design");
      }
    } catch (error) {
      console.error("Error uploading designs:", error);
      setError("Failed to upload designs. Please try again."); // Generic error message
    }
  };

  return (
    <div className="my-designs-container">
      <Sidebar />
      <div className="content">
        <div className="page-name">
          <h1 className="page-title">Add New Designs</h1>
        </div>
        <form className="add-design-form" onSubmit={handleSubmit}>
          <h1 className="design-details-title">Design Details</h1>
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="designName">Design Name:</label>
              <input
                type="text"
                id="designName"
                name="designName"
                value={designData.designName}
                onChange={handleInputChange}
                placeholder="Enter design name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="designDescription">Design Description:</label>
              <textarea
                id="designDescription"
                name="designDescription"
                value={designData.designDescription}
                onChange={handleInputChange}
                placeholder="Enter design description"
              ></textarea>
            </div>
          </div>
          <div className="right-column">
            <div className="form-group">
              <label htmlFor="area">Area:</label>
              <input
                type="text"
                id="area"
                name="area"
                value={designData.area}
                onChange={handleInputChange}
                placeholder="Enter area"
              />
            </div>
            <div className="form-group">
              <label htmlFor="estimateCost">Estimate Cost:</label>
              <input
                type="text"
                id="estimateCost"
                name="estimateCost"
                value={designData.estimateCost}
                onChange={handleInputChange}
                placeholder="Enter estimate cost"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="designFile" className="upload-img-title">
              Upload Design Images:
            </label>
            <input
              type="file"
              id="designFile"
              name="designFile"
              multiple
              onChange={handleFileChange}
            />
            {/* <div className="selected-files">
              {designData.selectedFiles.map((file, index) => (
                <div key={index} className="selected-file">
                  <span>{file.name}</span>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFile(index)}
                  >
                    ✖️
                  </button>
                </div>
              ))}
            </div> */}
          </div>
          <div className="btn-upload">
            <button className="upload-button">Upload Design</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDesigns;
