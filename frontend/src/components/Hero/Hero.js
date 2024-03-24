import React from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container ">
        {/* Left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <h1>
              Discover Designs <br /> of Your Choices
              <br /> with Professionals
            </h1>
          </div>
          <div className="flexColStart hero-des">
            <span>
              Find a variety of house designs of your choice and best
              Professionals
            </span>
            <br />
            <span>
              Find a variety of house designs of your choice and best
              Professionals
            </span>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="blue" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div>
        </div>

        {/* Right side */}
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
