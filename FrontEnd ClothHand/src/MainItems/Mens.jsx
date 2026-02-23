import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart/Cart";

import "./Forall.css";
import Topic from "../assets/Topic.png";
import Tshirt from "../assets/Tshirt.jpg";
import casualshirt from "../assets/casualshirt.webp";
import Bluejean from "../assets/Bluejean.jpg";
import Leatherjacket from "../assets/Leatherjacket.jpg";
import Hoodie from "../assets/Hoodie.png";
import Formalpant from "../assets/Formalpant.jpg";
import Deminshirt from "../assets/Deminshirt.jpg";
import Track from "../assets/track.jpg";
import Carogmen from "../assets/Carogmen.jpg";

export default function Mens() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const [priceFilter, setPriceFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  const products = [
    { name: "Casual T-Shirt", price: 499, size: "M", rating: 4.5, img: Tshirt },
    { name: "Formal Shirt", price: 899, size: "L", rating: 4.2, img: casualshirt },
    { name: "Blue Jeans", price: 999, size: "XL", rating: 4.7, img: Bluejean },
    { name: "Leather Jacket", price: 2499, size: "L", rating: 4.9, img: Leatherjacket },
    { name: "Hoodie", price: 799, size: "L", rating: 4.8, img: Hoodie },
    { name: "Formal Pant", price: 499, size: "L", rating: 4.3, img: Formalpant },
    { name: "Demin Shirt", price: 499, size: "L", rating: 4.1, img: Deminshirt },
    { name: "Track Pant", price: 299, size: "L", rating: 4.4, img: Track },
    { name: "Cargo Pant", price: 499, size: "L", rating: 4.2, img: Carogmen }
  ];

  // FILTER PRODUCTS
  const filteredProducts = products.filter(p => {
    const priceOk =
      priceFilter === "ALL" ||
      (priceFilter === "BELOW500" && p.price < 500) ||
      (priceFilter === "ABOVE500" && p.price >= 500);

    const sizeOk = sizeFilter === "ALL" || p.size === sizeFilter;
    const ratingOk = ratingFilter === "ALL" || p.rating >= Number(ratingFilter);

    return priceOk && sizeOk && ratingOk;
  });

  // ADD TO CART
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(i => i.name === product.name);
      return exist
        ? prev.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });

    setAddedItem(product.name);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // DIRECT PAYMENT FOR SHOP NOW
  const handleShopNow = (product) => {
    navigate("/payment", {
      state: {
        productName: product.name,
        amount: product.price
      }
    });
  };

  return (
    <>
      {/* HEADER */}
      <div className="mens-header"style={{ background:" rgb(77, 117, 131)"}}>
        <img className="logo" src={Topic} style={{ background:" rgb(77, 117, 131)"}} alt="Logo" />
        <h1 style={{ background:" rgb(77, 117, 131)"}}>ClothHand – Men Collection</h1>

        <div className="cart-top" style={{ background:" rgb(77, 117, 131)"}} onClick={() => setShowCart(true)}>
          <FaShoppingCart style={{ background:" rgb(77, 117, 131)"}}/>
          {totalQty > 0 && <span className="cart-count" >{totalQty}</span>}
        </div>
      </div>


      {/* FILTER */}
      <div className="mens-filter">
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="ALL">All Price</option>
          <option value="BELOW500">Below ₹500</option>
          <option value="ABOVE500">Above ₹500</option>
        </select>

        <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="ALL">All Size</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
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

                <button
                  className="shop-now-btn"
                  onClick={() => handleShopNow(p)}
                >
                  Shop Now
                </button>
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
              .map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i)
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