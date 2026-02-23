import Cart from "../Cart/Cart";
import { useState } from "react";
import "./Forall.css";
import { FaShoppingCart } from "react-icons/fa";

// 👜 ACCESSORIES IMAGES
import Watch from "../assets/Watch.jpg";
import Sunglasses from "../assets/Sunglasses.jpg";
import Wallet from "../assets/Wallet.jpg";
import Belt from "../assets/Belt.jpg";
import Cap from "../assets/Cap.jpg";
import Shoes from "../assets/Shoes.jpg";
import Backpack from "../assets/Backpack.jpg";
import Bracelet from "../assets/Bracelet.jpg";
import Perfume from "../assets/Perfume.jpg";

import { Link } from "react-router-dom";

export default function Accessories() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // FILTER STATES
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  // 👜 ACCESSORIES PRODUCTS (9 ITEMS)
  const products = [
    { name: "Wrist Watch", price: 1499, size: "FREE", rating: 4.7, img: Watch },
    { name: "Sunglasses", price: 799, size: "FREE", rating: 4.5, img: Sunglasses },
    { name: "Leather Wallet", price: 599, size: "FREE", rating: 4.4, img: Wallet },
    { name: "Belt", price: 399, size: "FREE", rating: 4.2, img: Belt },
    { name: "Cap", price: 299, size: "FREE", rating: 4.3, img: Cap },
    { name: "Casual Shoes", price: 1999, size: "ALL", rating: 4.8, img: Shoes },
    { name: "Backpack", price: 1299, size: "FREE", rating: 4.6, img: Backpack },
    { name: "Bracelet", price: 499, size: "FREE", rating: 4.1, img: Bracelet },
    { name: "Perfume", price: 999, size: "FREE", rating: 4.9, img: Perfume }
  ];

  // FILTER LOGIC
  const filteredProducts = products.filter(p => {
    const priceOk =
      priceFilter === "ALL" ||
      (priceFilter === "BELOW500" && p.price < 500) ||
      (priceFilter === "ABOVE500" && p.price >= 500);

    const sizeOk =
      sizeFilter === "ALL" ||
      p.size === sizeFilter ||
      p.size === "FREE";

    const ratingOk =
      ratingFilter === "ALL" || p.rating >= Number(ratingFilter);

    return priceOk && sizeOk && ratingOk;
  });

  // CART FUNCTIONS
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(i => i.name === product.name);
      return exist
        ? prev.map(i =>
            i.name === product.name ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* HEADER */}
      <div className="mens-header"style={{ background:" rgb(77, 117, 131)"}}>
        <h1 style={{ background:" rgb(77, 117, 131)"}}>ClothHand – Accessories Collection</h1>

        <div className="cart-top" style={{ background:" rgb(77, 117, 131)"}} onClick={() => setShowCart(true)}>
          <FaShoppingCart style={{ background:" rgb(77, 117, 131)"}}/>
          {totalQty > 0 && <span className="cart-count" >{totalQty}</span>}
        </div>
      </div>

      {/* FILTER UI */}
      <div className="mens-filter">
        <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
          <option value="ALL">All Price</option>
          <option value="BELOW500">Below ₹500</option>
          <option value="ABOVE500">Above ₹500</option>
        </select>

        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
          <option value="ALL">All Size</option>
          <option value="FREE">Free Size</option>
        </select>

        <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
          <option value="ALL">All Rating</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="mens-product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-product">No products found 😕</p>
        ) : (
          filteredProducts.map((p, i) => (
            <div key={i} className="mens-product-card">
              <img src={p.img} className="mens-product-img" />
              <h3>{p.name}</h3>
              <h5>SIZE : {p.size}</h5>
              <p>₹{p.price}</p>
              <p>⭐ {p.rating}</p>

              <div className="product-btns">
                <button className="mens-add-btn" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>

                <Link to="/Address" className="shop-now-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          ))
        )}
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
