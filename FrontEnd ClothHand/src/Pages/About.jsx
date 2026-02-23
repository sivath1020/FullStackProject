import React from "react";
import "./About.css";

// Images (ensure these exist)
import Mendress from "../assets/Mendress.jpg";
import WomenImg from "../assets/WomenImg.jpg";
import KidsImg from "../assets/KidsImg.jpg";
import BagImg from "../assets/BagImg.jpg";
import ShoesImg from "../assets/ShoesImg.jpg";
import WatchImg from "../assets/WatchImg.jpg";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About <span className="highlight">ClothHand</span></h1>
        <p>
          Welcome to ClothHand, your ultimate destination for modern fashion. 
          We provide high-quality clothing and accessories for everyone — men, women, kids, and fashion enthusiasts alike.
        </p>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At ClothHand, we strive to deliver stylish, trendy, and comfortable outfits
          that reflect your personality. From everyday essentials to statement pieces,
          our collection is curated to meet all your fashion needs.
        </p>
      </div>

      <div className="categories">
        <h2>Explore Our Collections</h2>
        {/* Step-by-step layout */}
        <div className="category-column">
          <div className="category-card">
            <img src={Mendress} alt="Men Fashion" />
            <h3>Men</h3>
          </div>
          <div className="category-card">
            <img src={WomenImg} alt="Women Fashion" />
            <h3>Women</h3>
          </div>
          <div className="category-card">
            <img src={KidsImg} alt="Kids Fashion" />
            <h3>Kids</h3>
          </div>
          <div className="category-card">
            <img src={BagImg} alt="Bags" />
            <h3>Bags</h3>
          </div>
          <div className="category-card">
            <img src={ShoesImg} alt="Shoes" />
            <h3>Shoes</h3>
          </div>
          <div className="category-card">
            <img src={WatchImg} alt="Watches" />
            <h3>Watches</h3>
          </div>
        </div>
      </div>

      <div className="about-footer">
        <h2>Why Choose ClothHand?</h2>
       
          <p>High-quality products at affordable prices.</p>
          <p>Curated collections for all age groups and styles.</p>
          <p>Fast delivery and excellent customer support.</p>
          <p>Our passion is your style — every item is handpicked.</p>
      
        <p>Join the ClothHand family today and experience fashion like never before  !</p>
      </div>
    </div>
  );
}
