// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate, // Import Navigate component
// } from "react-router-dom";

// import Professionals from "./pages/Professionals/Professionals";
// import Home from "./pages/Home/Home";
// import Designs from "./pages/Designs/Designs";
// import Login from "./pages/Login/Login";
// import Favorite from "./pages/Favorite/Favorite";

// import Registeration from "./pages/Registration/Registeration";
// import Landing from "./pages/Landing";
// import Contact from "./pages/Contact/Contact";
// import About from "./pages/About/About";

// //professional side

// import MyDesigns from "./pages/ProfessionalSide/MyDesigns/MyDesigns";
// import AddDesigns from "./pages/ProfessionalSide/AddDesigns/AddDesigns";
// import ProfeAppointments from "./pages/ProfessionalSide/Profe-Appointments/ProfeAppointments";
// import ProfeProfile from "./pages/ProfessionalSide/ProfeProfile/ProfeProfile";
// import DesignCard from "./components/Cards/DesignCard";
// import ProfessionalCard from "./components/Cards/ProfessionalCard";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import Description from "./pages/Designs/Description";

// import { AuthContextProvider } from "./context/AuthContext";
// import ProfessionalDesc from "./pages/Professionals/ProfessionalDesc";
// import Booking from "./pages/Booking/Booking";
// import BookingForm from "./pages/Booking/BookingForm";
// import AddAppointment from "./pages/ProfessionalSide/Profe-Appointments/AddAppointment";
// import Chat from "./pages/Chat/Chat";
// import ClientAppointments from "./pages/Appointments/ClientAppointments";
// import AllAppointments from "./pages/ProfessionalSide/Profe-Appointments/AllAppointments";
// import RatingComp from "./components/Rating/RatingComp";
// import EditDesign from "./components/Edit/EditDesign";
// import AddInformation from "./pages/ProfessionalSide/ProfeProfile/AddInformation";
// import EditProfile from "./pages/ProfessionalSide/ProfeProfile/EditProfile";
// import ChangePassword from "./components/ChangePassword/ChangePassword";
// import MyDesignDesc from "./pages/ProfessionalSide/MyDesigns/MyDesignsDesc";
// import Dashboard from "./pages/Admin SIde/Dashboard/Dashboard";
// import UserList from "./pages/Admin SIde/User/User";
// import { useAuthContext } from "./hooks/useAuthContext";
// import { Sidebar } from "flowbite-react";

// function App() {
//   const { user } = useAuthContext();

//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/landing" element={<Landing />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/professionals" element={<Professionals />} />
//           <Route path="/designs" element={<Designs />} />
//           <Route path="/design-desc/:id" element={<Description />} />
//           <Route path="/rating" element={<RatingComp />} />
//           <Route path="/appointment" element={<ClientAppointments />} />
//           <Route path="/favorite" element={<Favorite />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Registeration />} />
//           <Route path="/reset-password" element={<ForgotPassword />} />
//           <Route path="/changepassword" element={<ChangePassword />} />

//           <Route path="/design-card" element={<DesignCard />}></Route>
//           <Route path="/card" element={<ProfessionalCard />}></Route>
//           <Route path="/professional-desc/:id" element={<ProfessionalDesc />} />
//           <Route path="/my-designs/:designId" element={<EditDesign />} />

//           <Route path="/addAppointment" element={<AddAppointment />} />
//           <Route path="/allappointments" element={<AllAppointments />} />

//           <Route path="/:id/booking" element={<Booking />} />
//           <Route path="/bookingform/:id" element={<BookingForm />} />

//           {/* Professional Side */}
//           <Route path="/my-designs" element={<MyDesigns />} />
//           <Route path="/add-designs" element={<AddDesigns />} />
//           <Route path="/profe-appointments" element={<ProfeAppointments />} />
//           <Route path="/profe-profile" element={<ProfeProfile />} />
//           <Route path="/add-information" element={<AddInformation />} />
//           <Route path="/editprofile" element={<EditProfile />} />
//           <Route path="/mydesign-desc/:id" element={<MyDesignDesc />} />
//           <Route path="/editdesign" element={<EditDesign />} />

//           {/* routes for chat */}
//           <Route path="/chat" element={<Chat />} />

//           <Route path="/admin-dash" element={<Dashboard />} />
//           <Route
//             path="/admin"
//             element={
//               user && user.role === "admin" ? (
//                 <Sidebar />
//               ) : (
//                 <Navigate to="/login" /> // Use Navigate component here
//               )
//             }
//           >
//             <Route path="/userlist" element={<UserList />} />
//           </Route>

