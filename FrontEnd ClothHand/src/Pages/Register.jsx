import { useState } from "react";
import "./Register.css";
import Topic from "../assets/Topic.png";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // ✅ FIX

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dob,
          phoneNumber, // ✅ MATCH BACKEND
          email,
          password,
        }),
      });

      const data = await response.text();

      if (data === "User Registered Successfully") {
        // ✅ SAVE EMAIL FOR PROFILE PAGE
        localStorage.setItem("userEmail", email);

        // clear form
        setName("");
        setDob("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
alert(data)
        navigate("/"); // ✅ go to profile
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbarr">
        <div className="logo-container">
          <img className="logo" src={Topic} alt="Logo" />
          <h1 className="brand">
            Cloth <span className="highlight">Hand</span>
          </h1>
        </div>

        <div className="nav-right">
          <input className="search" type="search" placeholder="Search Here ...!" />
          <Link to="/profile" className="login-btn">👤</Link>
        </div>
      </nav>

      {/* REGISTER FORM */}
      <div className="reg-page">
        <form className="reg-card" onSubmit={handleRegister}>
          <h2 className="reg-title">Create Account</h2>

          <input
            className="reg-input"
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="reg-input"
            type="date"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
          />

          <input
            className="reg-input"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber} // ✅ FIXED
            maxLength={10}
            required
            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))} // ✅ FIXED
          />

          <input
            className="reg-input"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="reg-input"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="reg-btn">Register</button>
<br /><br />
          <p>Already have an account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </>
  );
}
