import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
const EditDesign = () => {
  const { user } = useAuthContext();
  const { designId } = useParams(); // Get the design ID from the URL params
  const [design, setDesign] = useState({});
  const [formData, setFormData] = useState({
    designName: "",
    area: "",
    estimateCost: "",
    designDescription: "",
    // Add other fields as needed
  });
  console.log("design Idd", designId);

  // Fetch the design data by its ID
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/designs/${designId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDesign(data);
          setFormData({
            designName: data.designName,
            area: data.area,
            estimateCost: data.estimateCost,
            designDescription: data.designDescription,
            // Update other fields as needed
          });
        } else {
          console.error("Failed to fetch design");
        }
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    fetchDesign();
  }, [designId]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to update the design
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/designs/mydesigns/${designId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Design updated successfully!");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to update design: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating design:", error);
      alert("An error occurred while updating design");
    }
  };

  return (
    <div>
      <h2>Edit Design</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Design Name:</label>
          <input
            type="text"
            name="designName"
            value={formData.designName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Estimate Cost:</label>
          <input
            type="number"
            name="estimateCost"
            value={formData.estimateCost}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Design Description:</label>
          <textarea
            name="designDescription"
            value={formData.designDescription}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other form fields as needed */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditDesign;
