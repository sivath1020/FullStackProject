import { FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart({
  cart,
  showCart,
  setShowCart,
  addToCart,
  decreaseQty,
  removeItem,
  total
}) {
  if (!showCart) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-box">
        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <FaTimes
            className="close-cart"
            onClick={() => setShowCart(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Empty cart */}
        {cart.length === 0 && <p className="empty-cart">Cart is empty 😕</p>}

        {/* Cart items */}
        {cart.map((item, i) => (
          <div key={i} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />

            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">₹{item.price}</p>
              <p className="cart-item-size">Size: {item.size}</p>

              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQty(item.name)}
                >
                  -
                </button>
                <span className="qty-num">{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Delete */}
            <FaTrash
              className="remove-icon"
              onClick={() => removeItem(item.name)}
              style={{ cursor: "pointer", color: "red" }}
            />
          </div>
        ))}

        {/* Total */}
        <h3 className="cart-total">Total: ₹{total}</h3>
            <Link
  to={cart.length === 0 ? "#" : "/Payment"}
  className={`shop-now-btn ${cart.length === 0 ? "disabled" : ""}`}
  onClick={(e) => {
    if (cart.length === 0) {
      e.preventDefault();
      alert("Cart is empty 😕 Add items first");
    }
  }}
>
  Shop Now
</Link>

      </div>
  
    </div>
  );
}

