// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   console.log(signup, "signup");
//   const signup = async (
//     profile,
//     username,
//     email,
//     contactNumber,
//     password,
//     confirm_password,
//     location,
//     role
//   ) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/user/user-register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             profile,
//             username,
//             email,
//             contactNumber,
//             password,
//             confirm_password,
//             location,
//             role,
//           }),
//         }
//       );
//       const res = await response.json();

//       if (!response.ok) {
//         console.log("Signup response:", res);
//         alert("Signup response", res.msg);
//       }

//       if (response.ok) {
//         console.log("Signup response:", res);

//         alert("Registration successful");
//         navigate("/login");
//       }
//       // const res = await response.json();
//     } catch (error) {
//       setError(error.msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { signup, isLoading, error };
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (
    profile,
    username,
    email,
    contactNumber,
    password,
    confirm_password,
    location,
    role
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("profile", profile);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("contactNumber", contactNumber);
      formData.append("password", password);
      formData.append("confirm_password", confirm_password);
      formData.append("location", location);
      formData.append("role", role);

      const response = await fetch(
        `http://localhost:4000/api/user/user-register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await response.json();

      if (!response.ok) {
        console.log("Signup response:", res);
        alert("Signup response", res.msg);
      }

      if (response.ok) {
        console.log("Signup response:", res);
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError(error.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
