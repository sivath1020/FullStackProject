import Cart from "../Cart/Cart";
import { useState } from "react";
import "./Forall.css";
import { FaShoppingCart } from "react-icons/fa";

// 🧒 KIDS IMAGES
import KidsTshirt from "../assets/KidsTshirt.jpg";
import KidsFrock from "../assets/KidsFrock.jpg";
import KidsShorts from "../assets/KidsShorts.jpg";
import KidsJeans from "../assets/KidsJeans.jpg";
import KidsHoodie from "../assets/KidsHoodie.jpg";
import KidsJacket from "../assets/KidsJacket.jpg";
import Track from "../assets/Track.jpg";
import KidsPartyWear from "../assets/KidsPartyWear.jpg";
import KidsNightWear from "../assets/KidsNightWear.jpg";

import { Link } from "react-router-dom";

export default function Kids() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // FILTER STATES
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  // ✅ ADDED MESSAGE STATE
  const [addedItem, setAddedItem] = useState(null);

  // 🧒 PRODUCTS
  const products = [
    { name: "Kids T-Shirt", price: 299, size: "S", rating: 4.5, img: KidsTshirt },
    { name: "Kids Frock", price: 499, size: "M", rating: 4.6, img: KidsFrock },
    { name: "Kids Shorts", price: 249, size: "S", rating: 4.2, img: KidsShorts },
    { name: "Kids Jeans", price: 599, size: "M", rating: 4.4, img: KidsJeans },
    { name: "Kids Hoodie", price: 699, size: "L", rating: 4.7, img: KidsHoodie },
    { name: "Kids Jacket", price: 899, size: "L", rating: 4.8, img: KidsJacket },
    { name: "Kids Track Pant", price: 399, size: "M", rating: 4.3, img: Track },
    { name: "Kids Party Wear", price: 999, size: "L", rating: 4.9, img: KidsPartyWear },
    { name: "Kids Night Wear", price: 349, size: "S", rating: 4.1, img: KidsNightWear }
  ];

  // FILTER LOGIC
  const filteredProducts = products.filter(p => {
    const priceOk =
      priceFilter === "ALL" ||
      (priceFilter === "BELOW500" && p.price < 500) ||
      (priceFilter === "ABOVE500" && p.price >= 500);

    const sizeOk = sizeFilter === "ALL" || p.size === sizeFilter;
    const ratingOk =
      ratingFilter === "ALL" || p.rating >= Number(ratingFilter);

    return priceOk && sizeOk && ratingOk;
  });

  // ✅ SINGLE ADD TO CART FUNCTION (FIXED)
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(i => i.name === product.name);
      return exist
        ? prev.map(i =>
            i.name === product.name ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...product, qty: 1 }];
    });

    // show Added message
    setAddedItem(product.name);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
     {/* HEADER */}
      <div className="mens-header"style={{ background:" rgba(223, 173, 216, 1)"}}>
        <h1 style={{ background:" rgba(223, 173, 216, 1)"}}>ClothHand – Kids Collection</h1>

        <div className="cart-top" style={{ background:" rgba(223, 173, 216, 1)"}} onClick={() => setShowCart(true)}>
          <FaShoppingCart style={{ background:"rgba(223, 173, 216, 1)"}}/>
          {totalQty > 0 && <span className="cart-count" >{totalQty}</span>}
        </div>
      </div>


      {/* FILTER */}
      <div className="mens-filter">
        <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
          <option value="ALL">All Price</option>
          <option value="BELOW500">Below ₹500</option>
          <option value="ABOVE500">Above ₹500</option>
        </select>

        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
          <option value="ALL">All Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
          <option value="ALL">All Rating</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="mens-product-grid">
        {filteredProducts.map((p, i) => (
          <div key={i} className="mens-product-card">
            <img src={p.img} className="mens-product-img" alt={p.name} />
            <h3>{p.name}</h3>
            <h5>SIZE : {p.size}</h5>
            <p>₹{p.price}</p>
            <p>⭐ {p.rating}</p>

            <div className="product-btns">
              <button
                className="mens-add-btn"
                onClick={() => addToCart(p)}
              >
                {addedItem === p.name ? "Added ✅" : "Add to Cart"}
              </button>

              <Link to="/Address" className="shop-now-btn">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CART */}
      <Cart
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        addToCart={addToCart}
        decreaseQty={(name) => {
          setCart(prev =>
            prev
              .map(i => (i.name === name ? { ...i, qty: i.qty - 1 } : i))
              .filter(i => i.qty > 0)
          );
        }}
        removeItem={(name) => {
          setCart(prev => prev.filter(i => i.name !== name));
        }}
        total={total}
      />
    </>
  );
}
