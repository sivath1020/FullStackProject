import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation(); // 🔑 get state from Mens.js (Shop Now) or Cart

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    amount: "",        // auto-fill amount
    productName: ""    // optional, show product name if single product
  });

  const [loading, setLoading] = useState(false);

  // Auto-fill amount & productName if passed via location.state
  useEffect(() => {
    if (location.state) {
      const { amount, productName } = location.state;
      if (amount) setForm(prev => ({ ...prev, amount }));
      if (productName) setForm(prev => ({ ...prev, productName }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const { name, cardNumber, expiry, cvv, amount } = form;

    // ✅ Basic validation
    if (!name || !cardNumber || !expiry || !cvv || !amount) {
      alert("Please fill all details");
      return;
    }

    if (cardNumber.length < 16) {
      alert("Invalid Card Number");
      return;
    }

    if (expiry.length !== 4) {
      alert("Invalid Expiry");
      return;
    }

    if (cvv.length !== 3) {
      alert("Invalid CVV");
      return;
    }

    setLoading(true);

    // MOCK PAYMENT
    setTimeout(() => {
      setLoading(false);
      navigate("/order-success", {
        state: {
          amount,
          productName: form.productName || "Cart Items" // for cart or single product
        }
      });
    }, 1500);
  };

  return (
    <div className="pay-wrapper">
      <form className="pay-form" onSubmit={handlePayment}>
        <h2 className="pay-title">Secure Payment</h2>

        {form.productName && <p>Product: <strong>{form.productName}</strong></p>}

        <label>Cardholder Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          maxLength="16"
        />

        <div className="pay-row">
          <div className="pay-field">
            <label>Expiry</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              maxLength="4"
            />
          </div>

          <div className="pay-field">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              maxLength="3"
            />
          </div>
        </div>

        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          readOnly={!!location.state?.amount} // single product from Mens.js
        />

        <button className="pay-btn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
                                                                            