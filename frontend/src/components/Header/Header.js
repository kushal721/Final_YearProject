import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };



  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={300} />
        </Link>
        <img src="./moon.png" alt="moon" id="icon" />
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
          
            <Link to="/">Home</Link>
            <Link to="/designs">Designs</Link>
            <Link to="/professionals">Professionals</Link>
            <Link to="/favorites">Favorite</Link>
            <button className="button">
              <Link to="/join-as-pro">Join as Pro</Link>
            </button>
            <button className="button">
              <Link to="/login">Login</Link>
            </button>
            {/* <button className="button">
              <Link to="/login-sign">LoginSignup</Link>
            </button> */}
            
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
