import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import NavbarComp from "../../components/Navbar/Navbar";
import FooterComp from "../../components/Footer/Footer";
import "./Description.css";

const Description = ({ match }) => {
  const { id } = useParams(); // Get the design ID from the route parameters

  const [designDesc, setDesignDesc] = useState();

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/designs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDesignDesc(data); // Set the design state with fetched data
        } else {
          console.error("Failed to fetch design");
        }
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    fetchDesign();
  }, [id]); // Fetch design data when the ID changes

  // Sample data for customer reviews
  const reviews = [
    {
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jane Doe",
      review:
        "Sed consequat mauris at purus tempor, a fringilla purus interdum.",
    },
    // Add more reviews as needed
  ];

  return (
    <div>
      <NavbarComp />
      <div className="main-container">
        <div>
          {designDesc && ( // Conditional rendering to check if designDesc is defined
            <div className="desc-container">
              <div className="left-side">
                <img src="/r1.png" alt="Design" className="design-image" />
              </div>
              <div className="right-side">
                <h2>{designDesc.designName}</h2>
                <p>{designDesc.designDescription}</p>
                <p>Rating: ★ 5.0</p>
                <p>Designer: Designer Name</p>
                {/* Add other descriptions here */}

                <div className="buttons-container">
                  <button className="fav-btn">Add to Favorites</button>
                  <button className="contact-btn">Contact Designer</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="review-section">
          <h3>Customer Reviews</h3>
          {/* Render customer names with their reviews */}
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.name}</h4>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Description;