//           {/* <Routes path="/user-list" element={<UserList />} /> */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate, // Import Navigate component
// } from "react-router-dom";

// import Professionals from "./pages/Professionals/Professionals";
// import Home from "./pages/Home/Home";
// import Designs from "./pages/Designs/Designs";
// import Login from "./pages/Login/Login";
// import Favorite from "./pages/Favorite/Favorite";

// import Registeration from "./pages/Registration/Registeration";
// import Landing from "./pages/Landing";
// import Contact from "./pages/Contact/Contact";
// import About from "./pages/About/About";

// //professional side

// import MyDesigns from "./pages/ProfessionalSide/MyDesigns/MyDesigns";
// import AddDesigns from "./pages/ProfessionalSide/AddDesigns/AddDesigns";
// import ProfeAppointments from "./pages/ProfessionalSide/Profe-Appointments/ProfeAppointments";
// import ProfeProfile from "./pages/ProfessionalSide/ProfeProfile/ProfeProfile";
// import DesignCard from "./components/Cards/DesignCard";
// import ProfessionalCard from "./components/Cards/ProfessionalCard";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import Description from "./pages/Designs/Description";

// import { AuthContextProvider } from "./context/AuthContext";
// import ProfessionalDesc from "./pages/Professionals/ProfessionalDesc";
// import Booking from "./pages/Booking/Booking";
// import BookingForm from "./pages/Booking/BookingForm";
// import AddAppointment from "./pages/ProfessionalSide/Profe-Appointments/AddAppointment";
// import Chat from "./pages/Chat/Chat";
// import ClientAppointments from "./pages/Appointments/ClientAppointments";
// import AllAppointments from "./pages/ProfessionalSide/Profe-Appointments/AllAppointments";
// import RatingComp from "./components/Rating/RatingComp";
// import EditDesign from "./components/Edit/EditDesign";
// import AddInformation from "./pages/ProfessionalSide/ProfeProfile/AddInformation";
// import EditProfile from "./pages/ProfessionalSide/ProfeProfile/EditProfile";
// import ChangePassword from "./components/ChangePassword/ChangePassword";
// import MyDesignDesc from "./pages/ProfessionalSide/MyDesigns/MyDesignsDesc";
// import Dashboard from "./pages/Admin SIde/Dashboard/Dashboard";
// import UserList from "./pages/Admin SIde/User/User";
// import { useAuthContext } from "./hooks/useAuthContext";
// import { Sidebar } from "flowbite-react";

// function App() {
//   const { user } = useAuthContext();

//   return (
//     <div>
//       <Router>
//         <Routes>
//           {/* Other routes */}
//           <Route path="/landing" element={<Landing />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/professionals" element={<Professionals />} />
//           <Route path="/designs" element={<Designs />} />
//           <Route path="/design-desc/:id" element={<Description />} />
//           <Route path="/rating" element={<RatingComp />} />
//           <Route path="/appointment" element={<ClientAppointments />} />
//           <Route path="/favorite" element={<Favorite />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Registeration />} />
//           <Route path="/reset-password" element={<ForgotPassword />} />
//           <Route path="/changepassword" element={<ChangePassword />} />

//           <Route path="/design-card" element={<DesignCard />}></Route>
//           <Route path="/card" element={<ProfessionalCard />}></Route>
//           <Route path="/professional-desc/:id" element={<ProfessionalDesc />} />
//           <Route path="/my-designs/:designId" element={<EditDesign />} />

//           <Route path="/addAppointment" element={<AddAppointment />} />
//           <Route path="/allappointments" element={<AllAppointments />} />

//           <Route path="/:id/booking" element={<Booking />} />
//           <Route path="/bookingform/:id" element={<BookingForm />} />

//           {/* Professional Side */}
//           <Route path="/my-designs" element={<MyDesigns />} />
//           <Route path="/add-designs" element={<AddDesigns />} />
//           <Route path="/profe-appointments" element={<ProfeAppointments />} />
//           <Route path="/profe-profile" element={<ProfeProfile />} />
//           <Route path="/add-information" element={<AddInformation />} />
//           <Route path="/editprofile" element={<EditProfile />} />
//           <Route path="/mydesign-desc/:id" element={<MyDesignDesc />} />
//           <Route path="/editdesign" element={<EditDesign />} />

//           {/* routes for chat */}
//           <Route path="/chat" element={<Chat />} />

