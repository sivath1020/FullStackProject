    import { useState } from "react";
    import { FaShoppingCart } from "react-icons/fa";
    import Cart from "../Cart/Cart";
    import "./Dis.css";

    // IMAGES
    import Tshirt from "../assets/Tshirt.jpg";
    import Jeans from "../assets/Bluejean.jpg";
    import Jacket from "../assets/Leatherjacket.jpg";
    import Gown from "../assets/Gown.jpg";
    import Saree from "../assets/Saree.jpg";
    import KidsTshirt from "../assets/KidsTshirt.jpg";
    import KidsNightWear from "../assets/KidsNightWear.jpg";
    import Watch from "../assets/Watch.jpg";
    import Bag from "../assets/Bag.jpg";

    export default function AllCollection() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false); // ✅ FIX

    const products = [
        { id: 1, category: "Mens", name: "Men T-Shirt", price: 999, discount: 30, img: Tshirt },
        { id: 2, category: "Mens", name: "Blue Jeans", price: 1499, discount: 25, img: Jeans },
        { id: 3, category: "Mens", name: "Leather Jacket", price: 2999, discount: 40, img: Jacket },

        { id: 4, category: "Womens", name: "Women Dress", price: 1999, discount: 35, img: Gown },
        { id: 5, category: "Womens", name: "Silk Saree", price: 2499, discount: 45, img: Saree },

        { id: 6, category: "Kids", name: "Kids Wear", price: 899, discount: 20, img: KidsTshirt },
        { id: 7, category: "Kids", name: "Kids Night Wear", price: 599, discount: 15, img: KidsNightWear },

        { id: 8, category: "Accessories", name: "Smart Watch", price: 2999, discount: 50, img: Watch },
        { id: 9, category: "Accessories", name: "Travel Bag", price: 1999, discount: 30, img: Bag },
    ];

    const addToCart = (product) => {
        setCart(prev => {
        const exist = prev.find(i => i.id === product.id);
        return exist
            ? prev.map(i =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            )
            : [...prev, { ...product, qty: 1 }];
        });
    };

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

    const total = cart.reduce(   // ✅ FIX
        (sum, i) => sum + i.price * i.qty,
        0
    );

    return (
        <>
        {/* HEADER */}
        <div className="mens-header"style={{ background:" rgb(77, 117, 131)"}}>
            <h1 style={{ background:" rgb(77, 117, 131)"}}>ClothHand – Discount Collection</h1>

            <div className="cart-top" style={{ background:" rgb(77, 117, 131)"}} onClick={() => setShowCart(true)}>
            <FaShoppingCart style={{ background:" rgb(77, 117, 131)"}}/>
            {totalQty > 0 && <span className="cart-count" >{totalQty}</span>}
            </div>
        </div>

        {/* PRODUCTS */}
        <div className="mens-product-grid">
            {products.map(p => {
            const discountPrice =
                p.price - Math.round((p.price * p.discount) / 100);

            return (
                <div key={p.id} className="mens-product-card">
                <img src={p.img} className="mens-product-img" />
    <br />
                <span className="category-badge">{p.category}</span>

                <h3>{p.name}</h3>

                <p className="old-price">₹{p.price}</p>
                <p className="new-price">₹{discountPrice}</p>

                <span className="offer-badge">{p.discount}% OFF</span>

                <button
                    className="mens-add-btn"
                    onClick={() => addToCart(p)}
                >
                    Add to Cart
                </button>
                </div>
            );
            })}
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
