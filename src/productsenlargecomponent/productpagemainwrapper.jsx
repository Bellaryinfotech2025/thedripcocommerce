// src/productsenlargecomponent/productpagemainwrapper.jsx
import { useState, useEffect } from "react";
import "../productsenlargecomponent/productspagedesign.css";
import { CiShoppingCart } from "react-icons/ci";
import { FaTruck, FaSync, FaStore, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ReutrnsCode from '../returnscomponent/returnscode';
import { Link } from "react-router-dom";
import DripLoginPopup from "../usercredentialscomponent/loginpopup.jsx";
import axios from "axios";

const login_url = "http://localhost:6161/api/v2";

const Productpagemainwrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showSizeToast, setShowSizeToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!product) navigate("/");
    checkLoginStatus();
  }, [product, navigate]);

  const checkLoginStatus = async () => {
    const userId = getCookie("userId");
    if (userId) {
      try {
        await axios.get(`${login_url}/users/${userId}`);
        setIsLoggedIn(true);
      } catch (err) {
        deleteCookie("userId");
      }
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  if (!product) return null;

  const img1 = product.images[0];
  const img2 = product.images[1] || img1;
  const img3 = product.images[2] || img1;
  const img4 = product.images[3] || img1;

  const currentPrice = parseFloat(product.currentPrice);
  const previousPrice = parseFloat(product.originalPrice);
  const discount = previousPrice > currentPrice
    ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100)
    : null;

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${product.name} on DripCo!`);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  const handleActionClick = () => {
    if (!selectedSize) {
      setShowSizeToast(true);
      setTimeout(() => setShowSizeToast(false), 3000);
      return;
    }
    if (isLoggedIn) {
      addToCartDirectly();
    } else {
      setShowLoginPopup(true);
    }
  };

  const addToCartDirectly = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      size: selectedSize,
      image: img1,
      quantity: 1,
      color: product.color || "Black"
    });
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    showToast("Registered successfully! Welcome to DripCo");
    addToCartDirectly(); // Auto add after register
  };

  return (
    <>
      <br /><br /><br /><br />

      <div className="tuple_nation_product_wrapper">

        {/* === YOUR EXACT ORIGINAL DESIGN STARTS === */}
        <section className="tuple_nation_section_three_container">
          <div className="tuple_nation_images_grid_triple_stag">
            <div className="tuple_nation_lifestyle_row">
              <img src={img1} alt="Main" className="tuple_nation_product_image_triple_antelope" />
              <img src={img2} alt="Side" className="tuple_nation_product_image_triple_antelope" />
            </div>
          </div>

          <div className="tuple_nation_purchase_panel_lynx">
            <div className="tuple_nation_header_section_jackal">
              <h1 className="tuple_nation_product_title_meerkat">{product.name}</h1>
              <button onClick={shareOnWhatsApp} className="tuple_nation_share_btn_otter">
                <IoIosShareAlt size={24} color="#000000" />
              </button>
            </div>

            <div className="tuple_nation_pricing_section_puma">
              <span className="tuple_nation_price_label_camel">MRP</span>
              {previousPrice > 0 && (
                <span className="tuple_nation_price_original_flamingo">₹ {previousPrice.toLocaleString()}</span>
              )}
              <span className="tuple_nation_price_current_leopard">₹ {currentPrice.toLocaleString()}</span>
              {discount && <span className="tuple_nation_discount_badge_ostrich">{discount}% OFF</span>}
              <div className="tuple_nation_points_section_rhino">
                <span className="tuple_nation_points_icon_walrus">Gem</span>
                <span className="tuple_nation_points_text_seahorse">{Math.round(currentPrice * 0.03)} PTS</span>
              </div>
            </div>

            <div className="tuple_nation_size_section_hummingbird">
              <div className="tuple_nation_size_label_canary">
                SIZE: <span className="tuple_nation_size_value_jay">{selectedSize || "Select Size"}</span>
              </div>
              <div className="tuple_nation_size_buttons_crow">
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <button
                    key={size}
                    className={`tuple_nation_size_btn_kiwi ${selectedSize === size ? "tuple_nation_size_btn_active_sparrow" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="tuple_nation_size_chart_btn_wren" onClick={() => setShowSizeChart(!showSizeChart)}>
                View Size Chart {showSizeChart ? "Up" : "Down"}
              </button>
              {showSizeChart && (
                <div className="tuple_nation_size_chart_dropdown">
                  <table className="tuple_nation_size_table">
                    <thead><tr><th>Size</th><th>Waist</th><th>Length</th><th>Hip</th></tr></thead>
                    <tbody>
                      <tr><td>S</td><td>28-30"</td><td>40"</td><td>38"</td></tr>
                      <tr><td>M</td><td>30-32"</td><td>41"</td><td>40"</td></tr>
                      <tr><td>L</td><td>32-34"</td><td>42"</td><td>42"</td></tr>
                      <tr><td>XL</td><td>34-36"</td><td>43"</td><td>44"</td></tr>
                      <tr><td>XXL</td><td>36-38"</td><td>44"</td><td>46"</td></tr>
                      <tr><td>XXXL</td><td>38-40"</td><td>45"</td><td>48"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <button 
              className="tuple_nation_buy_now_btn_cardinal" 
              onClick={handleActionClick}
              style={{ opacity: selectedSize ? 1 : 0.5, cursor: selectedSize ? 'pointer' : 'not-allowed' }}>
              BUY NOW
            </button>

            <div className="tuple_nation_action_buttons_tanager" style={{ position: 'relative' }}>
              <button 
                className="tuple_nation_bag_btn_oriole" 
                onClick={handleActionClick}
                style={{ opacity: selectedSize ? 1 : 0.5, cursor: selectedSize ? 'pointer' : 'not-allowed' }}>
                <CiShoppingCart size={20} /> GO TO BAG
              </button>

              {showSuccessToast && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  marginTop: '10px', background: '#28a745', color: 'white', padding: '10px 20px',
                  borderRadius: '50px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, animation: 'fadeInOut 3s forwards'
                }}>
                  Added to bag! Size: {selectedSize}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* === ALL YOUR ORIGINAL SECTIONS BELOW (UNCHANGED) === */}
        <section className="tuple_nation_section_one_container">
          <div className="tuple_nation_images_grid_left">
            <div className="tuple_nation_side_by_side">
              <img src={img3} alt="Front" className="tuple_nation_product_image_large_bear" />
              <img src={img4} alt="Back" className="tuple_nation_product_image_large_bear" />
            </div>
          </div>
          <div className="tuple_nation_specs_panel_deer">
            <div className="tuple_nation_specs_grid">
              {[
                ["Material", product.material],
                ["Fit", product.fit],
                ["Style Code", `DRIP-${product.id}`],
                ["Brand", "DripCo"],
                ["Color", product.color],
                ["Product Type", product.category === "TSHIRT'S" ? "Oversized T-Shirt" : "Baggy Pants"],
                ["Collection", "Street Series"],
              ].map(([label, value]) => (
                <div key={label} className="tuple_nation_spec_row_lion">
                  <span className="tuple_nation_spec_label_tiger">{label}:</span>
                  <span className="tuple_nation_spec_value_wolf">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tuple_nation_section_two_container">
          <div className="tuple_nation_images_grid_right_monkey" style={{ backgroundColor: "#f0f8ff", padding: "1.5rem", borderRadius: "8px" }}>
            <h3 style={{ color: "#0066cc", fontSize: "16px", fontWeight: "600", margin: "0 0 1rem 0" }}>PRODUCT DETAILS</h3>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              {[...Array(4)].map((_, i) => <FaStar key={i} size={18} color="#FFC107" />)}
              <FaStarHalfAlt size={18} color="#FFC107" />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>4.5 (100+ reviews)</span>
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
              {product.description}
            </p>
          </div>

          <div className="tuple_nation_promo_section_fox">
            <div className="tuple_nation_delivery_section_owl">
              <h3 className="tuple_nation_delivery_title_raven">DELIVERY OPTIONS</h3>
              <div className="tuple_nation_delivery_feature_swan">
                <FaTruck size={22} color="#0066cc" />
                <div><div className="tuple_nation_feature_label_dragon">FREE SHIPPING*</div></div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaSync size={20} color="#0066cc" />
                <div><div className="tuple_nation_feature_label_dragon">EASY EXCHANGE AVAILABLE</div></div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaStore size={20} color="#0066cc" />
                <div>
                  <div className="tuple_nation_feature_label_dragon">CONTACT THEDRIPCO.STORE</div>
                  <Link to="/supportdripco" className="tuple_nation_location_link_sparrow">CONTACT US</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReutrnsCode />

        {/* TOASTS */}
        {showSizeToast && (
          <div style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            background: '#ff4d4f', color: 'white', padding: '14px 32px', borderRadius: '50px',
            fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', fontSize: '15px'
          }}>
            Please select a size first!
          </div>
        )}

        {toastMsg && (
          <div style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            background: '#28a745', color: 'white', padding: '14px 32px', borderRadius: '50px',
            fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', fontSize: '15px'
          }}>
            {toastMsg}
          </div>
        )}
      </div>

      {showLoginPopup && (
        <DripLoginPopup 
          onClose={() => setShowLoginPopup(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          15%, 85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Productpagemainwrapper;