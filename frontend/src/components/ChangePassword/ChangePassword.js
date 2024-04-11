// import React, { useState } from "react";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import "./ChangePassword.css";

// const ChangePassword = () => {
//   const { user } = useAuthContext();

//   const [formData, setFormData] = useState({
//     userId: user?.userId,
//     currentPassword: "",
//     newPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/user/user-changePassword",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         alert("Failed to change password: " + errorData.message);
//         console.error("Failed to change password:", errorData.message);
//         return;
//       }

//       const responseData = await response.json();
//       alert("Password changed successfully");
//     } catch (error) {
//       console.error("Error changing password:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2 className="change-password-title">Change Password</h2>
//       <div className="container">
//         <form onSubmit={handleSubmit} className="change-pass-form">
//           <div className="form-group">
//             <label htmlFor="currentPassword" className="label">
//               Current Password:
//             </label>
//             <input
//               className="input-field"
//               type="password"
//               id="currentPassword"
//               name="currentPassword"
//               value={formData.currentPassword}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="newPassword" className="label">
//               New Password:
//             </label>
//             <input
//               className="input-field"
//               type="password"
//               id="newPassword"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary submit-btn">
//             Change Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;

import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./ChangePassword.css";

const ChangePassword = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    userId: user?.userId,
    currentPassword: "",
    newPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/user/user-changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData.message);
        setAlertType("danger");
        return;
      }

      setAlertMessage("Password changed successfully");
      setAlertType("success");
    } catch (error) {
      console.error("Error changing password:", error.message);
      setAlertMessage("An error occurred while changing the password");
      setAlertType("danger");
    }
  };

  return (
    <div>
      <h2 className="change-password-title">Change Password</h2>
      <div className="container">
        <form onSubmit={handleSubmit} className="change-pass-form">
          <div className="form-group">
            <label htmlFor="currentPassword" className="label">
              Current Password:
            </label>
            <input
              className="input-field"
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="label">
              New Password:
            </label>
            <input
              className="input-field"
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            Change Password
          </button>
          {alertMessage && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
