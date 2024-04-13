// import React, { useCallback, useState } from "react";
// import Sidebar from "../../../components/Sidebar/Sidebar";
// import "./AddDesigns.css";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../../../hooks/useAuthContext";
// import { Navigate } from "react-router-dom";

// const AddDesigns = () => {
//   const { user } = useAuthContext(); // Access the user authentication state
//   const [designData, setDesignData] = useState({
//     designName: "",
//     area: "",
//     estimateCost: "",
//     designDescription: "",
//     photos: [], // Initialize photos array
//   });
//   console.log("des", designData);

//   const [error, setError] = useState(""); // State variable to hold error message

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = { ...designData };

//       const response = await fetch(
//         "http://localhost:4000/api/designs/adddesign",
//         {
//           method: "POST",
//           body: JSON.stringify(formData),
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`, // Include the authentication token in the request headers
//           },
//         }
//       );
//       // Check if the user is authenticated before rendering the component
//       if (!user) {
//         return <Navigate to="/login" />; // Redirect to login page if user is not authenticated
//       }

//       if (response.ok) {
//         alert("Designs uploaded successfully!");
//         console.log("Designs uploaded successfully!");
//       } else {
//         const errorData = await response.json(); // Get error message from response body
//         setError(errorData.message); // Set error message state
//         console.log("Failed to upload design");
//       }
//     } catch (error) {
//       console.error("Error uploading designs:", error);
//       setError("Failed to upload designs. Please try again."); // Generic error message
//     }
//   };
//   const handleInputChange = useCallback((e) => {
//     const { name, value, files } = e.target;
//     if (name === "photos") {
//       setDesignData((prevFormData) => ({
//         ...prevFormData,
//         photos: [...prevFormData.photos, ...Array.from(files)],
//       }));
//     } else {
//       setDesignData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   }, []);

//   const handleRemovePhoto = useCallback((index) => {
//     setDesignData((prevFormData) => {
//       const updatedPhotos = [...prevFormData.photos];
//       updatedPhotos.splice(index, 1);
//       return {
//         ...prevFormData,
//         photos: updatedPhotos,
//       };
//     });
//   }, []);

//   return (
//     <div className="my-designs-container">
//       <div>
//         <Sidebar />
//       </div>

//       <div className="content">
//         <div className="page-name">
//           <h1 className="page-title">Add New Designs</h1>
//         </div>
//         <form className="add-design-form" onSubmit={handleSubmit}>
//           <h1 className="design-details-title">Design Details</h1>
//           <div className="left-column">
//             <div className="form-group">
//               <label htmlFor="designName">Design Name:</label>
//               <input
//                 type="text"
//                 id="designName"
//                 name="designName"
//                 value={designData.designName}
//                 onChange={handleInputChange}
//                 placeholder="Enter design name"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="designDescription">Design Description:</label>
//               <textarea
//                 id="designDescription"
//                 name="designDescription"
//                 value={designData.designDescription}
//                 onChange={handleInputChange}
//                 placeholder="Enter design description"
//               ></textarea>
//             </div>
//           </div>
//           <div className="right-column">
//             <div className="form-group">
//               <label htmlFor="area">Area:</label>
//               <input
//                 type="text"
//                 id="area"
//                 name="area"
//                 value={designData.area}
//                 onChange={handleInputChange}
//                 placeholder="Enter area"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="estimateCost">Estimate Cost:</label>
//               <input
//                 type="text"
//                 id="estimateCost"
//                 name="estimateCost"
//                 value={designData.estimateCost}
//                 onChange={handleInputChange}
//                 placeholder="Enter estimate cost"
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Upload Photos:</label>
//             <input
//               type="file"
//               className="form-control-file"
//               name="photos"
//               multiple
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="uploaded-photos">
//             {designData.photos &&
//               designData.photos.map((photo, index) => (
//                 <div key={index} className="uploaded-photo">
//                   <img
//                     src={URL.createObjectURL(photo)}
//                     alt={`Photo ${index}`}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={() => handleRemovePhoto(index)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//           </div>
//           <div className="btn-upload">
//             <button className="upload-button">Upload Design</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDesigns;

import React, { useCallback, useState } from "react";
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
    designImages: [], // Initialize photos array
  });
  const [error, setError] = useState(""); // State variable to hold error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the user is authenticated before rendering the component
      if (!user) {
        return <Navigate to="/login" />; // Redirect to login page if user is not authenticated
      }

      const formData = {
        designName: designData.designName,
        area: designData.area,
        estimateCost: designData.estimateCost,
        designDescription: designData.designDescription,
        designImages: designData.designImages,
      };
      console.log("formData: ", formData);

      const response = await fetch(
        "http://localhost:4000/api/designs/adddesign",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Include the authentication token in the request headers
          },
        }
      );

      if (response.ok) {
        toast.success("Designs uploaded successfully!");
        console.log("Designs uploaded successfully!");
      } else {
        const errorData = await response.json(); // Get error message from response body
        setError(errorData.error || "Failed to upload design");
        console.log("Failed to upload design");
      }
    } catch (error) {
      console.error("Error uploading designs:", error);
      setError("Failed to upload designs. Please try again."); // Generic error message
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      // Convert selected files to Base64
      const fileArray = Array.from(files);
      Promise.all(
        fileArray.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        })
      ).then((base64Array) => {
        setDesignData((prevFormData) => ({
          ...prevFormData,
          designImages: [...prevFormData.designImages, ...base64Array],
        }));
      });
    } else {
      setDesignData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }, []);

  const handleRemovePhoto = useCallback((index) => {
    setDesignData((prevFormData) => {
      const updatedPhotos = [...prevFormData.designImages];
      updatedPhotos.splice(index, 1);
      return {
        ...prevFormData,
        designImages: updatedPhotos,
      };
    });
  }, []);

  return (
    <div className="my-designs-container">
      <div>
        <Sidebar />
      </div>

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
            <label>Upload Photos:</label>
            <input
              type="file"
              className="form-control-file"
              name="photos"
              multiple
              onChange={handleInputChange}
            />
          </div>
          <div className="uploaded-photos">
            {designData.designImages &&
              designData.designImages.map((designImage, index) => (
                <div key={index} className="uploaded-photo">
                  <img
                    src={URL.createObjectURL(designImage)}
                    alt={`Photo ${index}`}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className="btn-upload">
            <button type="submit" className="upload-button">
              Upload Design
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default AddDesigns;
