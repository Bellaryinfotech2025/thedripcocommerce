"use client"

import { useState, useEffect } from "react"
import "../productsenlargecomponent/productspagedesign.css"
import { CiShoppingCart } from "react-icons/ci"
import { FaTruck, FaSync, FaStore, FaStar, FaStarHalfAlt } from "react-icons/fa"
import { IoIosShareAlt } from "react-icons/io"
import { useLocation, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import ReutrnsCode from "../returnscomponent/returnscode"
import { Link } from "react-router-dom"
import DripLoginPopup from "../usercredentialscomponent/loginpopup.jsx"
import { getUserIdFromCookie, setUserLoggedIn } from "../usercredentialscomponent/logincookieauth.js"

const API_BASE = "http://195.35.45.56:4646"

const Productpagemainwrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart, syncCartOnLogin } = useCart()
  const product = location.state?.product

  const [selectedSize, setSelectedSize] = useState("")
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [showSizeToast, setShowSizeToast] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!product) {
      navigate("/")
      return
    }

    const userId = getUserIdFromCookie()
    setIsLoggedIn(!!userId)
    setIsLoading(false)
  }, [product, navigate])

  if (!product) return null

  // UNIVERSAL IMAGE LOGIC
  const getImageUrl = () => {
    if (product.imageUrl) return `${API_BASE}${product.imageUrl}`
    if (product.images && product.images.length > 0) return product.images[0]
    return "https://via.placeholder.com/600x800/222/fff?text=NO+IMAGE"
  }

  const mainImage = getImageUrl()
  const img1 = mainImage
  const img2 = product.images?.[1] || mainImage
  const img3 = product.images?.[2] || mainImage
  const img4 = product.images?.[3] || mainImage

  // UNIVERSAL DATA
  const title = product.title || product.name || "Untitled Product"
  const currentPrice = Number.parseFloat(product.price || product.currentPrice || 0)
  const previousPrice = Number.parseFloat(product.previousPrice || product.originalPrice || 0)
  const description = product.description || "Premium quality streetwear from DripCo."
  const stock = product.stock !== undefined ? product.stock : 999

  const discount =
    previousPrice > currentPrice ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100) : null

  const handleActionClick = (action = "bag") => {
    if (isLoading) return

    if (!selectedSize) {
      setShowSizeToast(true)
      setTimeout(() => setShowSizeToast(false), 3000)
      return
    }

    if (isLoggedIn) {
      addToCartDirectly()
      if (action === "buy") {
        navigate("/checkout")
      }
    } else {
      setShowLoginPopup(true)
    }
  }

  const addToCartDirectly = () => {
    addToCart({
      id: product.id || Date.now(),
      productId: product.productId || product.id?.toString() || `PROD-${Date.now()}`,
      name: title,
      price: currentPrice,
      size: selectedSize,
      image: mainImage,
      category: product.category || "General",
      quantity: 1,
    })

    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handleRegisterSuccess = (userId) => {
    setUserLoggedIn(userId)
    setIsLoggedIn(true)
    setShowLoginPopup(false)

    // Sync cart with the new user
    if (syncCartOnLogin) {
      syncCartOnLogin(userId)
    }

    // Add to cart immediately after login
    addToCartDirectly()
  }

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out ${title} on DripCo! Only ₹${currentPrice}`)
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank")
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="tuple_nation_product_wrapper">
        <section className="tuple_nation_section_three_container">
          <div className="tuple_nation_images_grid_triple_stag">
            <div className="tuple_nation_lifestyle_row">
              <img src={img1 || "/placeholder.svg"} alt="Main" className="tuple_nation_product_image_triple_antelope" />
              <img src={img2 || "/placeholder.svg"} alt="Side" className="tuple_nation_product_image_triple_antelope" />
            </div>
          </div>

          <div className="tuple_nation_purchase_panel_lynx">
            <div className="tuple_nation_header_section_jackal">
              <h1 className="tuple_nation_product_title_meerkat">{title}</h1>
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
                View Size Chart {showSizeChart ? "▲" : "▼"}
              </button>
              {showSizeChart && (
                <div className="tuple_nation_size_chart_dropdown">
                  <table className="tuple_nation_size_table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Waist</th>
                        <th>Length</th>
                        <th>Hip</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S</td>
                        <td>28-30"</td>
                        <td>40"</td>
                        <td>38"</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>30-32"</td>
                        <td>41"</td>
                        <td>40"</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>32-34"</td>
                        <td>42"</td>
                        <td>42"</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>34-36"</td>
                        <td>43"</td>
                        <td>44"</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>36-38"</td>
                        <td>44"</td>
                        <td>46"</td>
                      </tr>
                      <tr>
                        <td>XXXL</td>
                        <td>38-40"</td>
                        <td>45"</td>
                        <td>48"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* BUY NOW Button */}
            <button
              className="tuple_nation_buy_now_btn_cardinal"
              onClick={() => handleActionClick("buy")}
              style={{
                opacity: selectedSize && !isLoading ? 1 : 0.5,
                cursor: selectedSize && !isLoading ? "pointer" : "not-allowed",
              }}
            >
              BUY NOW
            </button>

            {/* ADD TO BAG Button */}
            <div className="tuple_nation_action_buttons_tanager" style={{ position: "relative" }}>
              <button
                className="tuple_nation_bag_btn_oriole"
                onClick={() => handleActionClick("bag")}
                style={{
                  opacity: selectedSize && !isLoading ? 1 : 0.5,
                  cursor: selectedSize && !isLoading ? "pointer" : "not-allowed",
                }}
              >
                <CiShoppingCart size={20} /> ADD TO BAG
              </button>

              {/* Success Toast */}
              {showSuccessToast && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: "10px",
                    background: "#28a745",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    zIndex: 10,
                    animation: "fadeInOut 3s forwards",
                  }}
                >
                  ✓ Added to bag! Size: {selectedSize}
                </div>
              )}
            </div>

            {/* Stock indicator */}
            {stock < 10 && stock > 0 && (
              <p
                style={{
                  color: "#e65100",
                  fontSize: "13px",
                  margin: "12px 0 0",
                  fontWeight: "500",
                }}
              >
                ⚡ Only {stock} left in stock!
              </p>
            )}
          </div>
        </section>

        {/* Product Details Section */}
        <section className="tuple_nation_section_one_container">
          <div className="tuple_nation_images_grid_left">
            <div className="tuple_nation_side_by_side">
              <img src={img3 || "/placeholder.svg"} alt="Front" className="tuple_nation_product_image_large_bear" />
              <img src={img4 || "/placeholder.svg"} alt="Back" className="tuple_nation_product_image_large_bear" />
            </div>
          </div>
          <div className="tuple_nation_specs_panel_deer">
            <div className="tuple_nation_specs_grid">
              {[
                ["Style Code", product.productId ? `DRIP-${product.productId}` : `DRIP-${product.id || "XXXX"}`],
                ["Brand", "DripCo"],
                ["Category", (product.category || "UNKNOWN").replace("'S", "S")],
                ["In Stock", stock > 0 ? "Yes" : "No"],
                ["Collection", "Street Series 2025"],
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
          <div
            className="tuple_nation_images_grid_right_monkey"
            style={{
              backgroundColor: "#f0f8ff",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#0066cc", fontSize: "16px", fontWeight: "600", margin: "0 0 1rem 0" }}>
              PRODUCT DETAILS
            </h3>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} size={18} color="#FFD700" />
              ))}
              <FaStarHalfAlt size={18} color="#FFD700" />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>4.5 (127+ reviews)</span>
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#444" }}>{description}</p>
          </div>

          <div className="tuple_nation_promo_section_fox">
            <div className="tuple_nation_delivery_section_owl">
              <h3 className="tuple_nation_delivery_title_raven">DELIVERY OPTIONS</h3>
              <div className="tuple_nation_delivery_feature_swan">
                <FaTruck size={22} />
                <div>
                  <div className="tuple_nation_feature_label_dragon">FREE SHIPPING*</div>
                </div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaSync size={20} />
                <div>
                  <div className="tuple_nation_feature_label_dragon">NO RETURN/EXCHANGE FOR CUSTOM PRODUCTS</div>
                </div>
              </div>
              <div className="tuple_nation_delivery_feature_swan">
                <FaStore size={20} />
                <div>
                  <div className="tuple_nation_feature_label_dragon">CONTACT THEDRIPCO.STORE</div>
                  <Link to="/supportdripco" className="tuple_nation_location_link_sparrow">
                    CONTACT US
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReutrnsCode />

        {/* Size Selection Toast */}
        {showSizeToast && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#ff4d4f",
              color: "white",
              padding: "14px 32px",
              borderRadius: "50px",
              fontWeight: "bold",
              zIndex: 9999,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              fontSize: "15px",
            }}
          >
            ⚠️ Please select a size first!
          </div>
        )}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <DripLoginPopup onClose={() => setShowLoginPopup(false)} onRegisterSuccess={handleRegisterSuccess} />
      )}

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          15%, 85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}

export default Productpagemainwrapper;
