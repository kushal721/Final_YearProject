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
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import "./ChangePassword.css";

const ChangePassword = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    userId: user?.userId,
    currentPassword: "",
    newPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
        toast.error(errorData.message); // Display error message using toast
        return;
      }

      toast.success("Password changed successfully"); // Display success message using toast
    } catch (error) {
      console.error("Error changing password:", error.message);
      toast.error("An error occurred while changing the password"); // Display error message using toast
    }
  };

  return (
    <div>
      <h2 className="change-password-title">Change Password</h2>
      <div className="change-password-container">
        <form onSubmit={handleSubmit} className="change-pass-form">
          <div className="form-group">
            <label htmlFor="currentPassword" className="label">
              Current Password:
            </label>
            <div className="password-toggle">
              <input
                className="input-field"
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleToggleCurrentPassword}
                className="toggle-btn"
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="label">
              New Password:
            </label>
            <div className="password-toggle">
              <input
                className="input-field"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleToggleNewPassword}
                className="toggle-btn"
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