//           {/* Admin Side */}
//           <Route path="/admin-dash" element={<Dashboard />} />
//           <Route
//             path="/admin"
//             element={
//               user && user.role === "admin" ? (
//                 <Sidebar>
//                   <Route path="userlist" element={<UserList />} />
//                 </Sidebar>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           {/* Other routes */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Professionals from "./pages/Professionals/Professionals";
import Home from "./pages/Home/Home";
import Designs from "./pages/Designs/Designs";
import Login from "./pages/Login/Login";
import Favorite from "./pages/Favorite/Favorite";

import Registeration from "./pages/Registration/Registeration";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Error from "./pages/error/error";

//professional side

import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar component here

import MyDesigns from "./pages/ProfessionalSide/MyDesigns/MyDesigns";
import AddDesigns from "./pages/ProfessionalSide/AddDesigns/AddDesigns";
import ProfeAppointments from "./pages/ProfessionalSide/Profe-Appointments/ProfeAppointments";
import ProfeProfile from "./pages/ProfessionalSide/ProfeProfile/ProfeProfile";
import DesignCard from "./components/Cards/DesignCard";
import ProfessionalCard from "./components/Cards/ProfessionalCard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Description from "./pages/Designs/Description";

import { AuthContextProvider } from "./context/AuthContext";
import ProfessionalDesc from "./pages/Professionals/ProfessionalDesc";
import Booking from "./pages/Booking/Booking";
import BookingForm from "./pages/Booking/BookingForm";
import AddAppointment from "./pages/ProfessionalSide/Profe-Appointments/AddAppointment";
import Chat from "./pages/Chat/Chat";
import ClientAppointments from "./pages/Appointments/ClientAppointments";
import AllAppointments from "./pages/ProfessionalSide/Profe-Appointments/AllAppointments";
import RatingComp from "./components/Rating/RatingComp";
import EditDesign from "./components/Edit/EditDesign";
import AddInformation from "./pages/ProfessionalSide/ProfeProfile/AddInformation";
import EditProfile from "./pages/ProfessionalSide/ProfeProfile/EditProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MyDesignDesc from "./pages/ProfessionalSide/MyDesigns/MyDesignsDesc";

import UserList from "./pages/Admin SIde/List/UserList";
import { useAuthContext } from "./hooks/useAuthContext";

import Report from "./pages/Admin SIde/AdminReport/Report";
import Summary from "./pages/Admin SIde/Summary/Summary";
import NavbarComp from "./components/Navbar/Navbar";
import ProfessionalSummary from "./pages/ProfessionalSide/ProfessionalSummary/ProfessionalSummary";

function App() {
  const { user } = useAuthContext();
  console.log(user?.role, "user role");
  const isClient = () => {
    return user && user.role === "client";
  };

  return (
    <div>
      <Router>
        <div>
          <NavbarComp />
        </div>

        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/design-desc/:id" element={<Description />} />
          <Route path="/rating" element={<RatingComp />} />
          <Route path="/appointment" element={<ClientAppointments />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          <Route path="/design-card" element={<DesignCard />}></Route>
          <Route path="/card" element={<ProfessionalCard />}></Route>
          <Route path="/professional-desc/:id" element={<ProfessionalDesc />} />

          <Route path="/my-designs/:designId" element={<EditDesign />} />

          <Route path="/:id/booking" element={<Booking />} />
          <Route path="/bookingform/:id" element={<BookingForm />} />

          {/* Only show sidebar for professional-side components */}

          {/* Professional Side */}

          <Route path="/dashboard/my-designs" element={<MyDesigns />} />
          <Route path="/dashboard/add-designs" element={<AddDesigns />} />
          <Route
            path="/dashboard/profe-appointments"
            element={<ProfeAppointments />}
          />
          <Route
            path="/dashboard/addAppointment"
            element={<AddAppointment />}
          />
          <Route
            path="/dashboard/allappointments"
            element={<AllAppointments />}
          />
          <Route path="/dashboard/profe-profile" element={<ProfeProfile />} />
          <Route
            path="/dashboard/add-information"
            element={<AddInformation />}
          />
          <Route path="/dashboard/editprofile" element={<EditProfile />} />
          <Route
            path="/dashboard/mydesign-desc/:id"
            element={<MyDesignDesc />}
          />
          <Route path="/dashboard/editdesign" element={<EditDesign />} />

          {/* Routes for chat */}
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/dashboard/professionalsummary"
            element={<ProfessionalSummary />}
          />

          <Route path="/dashboard/adminreport" element={<Report />} />
          <Route path="/dashboard/summary" element={<Summary />} />
          <Route
            path="/dashboard/admin"
            element={
              user?.role === "admin" ? (
                <UserList>
                  <Sidebar />
                </UserList>
              ) : (
                <Navigate to="/dashboard/admin" />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
