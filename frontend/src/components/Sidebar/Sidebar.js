import { Link, Navigate, useNavigate } from "react-router-dom"; // Import Navigate
import "./Sidebar.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    logout();
    navigate("/"); // Navigate to the home page after logging out
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Construction Professional Nepal</h1>
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/my-designs" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-home"></i>
              </span>
              <span className="sidebar-text">MyDesigns</span>
            </Link>
          </li>
          <li>
            <Link to="/profe-appointments" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-music"></i>
              </span>
              <span className="sidebar-text">Appointments</span>
            </Link>
          </li>
          <li>
            <Link to="/add-designs" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-music"></i>
              </span>
              <span className="sidebar-text">Add Designs</span>
            </Link>
          </li>
          <li>
            <Link to="/addAppointment" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-music"></i>
              </span>
              <span className="sidebar-text">Add Appointment</span>
            </Link>
          </li>
          <li>
            <Link to="/profe-profile" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-music"></i>
              </span>
              <span className="sidebar-text">Profile</span>
            </Link>
          </li>
          <div className="logout">
            {user && (
              <div>
                <h2 style={{ backgroundColor: "white" }}>{user.email}</h2>{" "}
                {/* Correct the inline style syntax */}
                <h2 style={{ backgroundColor: "white" }}>{user.role}</h2>
                <button style={{ color: "white" }} onClick={handleClick}>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* <Link to="/" className="sidebar-link">
              <span className="sidebar-icon">
                <i className="bx bx-music"></i>
              </span>
              <span className="sidebar-text">Logout</span>
            </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
