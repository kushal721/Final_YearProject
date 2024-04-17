// import { NavLink } from "react-router-dom";
// import { Button, Navbar } from "flowbite-react";
// import { useLogout } from "../../hooks/useLogout";
// import { useAuthContext } from "../../hooks/useAuthContext";

// function NavbarComp() {
//   const { logout } = useLogout();
//   const { user } = useAuthContext();

//   const handleClick = () => {
//     logout();
//   };

//   return (
//     <Navbar fluid rounded style={{ marginTop: "20px" }}>
//       <Navbar.Brand as={NavLink} to="/" className="text-center">
//         <span className="self-center text-2xl font-semibold dark:text-white">
//           Construction Professionals Nepal
//         </span>
//       </Navbar.Brand>

//       <div className="flex md:order-2">
//         {user && (

//           <div>
//             <span>{user.email}</span>
//             <Button style={{ backgroundColor: "blue" }} onClick={handleClick}>
//               Logout
//             </Button>
//           </div>
//         )}
//         {!user && (
//           <NavLink to="/login">
//             <Button style={{ backgroundColor: "blue" }}>Login</Button>
//           </NavLink>
//         )}

//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link as={NavLink} to="/" exact="true">
//           <span className="text-lg">Home</span>
//         </Navbar.Link>
//         <Navbar.Link as={NavLink} to="/designs">
//           <span className="text-lg">Designs</span>
//         </Navbar.Link>
//         <Navbar.Link as={NavLink} to="/professionals">
//           <span className="text-lg">Professionals</span>
//         </Navbar.Link>
//         {!user && (
//           <Navbar.Link as={NavLink} to="/contact">
//             <span className="text-lg">Contact Us</span>
//           </Navbar.Link>
//         )}
//         {user && (
//           <Navbar.Link as={NavLink} to="/favorite">
//             <span className="text-lg">Favorite</span>
//           </Navbar.Link>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

// export default NavbarComp;
import { useNavigate, NavLink, Link } from "react-router-dom";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiReset } from "react-icons/bi";
import { useState } from "react";
import EditProfile from "../../pages/ProfessionalSide/ProfeProfile/EditProfile";

function NavbarComp() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const Navigate = useNavigate();
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);

  const handleClick = () => {
    logout();
    Navigate("/");
  };

  const isClient = () => {
    return user && user.role === "client";
  };

  return (
    <Navbar fluid rounded className="navbar-container">
      <Navbar.Brand as={NavLink} to="/" className="text-center">
        <span className="self-center text-2xl font-semibold dark:text-white">
          Construction Professionals Nepal
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        {user && (
          <>
            <Dropdown label={user?.username}>
              <Dropdown.Header>
                <span className="block text-sm">{user?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>

              <button
                className="action-button"
                onClick={() => setShowEditProfilePopup(true)} // Show the Edit Profile popup when clicked
              >
                Edit Profile
              </button>
              <Dropdown.Divider />
              <Link to="/changepassword" className="reset-password-link">
                <BiReset className="reset-password-icon" />
                Reset Password
              </Link>
            </Dropdown>
          </>
        )}
        &nbsp;
        {user && (
          <div>
            <Button style={{ backgroundColor: "blue" }} onClick={handleClick}>
              Logout
            </Button>
          </div>
        )}
        {!user && (
          <NavLink to="/login">
            <Button style={{ backgroundColor: "blue" }}>Login</Button>
          </NavLink>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={NavLink} to="/" exact="true">
          <span className="text-lg">Home</span>
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/designs">
          <span className="text-lg">Designs</span>
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/professionals">
          <span className="text-lg">Professionals</span>
        </Navbar.Link>
        {isClient() && (
          <Navbar.Link as={NavLink} to="/favorite">
            <span className="text-lg">Favorite</span>
          </Navbar.Link>
        )}
        {isClient() && (
          <Navbar.Link as={NavLink} to="/appointment">
            <span className="text-lg">Appointments</span>
          </Navbar.Link>
        )}
        {user && (
          <>
            <NavLink to="/chat">
              <IoChatbubbleEllipsesOutline
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: "8px",
                }}
              />
            </NavLink>
            {!isClient() && (
              <>
                {user.role === "admin" && (
                  <NavLink to="/dashboard/summary">
                    <span className="text-lg">Dashboard</span>
                  </NavLink>
                )}

                {user.role === "professional" && (
                  <NavLink to="/dashboard/my-designs">
                    <span className="text-lg">Dashboard</span>
                  </NavLink>
                )}
              </>
            )}
          </>
        )}

        {/* Edit Profile Popup */}
        {showEditProfilePopup && (
          <div className="edit-profile-popup">
            <EditProfile />
            <button
              className="close-popup-btn"
              onClick={() => setShowEditProfilePopup(false)} // Hide the Edit Profile popup when clicked
            >
              ❌
            </button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
