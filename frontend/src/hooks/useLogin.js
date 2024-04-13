import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/api/user/user-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await response.json();
    console.log("Login response:", res);

    if (!response.ok) {
      setIsLoading(false);
      setError(res.error);
    } else {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(res));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: res });
      console.log("Payload:", res);

      // Check user role and navigate accordingly
      if (res.role === "professional") {
        navigate("/my-designs");
      } else if (res.role === "client") {
        navigate("/");
      }
      alert("login successful "); 

      // Update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
