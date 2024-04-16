import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarComp from "../../components/Navbar/Navbar";
import { useSignup } from "../../hooks/useSignup";

const Registration = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const [inpval, setInpval] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "client",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevInpval) => ({
      ...prevInpval,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(
        inpval.username,
        inpval.email,
        inpval.password,
        inpval.confirm_password,
        inpval.role
      );
    } catch (error) {
      // If signup fails, display error message
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <>
      <section className="login-signup-section">
        <div className="form_data">
          <div className="form_heading">
            <h1> Signup</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.username}
                name="username"
                id="username"
                placeholder="Enter your Name"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Email Address"
                required
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

              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.confirm_password}
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <label>Role:</label>
            <select value={inpval.role} onChange={setVal} name="role">
              <option value="client">Client</option>
              <option value="professional">Professional</option>
            </select>

            {/* <button className="btn" onClick={addUserdata}>
              Signup
            </button> */}
            <button className="btn" disabled={isLoading}>
              Signup
            </button>

            <p>
              Already have an Account? <NavLink to="/login">Login</NavLink>
            </p>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Registration;
