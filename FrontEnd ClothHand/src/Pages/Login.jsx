import { useState } from "react";
import "./Login.css";
import Topic from "../assets/Topic.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

   const data = await response.json();

console.log(data); // 🔥 MUST CHECK IN CONSOLE
if (data.success) {
  localStorage.setItem("userEmail", data.email); // 🔥 IMPORTANT
  navigate("/Profile");
}

if (data.success === true) {
  alert(data.message || "Login success");
  navigate("/index");
} else {
  alert(data.message || "Login failed");
}


  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <>
      <nav className="navbarr">
        <br />
        <div className="logo-container">
          <img className="logo" src={Topic} alt="Logo" />
          <h1 className="brand">
            Cloth <span className="highlight">Hand</span>
          </h1>
        </div>

        <div className="nav-right">
          <input className="search" type="search" placeholder="Search Here ...!" />
          <Link to="/Profile" className="login-btn">👤</Link>
        </div>
      </nav>

      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br /><br />
          <button type="submit" className="login">Login</button>
          <br /><br />
          <p>
            New User? <Link to="/Register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
