// src/components/ProductPage.jsx
import { useState } from "react";
import "../productsenlargecomponent/productspagedesign.css";
import image1 from "../assets/product15.png";
import { CiShoppingCart, CiShare2 } from "react-icons/ci";
import { FaTruck, FaSync, FaStore } from "react-icons/fa";
import DripLoginPopup from "../usercredentialscomponent/loginpopup";
import ReutrnsCode from '../returnscomponent/returnscode';
import { IoIosShareAlt } from "react-icons/io";

const ProductPage9 = () => {
  const [selectedSize, setSelectedSize] = useState("XL");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent("https://dripco.store");
    const text = encodeURIComponent("Check out this awesome T-Shirt on DripCo!");
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  return (
    <>
      <div className="tuple_nation_product_wrapper">

        {/* ========== HERO + PURCHASE ========== */}
        <section className="tuple_nation_section_three_container">
          <div className="tuple_nation_images_grid_triple_stag">
            <div className="tuple_nation_lifestyle_row">
              <img src={image1} alt="Lifestyle 1" className="tuple_nation_product_image_triple_antelope" />
              <img src={image1} alt="Lifestyle 2" className="tuple_nation_product_image_triple_antelope" />
            </div>
          </div>

          <div className="tuple_nation_purchase_panel_lynx">
            <div className="tuple_nation_header_section_jackal">
              <h1 className="tuple_nation_product_title_meerkat">
                Men Black Textured Crew Neck T-Shirt
              </h1>
              <button onClick={shareOnWhatsApp} className="tuple_nation_share_btn_otter">
                <IoIosShareAlt size={24} color="#000000" />
              </button>
            </div>

            <div className="tuple_nation_pricing_section_puma">
              <span className="tuple_nation_price_label_camel">MRP</span>
              <span className="tuple_nation_price_original_flamingo">₹ 1,999.00</span>
              <span className="tuple_nation_price_current_leopard">₹ 1,779.00</span>
              <span className="tuple_nation_discount_badge_ostrich">11% OFF</span>
              <div className="tuple_nation_points_section_rhino">
                <span className="tuple_nation_points_icon_walrus">Gem</span>
                <span className="tuple_nation_points_text_seahorse">53 PTS</span>
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

            <button
              className="tuple_nation_buy_now_btn_cardinal"
              onClick={() => setShowLoginPopup(true)}
            >
              BUY NOW
            </button>

            <div className="tuple_nation_action_buttons_tanager">
              <button className="tuple_nation_bag_btn_oriole">
                <CiShoppingCart size={20} /> GO TO BAG
              </button>
            </div>
          </div>
        </section>

        {/* ========== DETAILED VIEWS ========== */}
        <section className="tuple_nation_section_one_container">
          <div className="tuple_nation_images_grid_left">
            <div className="tuple_nation_side_by_side">
              <img src={image1} alt="Front" className="tuple_nation_product_image_large_bear" />
              <img src={image1} alt="Side" className="tuple_nation_product_image_large_bear" />
            </div>
          </div>

          <div className="tuple_nation_specs_panel_deer">
            <div className="tuple_nation_specs_grid">
              {[
                ["Material", "50% Cotton, 46% Modal and 4% Spandex"],
                ["Fit", "Oversized Fit"],
                ["Style Code", "ALKCADSF886679"],
                ["Brand", "Allen Solly"],
                ["Color", "Black"],
                ["Neck", "Crew Neck"],
                ["Occasion", "Casual"],
                ["Pattern", "Textured"],
                ["Sleeves", "Half Sleeves"],
                ["Subbrand", "Allen Solly Jeans"],
                ["Product Type", "T-Shirt"],
                ["Collection", "AL Authentic"],
              ].map(([label, value]) => (
                <div key={label} className="tuple_nation_spec_row_lion">
                  <span className="tuple_nation_spec_label_tiger">{label}:</span>
                  <span className="tuple_nation_spec_value_wolf">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== BACK VIEWS + DELIVERY ========== */}
        <section className="tuple_nation_section_two_container">
          <div className="tuple_nation_images_grid_right_monkey">
            <div className="tuple_nation_side_by_side">
              <img src={image1} alt="Back" className="tuple_nation_product_image_medium_giraffe" />
              <img src={image1} alt="Detail" className="tuple_nation_product_image_medium_giraffe" />
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
                <div>
                  <div className="tuple_nation_feature_label_dragon">15 DAYS FREE RETURN & EXCHANGE*</div>
                </div>
              </div>

              <div className="tuple_nation_delivery_feature_swan">
                <FaStore size={20} color="#0066cc" />
                <div>
                  <div className="tuple_nation_feature_label_dragon">Grab Size XL from nearby store</div>
                  <a href="#location" className="tuple_nation_location_link_sparrow">Select location</a>
                </div>
              </div>
            </div>

            <div className="tuple_nation_product_desc_section_butterfly">
              <h3 className="tuple_nation_desc_title_honeybee">PRODUCT DESCRIPTION</h3>
              <p className="tuple_nation_desc_text_ladybug">
                Crafted from a blend of cotton, modal, and spandex, this Allen Solly black t-shirt offers unrivalled comfort...
              </p>
            </div>
          </div>
        </section>

        {/* ========== RETURNS COMPONENT ========== */}
        <ReutrnsCode />
      </div>

      {/* ========== DRIPCO LOGIN POPUP ========== */}
      {showLoginPopup && <DripLoginPopup onClose={() => setShowLoginPopup(false)} />}
    </>
  );
};

export default ProductPage9;