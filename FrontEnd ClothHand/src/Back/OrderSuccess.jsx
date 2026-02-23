import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  const amount = location.state?.amount;

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Your payment of <strong>₹{amount}</strong> was successful.</p>

        <Link to="/index" className="success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
