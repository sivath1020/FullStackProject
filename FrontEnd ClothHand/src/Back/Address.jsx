import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import "./Address.css";

export default function AddressForm() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    email: "",          // ✅ fixed
    phone: "",          // ✅ fixed
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phone, house, street, city, state, pincode } = address;

    // ✅ validation
    // if (!fullName || !phone || !house || !street || !city || !state || !pincode) {
    //   alert("⚠️ Please fill all address details");
    //   return;
    // }

    // if (phone.length !== 10) {
    //   alert("⚠️ Phone number must be 10 digits");
    //   return;
    // }

    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:8080/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...address,
          userEmail: email
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      alert(data);
      navigate("/Payment");

    } catch (err) {
      console.error(err);
      alert("Address save failed ❌");
    }
  };

  return (
    <div className="addr-wrapper">
      <form className="addr-card" onSubmit={handleSubmit}>
        <h2>Delivery Address</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"                 // ✅ important
          placeholder="Email"
          value={address.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"                 // ✅ important
          placeholder="Phone Number"
          value={address.phone}
          maxLength={10}
          onChange={handleChange}
        />

        <input
          type="text"
          name="house"
          placeholder="House / Flat No"
          value={address.house}
          onChange={handleChange}
        />

        <input
          type="text"
          name="street"
          placeholder="Street / Area"
          value={address.street}
          onChange={handleChange}
        />

        <div className="addr-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit" className="submit">
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
