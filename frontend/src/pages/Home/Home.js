import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import PopularDesigns from "../../components/PopularDesigns/PopularDesigns";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";

const Home = () => {
  // const getData = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/user/protected-route",
  //       {
  //         method: "POST", // Specify the method as POST
  //         headers: {
  //           "Content-Type": "application/json", // Specify the content type
  //           Authorization: "Bearer " + Cookies.get("usersdatatoken"),
  //         },
  //         body: JSON.stringify({}), // Include an empty JSON body if required by the server
  //       }
  //     );

  //     // Parse the response data
  //     const data = await response.json();
  //     console.log(data); // Log the response data to the console
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="App">
      <div>
        <div className="white-gradient" />

        <Hero />
      </div>
      <PopularDesigns />
      <Footer />
    </div>
  );
};

export default Home;
