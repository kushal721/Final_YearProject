// import React from 'react';
// import './Contact.css';
// import NavbarComp from '../../components/Navbar/Navbar';
// import FooterComp from '../../components/Footer/Footer';

// const Contact = () => {
//   return (
//     <>
//       <NavbarComp />
//       <section>
//         <div className=" contact-div">
//           {/* Contact Info */}
//           <div className="contact-info">
//             <div className="contact-info-item">
//               <div className="contact-info-icon">
//                 <i className="fas fa-home"></i>
//               </div>
//               <div className="contact-info-content">
//                 <h4>Address</h4>
//                 <p>4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
//               </div>
//             </div>
//             <div className="contact-info-item">
//               <div className="contact-info-icon">
//                 <i className="fas fa-phone"></i>
//               </div>
//               <div className="contact-info-content">
//                 <h4>Phone</h4>
//                 <p>571-457-2321</p>
//               </div>
//             </div>
//             <div className="contact-info-item">
//               <div className="contact-info-icon">
//                 <i className="fas fa-envelope"></i>
//               </div>
//               <div className="contact-info-content">
//                 <h4>Email</h4>
//                 <p>ntamerrwael@mfano.ga</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="contact-form">
//             <form action="" id="contact-form">
//               <h2>Send Message</h2>
//               <div className="input-box">
//                 <input type="text" required name="name" />
//                 <span>Full Name</span>
//               </div>
//               <div className="input-box">
//                 <input type="email" required name="email" />
//                 <span>Email</span>
//               </div>
//               <div className="input-box">
//                 <textarea required name="message"></textarea>
//                 <span>Type your Message...</span>
//               </div>
//               <div className="input-box">
//                 <input type="submit" value="Send" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//       <FooterComp />
//     </>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import SuccessAlert from "./alert";
import { Button, TextField, Snackbar } from "@mui/material";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields");
      setOpen(true);
      return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setOpen(true);
      return;
    }

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_h70ilos";
    const templateId = "template_gdhg6xi";
    const publicKey = "19IeVuY6xFyLVA11L";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Kushal",
      message: message,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setName("");
        setEmail("");
        setMessage("");
        setOpen(true); // Show success alert
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isSubmitDisabled = !name || !email || !message;

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="email-form-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="emailForm">
          <h2>Contact Us</h2>
          <br />
          <div className="input-container">
            <TextField
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              fullWidth
            />
          </div>
          <div className="input-container">
            <TextField
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              fullWidth
            />
          </div>
          <div className="input-container">
            <TextField
              multiline
              rows={4}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field textarea-field"
              fullWidth
            />
          </div>
          <Button variant="contained" type="submit" disabled={isSubmitDisabled}>
            Send Email
          </Button>
        </form>
        <SuccessAlert open={open} onClose={handleClose} />{" "}
        {/* SuccessAlert component */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMessage}
        />
      </div>
    </div>
  );
};
export default Contact;
