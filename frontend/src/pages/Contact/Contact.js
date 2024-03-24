import React from 'react';
import './Contact.css';
import NavbarComp from '../../components/Navbar/Navbar';
import FooterComp from '../../components/Footer/Footer';

const Contact = () => {
  return (
    <>
      <NavbarComp />
      <section>
        <div className=" contact-div">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="contact-info-content">
                <h4>Address</h4>
                <p>4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info-content">
                <h4>Phone</h4>
                <p>571-457-2321</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info-content">
                <h4>Email</h4>
                <p>ntamerrwael@mfano.ga</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form action="" id="contact-form">
              <h2>Send Message</h2>
              <div className="input-box">
                <input type="text" required name="name" />
                <span>Full Name</span>
              </div>
              <div className="input-box">
                <input type="email" required name="email" />
                <span>Email</span>
              </div>
              <div className="input-box">
                <textarea required name="message"></textarea>
                <span>Type your Message...</span>
              </div>
              <div className="input-box">
                <input type="submit" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <FooterComp />
    </>
  );
};

export default Contact;
