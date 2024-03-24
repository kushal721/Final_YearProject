import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate

  const signup = async (username, email, password, confirm_password, role) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/user/user-register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password,
          role,
        }),
      }
    );

    const res = await response.json();
    console.log("Signup response:", res);
    alert("Registration successful");
    navigate("/login")

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(res.error);
    // }

    // if (response.ok) {
    //   // Save the user to local storage
    //   localStorage.setItem("user", JSON.stringify(res));

    //   // Update the auth context
    //   dispatch({ type: "LOGIN", payload: res });
      
    //   // Check user role and navigate accordingly
    //   if (res.role === "professional") {
    //     navigate("/my-designs");
    //   } else if (res.role === "client") {
    //     navigate("/");
    //   }

    //   setIsLoading(false);
    // }
  };

  return { signup, isLoading, error };
};
