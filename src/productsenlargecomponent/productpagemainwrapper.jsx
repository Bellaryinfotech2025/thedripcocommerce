import { useState, useEffect } from "react";
import "../productsenlargecomponent/productspagedesign.css";
import { CiShoppingCart, CiShare2 } from "react-icons/ci";
import { FaTruck, FaSync, FaStore } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ReutrnsCode from '../returnscomponent/returnscode';

const Productpagemainwrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = location.state?.product;

  // Fallback if no product (safety)
  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState("XL");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showSizeToast, setShowSizeToast] = useState(false);

  const images = product.images || [];
  const img1 = images[0] || "https://via.placeholder.com/600";
  const img2 = images[1] || img1;
  const img3 = images[2] || img1;
  const img4 = images[3] || img1;
  const img5 = images[4] || img1;
  const img6 = images[5] || img1;

  const currentPrice = parseFloat(product.currentPrice) || 0;
  const previousPrice = parseFloat(product.previousPrice) || 0;
  const discount = previousPrice > currentPrice 
    ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100) 
    : null;

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${product.name} on DripCo!`);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  const handleGoToBag = () => {
    if (!selectedSize) {
      setShowSizeToast(true);
      setTimeout(() => setShowSizeToast(false), 3000);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      size: selectedSize,
      image: img1,
      quantity: 1,
      color: product.color || null
    };

    addToCart(cartItem);
    alert(`Added to bag! Size: ${selectedSize}`);
  };

  return (
    <>
    <br/>  <br/>  <br/>  <br/>  
      <div className="tuple_nation_product_wrapper">
        <section className="tuple_nation_section_three_container">
          <div className="tuple_nation_images_grid_triple_stag">
            <div className="tuple_nation_lifestyle_row">
              <img src={img1} alt="Lifestyle 1" className="tuple_nation_product_image_triple_antelope" />
              <img src={img2} alt="Lifestyle 2" className="tuple_nation_product_image_triple_antelope" />
            </div>
          </div>

          <div className="tuple_nation_purchase_panel_lynx">
            <div className="tuple_nation_header_section_jackal">
              <h1 className="tuple_nation_product_title_meerkat">
                {product.name}
              </h1>
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
                SIZE: <span className="tuple_nation_size_value_jay">{selectedSize}</span>
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
              <button
                className="tuple_nation_size_chart_btn_wren"
                onClick={() => setShowSizeChart(!showSizeChart)}
              >
                View Size Chart {showSizeChart ? "Up" : "Down"}
              </button>

              {showSizeChart && (
                <div className="tuple_nation_size_chart_dropdown">
                  <table className="tuple_nation_size_table">
                    <thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr></thead>
                    <tbody>
                      <tr><td>S</td><td>38"</td><td>26"</td><td>16.5"</td></tr>
                      <tr><td>M</td><td>40"</td><td>27"</td><td>17"</td></tr>
                      <tr><td>L</td><td>42"</td><td>28"</td><td>17.5"</td></tr>
                      <tr><td>XL</td><td>44"</td><td>29"</td><td>18"</td></tr>
                      <tr><td>XXL</td><td>46"</td><td>30"</td><td>18.5"</td></tr>
                      <tr><td>XXXL</td><td>48"</td><td>31"</td><td>19"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <button className="tuple_nation_buy_now_btn_cardinal" onClick={handleGoToBag}>
              BUY NOW
            </button>

            <div className="tuple_nation_action_buttons_tanager">
              <button className="tuple_nation_bag_btn_oriole" onClick={handleGoToBag}>
                <CiShoppingCart size={20} /> GO TO BAG
              </button>
            </div>
          </div>
        </section>

        <section className="tuple_nation_section_one_container">
          <div className="tuple_nation_images_grid_left">
            <div className="tuple_nation_side_by_side">
              <img src={img3} alt="Front" className="tuple_nation_product_image_large_bear" />
              <img src={img4} alt="Side" className="tuple_nation_product_image_large_bear" />
            </div>
          </div>
          <div className="tuple_nation_specs_panel_deer">
            <div className="tuple_nation_specs_grid">
              {[
                ["Material", product.material || "Cotton Blend"],
                ["Fit", product.fit || "Regular Fit"],
                ["Style Code", product.id || "N/A"],
                ["Brand", product.brand || "DripCo"],
                ["Color", product.color || "Black"],
                ["Neck", product.neck || "Crew Neck"],
                ["Occasion", "Casual"],
                ["Pattern", product.pattern || "Solid"],
                ["Sleeves", product.sleeves || "Half Sleeves"],
                ["Product Type", product.category?.replace("'S", "") || "T-Shirt"],
                ["Collection", "Latest Drop"],
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
          <div className="tuple_nation_images_grid_right_monkey">
            <div className="tuple_nation_side_by_side">
              <img src={img5} alt="Back" className="tuple_nation_product_image_medium_giraffe" />
              <img src={img6} alt="Detail" className="tuple_nation_product_image_medium_giraffe" />
            </div>
          </div>

          <div className="tuple_nation_promo_section_fox">
            <div className="tuple_nation_delivery_section_owl">
              <h3 className="tuple_nation_delivery_title_raven">DELIVERY OPTIONS</h3>
              <div className="tuple_nation_delivery_feature_swan">
                <FaTruck size={22} color="#0066cc" />
                <div>
                  <div className="tuple_nation_feature_label_dragon">FREE SHIPPING*</div>
                  <div className="tuple_nation_feature_desc_unicorn">Easy exchange available</div>
                </div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaSync size={20} color="#0066cc" />
                <div><div className="tuple_nation_feature_label_dragon">15 DAYS FREE RETURN & EXCHANGE*</div></div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaStore size={20} color="#0066cc" />
                <div>
                  <div className="tuple_nation_feature_label_dragon">Grab Size {selectedSize} from nearby store</div>
                  <a href="#location" className="tuple_nation_location_link_sparrow">Select location</a>
                </div>
              </div>
            </div>

            <div className="tuple_nation_product_desc_section_butterfly">
              <h3 className="tuple_nation_desc_title_honeybee">PRODUCT DESCRIPTION</h3>
              <p className="tuple_nation_desc_text_ladybug">
                {product.description || `${product.name} – Premium quality fabric with perfect fit and comfort. Ideal for daily wear and casual outings.`}
              </p>
            </div>
          </div>
        </section>

        <ReutrnsCode />
      </div>

      {showSizeToast && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          background: '#ff4d4f', color: 'white', padding: '14px 28px', borderRadius: '50px',
          fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          Please select a size first!
        </div>
      )}
    </>
  );
};

export default Productpagemainwrapper;