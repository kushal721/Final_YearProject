import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (username, email, password, confirm_password, role) => {
    setIsLoading(true);
    setError(null);

    try {
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

      if (!response.ok) {
        console.log("Signup response:", res);
        alert("Signup response", res.msg);
      }

      if (response.ok) {
        console.log("Signup response:", res);

        alert("Registration successful");
        navigate("/login");
      }
      // const res = await response.json();
    } catch (error) {
      setError(error.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
