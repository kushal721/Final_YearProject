import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Professionals from "./pages/Professionals/Professionals";
import Home from "./pages/Home/Home";
import Designs from "./pages/Designs/Designs";
import Login from "./pages/Login/Login";
import Favorite from "./pages/Favorite/Favorite";
import JoinAsPro from "./pages/JoinAsPro/JoinAsPro";
import Registeration from "./pages/Registration/Registeration";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";

//professional side

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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Home />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/design-desc/:id" element={<Description />} />

          <Route path="/favorite" element={<Favorite />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/join-as-pro" element={<JoinAsPro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/reset-password" element={<ForgotPassword />} />

          <Route path="/design-card" element={<DesignCard />}></Route>
          <Route path="/card" element={<ProfessionalCard />}></Route>
          <Route path="/professional-desc/:id" element={<ProfessionalDesc />} />

          <Route path="/:id/booking" element={<Booking />} />
          <Route path="/bookingform/:id" element={<BookingForm />} />

          {/* Professional Side */}
          <Route path="/my-designs" element={<MyDesigns />} />
          <Route path="/add-designs" element={<AddDesigns />} />
          <Route path="/profe-appointments" element={<ProfeAppointments />} />
          <Route path="/profe-profile" element={<ProfeProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
