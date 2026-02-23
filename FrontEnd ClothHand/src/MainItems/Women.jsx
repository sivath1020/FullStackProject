import Cart from "../Cart/Cart";
import { useState } from "react";
import "./Forall.css";
import { FaShoppingCart } from "react-icons/fa";
import Topic  from "../assets/Topic.png";
import Kurti from "../assets/Kurti.jpg";
import Saree from "../assets/Saree.jpg";
import Top from "../assets/Top.jpg";
import WomenJeans from "../assets/WomenJeans.jpg";
import Gown from "../assets/Gown.jpg";
import Skirt from "../assets/Skirt.jpg";
import Beigepants from "../assets/Beigepants.jpg";
import cargopants from "../assets/cargopants.jpg";
import Partywear from "../assets/Partywear.jpg";


import { Link } from "react-router-dom";

export default function Womens() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ✅ FILTER STATES
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  // ✅ WOMEN PRODUCTS
  const products = [
    { name: "Kurti", price: 899, size: "M", rating: 4.6, img: Kurti },
    { name: "Saree", price: 1999, size: "L", rating: 4.8, img: Saree },
    { name: "Women Top", price: 699, size: "S", rating: 4.4, img: Top },
    { name: "Women Jeans", price: 1299, size: "M", rating: 4.5, img: WomenJeans },
    { name: "Gown", price: 499, size: "L", rating: 4.9, img: Gown },
     { name: "Skirt", price: 999, size: "L", rating: 4.1, img: Skirt },
     { name: "Cargo Pants", price: 899, size: "s", rating: 4.8, img: cargopants },
     { name: "Part Wear", price: 1999, size: "M", rating: 4.5, img: Partywear },
     { name: "Beige Pants", price: 699, size: "L", rating: 4.3, img: Beigepants }
  ];

  // ✅ FILTER LOGIC
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

  // ✅ CART FUNCTIONS
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
      <div className="mens-header" style={{ background: "rgb(77, 117, 131)" }}>
          <img className="logo" src={Topic} style={{ background:" rgb(77, 117, 131)"}} alt="Logo" />
        <h1 style={{ background: "rgb(77, 117, 131)" }}>
          ClothHand – Women Collection
        </h1>

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
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
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
              <img src={p.img} className="mens-product-img" alt={p.name} />
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





  