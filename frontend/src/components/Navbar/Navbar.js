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

import { NavLink } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"; // Import chat icon
// import "./NavbarComp.css"; // Import custom CSS for Navbar styling

function NavbarComp() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
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
          <div>
            <span>{user.email}</span>
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
        {!user && (
          <Navbar.Link as={NavLink} to="/contact">
            <span className="text-lg">Contact Us</span>
          </Navbar.Link>
        )}
        {user && (
          <>
            <Navbar.Link as={NavLink} to="/favorite">
              <span className="text-lg">Favorite</span>
            </Navbar.Link>
            <NavLink to="/chat">
              {/* Use IoChatbubbleEllipsesOutline icon with custom styling */}
              <IoChatbubbleEllipsesOutline
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: "8px",
                }}
              />
            </NavLink>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
