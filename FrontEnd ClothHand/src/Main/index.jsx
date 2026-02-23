import { useState } from "react";
import './Home.css';
import Timecount from "../Hooks/Timecount";

import Topic from "../assets/Topic.png";
import First from "../assets/First.jpg";
import Accessoriess from "../assets/Accessoriess.jpg";
import Amens from "../assets/Amens.jpg";
import Awomen from "../assets/Awomen.jpg";
import Akids from "../assets/Akids.jpg";



import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt ,
  FaInstagram,
  FaTwitter,
  FaFacebookF } from "react-icons/fa";


export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

    const { time, setRunning } = Timecount({
    hh: 1,
    mm: 19,
    ss: 59,
  });

  

  return (
    <>
    <nav className="navbarr">
        {/* Logo */}
        <div className="logo-container">
          <img className="logo" src={Topic} alt="Logo" />
          <h1 className="brand">
            Cloth <span className="highlight" style={{backgroundColor:"white"}}>Hand</span>
          </h1>
        </div>

        {/* Menu links */}
        <div className="menu-links">
          <Link className="menu-item" to="/Mens">Mens</Link>
          <Link className="menu-item" to="/Women">Women</Link>
          <Link className="menu-item" to="/Kids">Kids</Link>
          <Link className="menu-item" to="/Accessories">Accessories</Link>
        </div>

        {/* Search + Login/Register */}
        <div className="nav-right">
          <input className="search" type="search" placeholder="Search Here ...!" />
          <Link to="/Profile" className="login-btn">👤</Link>
      
        </div>
      </nav>



      <div className="main">
        <div className="mainone">
          <h1 className="letter">
            Join with <span style={{ color: "rgb(58, 130, 155)",backgroundColor:"white" }}>Cloth Hand</span>
          </h1>
          <h1 className="letterone">Hurry Up Offer's Closing Soon..!</h1>

          <br />
          <h2 className="time">
            {time.hh} : {time.mm} : {time.ss}
          </h2>
          <br />

<Link to="/Discount" className="btn-link view">View</Link>

        </div>

        <div>
          <img className="maintwo" src={First} alt="" />
        </div>
      </div>
  

     <div className="about-main-wrapper">
 <h1 className="title" >
          Our Products
        </h1>
      {/* MEN */}
      <section className="about-men-section">
        <div className="about-men-image">
          <img src={Amens} alt="Men Collection" />
        </div>

        <div className="about-men-content">
          <span className="about-tag">BEST SELLER</span>
          <h2>Men's Collection</h2>

          <p>
            Discover premium men’s fashion crafted for confidence and comfort.
            From office wear to casual outfits, our men’s collection defines
            elegance with durability.
          </p>

          <div className="about-features">
            <div>✔ Premium Fabric</div>
            <div>✔ Modern Fit</div>
            <div>✔ Long-Lasting Quality</div>
            <div>✔ Easy Return</div>
          </div>

          <div className="about-extra">
            <span>🚚 Free Delivery</span>
            <span>🔒 Secure Payment</span>
            <span>⭐ 4.7 / 5</span>
          </div>
<br />
          <Link to="/Mens" className="about-btn" style={{textDecoration:"none"}}>Explore Mens</Link>
        </div>
      </section>

      {/* WOMEN */}
      <section className="about-women-section">
        <div className="about-women-content">
          <span className="about-tag women">TRENDING</span>
          <h2>Women's Collection</h2>

          <p>
            Style meets grace in our women’s collection. Designed to empower
            confidence with comfort, elegance, and the latest fashion trends.
          </p>

          <div className="about-features">
            <div>✔ Trendy Designs</div>
            <div>✔ Comfortable Wear</div>
            <div>✔ Affordable Pricing</div>
            <div>✔ Premium Finish</div>
          </div>

          <div className="about-extra">
            <span>💃 Latest Fashion</span>
            <span>🚚 Fast Shipping</span>
            <span>⭐ 4.8 / 5</span>
          </div>
<br />
          <Link to="/Women" className="about-btn" style={{textDecoration:"none"}}>Explore Women</Link>
        </div>

        <div className="about-women-image">
          <img src={Awomen} alt="Women Collection" />
        </div>
      </section>

      {/* KIDS */}
      <section className="about-kids-section">
        <div className="about-kids-image">
          <img src={Akids} alt="Kids Collection" />
        </div>

        <div className="about-kids-content">
          <span className="about-tag kids">KIDS FAVORITE</span>
          <h2>Kids Collection</h2>

          <p>
            Soft, skin-friendly and colorful clothing specially designed for
            kids’ playful lifestyle and all-day comfort.
          </p>

          <div className="about-features">
            <div>✔ Skin-Safe Fabric</div>
            <div>✔ Bright Colors</div>
            <div>✔ Easy Wash</div>
            <div>✔ Durable Stitching</div>
          </div>

          <div className="about-extra">
            <span>🧸 Comfort Wear</span>
            <span>👶 Safe Fabric</span>
            <span>⭐ 4.6 / 5</span>
          </div>
<br />
          <Link to="/Kids" className="about-btn" style={{textDecoration:"none"}}>Explore Kids</Link>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="about-accessories-section">
        <div className="about-accessories-content">
          <span className="about-tag accessories">STYLE BOOST</span>
          <h2>Accessories</h2>

          <p>
            Complete your fashion with stylish accessories that add elegance,
            personality, and confidence to every outfit.
          </p>

          <div className="about-features">
            <div>✔ Premium Finish</div>
            <div>✔ Modern Styles</div>
            <div>✔ Everyday Use</div>
            <div>✔ Value for Money</div>
          </div>

          <div className="about-extra">
            <span>👜 Fashion Add-On</span>
            <span>🚀 Fast Dispatch</span>
            <span>⭐ 4.5 / 5</span>
          </div>
<br />
          <Link to="/Accessories" className="about-btn" style={{textDecoration:"none"}}>Explore Accessories</Link>
        </div>

        <div className="about-accessories-image">
          <img src={Accessoriess} alt="Accessories Collection" />
        </div>
      </section>
 <Link to="/About" className="btn-link about">For More</Link>
    </div>
 

 <div className="footer-contact">
  <h2 className="footer-title">Contact Us</h2>
  <p className="footer-subtitle">
    We’re here to help you. Reach us anytime ✨
  </p>

  <div className="footer-contact-cards">
    {/* Phone */}
    <div className="footer-card">
      <FaPhoneAlt className="footer-icon" />
      <h4>Phone</h4>
      <p>+91 98765 43210</p>
    </div>

    {/* Email */}
    <div className="footer-card">
      <FaEnvelope className="footer-icon" />
      <h4>Email</h4>
      <p>support@clothhand.com</p>
    </div>

    {/* Address */}
    <div className="footer-card">
      <FaMapMarkerAlt className="footer-icon" />
      <h4>Address</h4>
      <p>Chennai, Tamil Nadu, India</p>
    </div>

    {/* Social Media */}
<div className="footer-card">
  <FaInstagram className="footer-icon instagram" />
  <h4>Instagram</h4>
  <p>@clothhand</p>
</div>

<div className="footer-card">
  <FaTwitter className="footer-icon twitter" />
  <h4>Twitter</h4>
  <p>@clothhand</p>
</div>

<div className="footer-card">
  <FaFacebookF className="footer-icon facebook" />
  <h4>Facebook</h4>
  <p>ClothHand</p>
</div>

  </div>

  

  <p className="footer-copy">
    © 2025 ClothHand. All rights reserved.
  </p>
</div>




    </>
  );
}
