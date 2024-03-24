import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./../mix.css";
import NavbarComp from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";

import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {login, error, isLoading} = useLogin()

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevInpval) => ({ ...prevInpval, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(inpval.email, inpval.password)
  }

  // const loginuser = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = inpval;

  //   if (!email || !email.includes("@")) {
  //     alert("Please enter a valid email");
  //     return;
  //   }

  //   if (!password || password.length < 6) {
  //     alert("Password must be at least 6 characters");
  //     return;
  //   }

  //   try {
  //     const data = await fetch("http://localhost:4000/api/user/user-login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!data.ok) {
  //       throw new Error(`HTTP error! Status: ${data.status}`);
  //     }

  //     const res = await data.json();
  //     console.log("Login response:", res);

  //     if (res.token) {
        
  //       Cookies.set("usersdatatoken", res.token, { expires: 7 }); // Set cookie with expiry of 7 days
        
  //       alert("Login successful");
  //       if(res.role === "professional") {
  //         navigate("/my-designs");
  //       }
  //       else if(res.role === "client") {
  //         navigate("/");
  //       }
        
  //     } else {
  //       alert("Login failed. Please check your credentials.");
  //     }
      
      
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     alert(`Error during login: ${error.message}`);
  //   } finally {
  //     setInpval({ email: "", password: "" });
  //   }
  // };

  return (
    <>
      <NavbarComp />
      <section className="login-signup-section">
        <div className="form_data">
          <div className="form_heading">
            <h1> Login</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Email Address"
              />

              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            {/* <button className="btn" onClick={loginuser}>
              Login
            </button> */}
            <button className="btn" disabled={isLoading} >
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <br />
            <NavLink to="/reset-password">Forgot Password?</NavLink>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
