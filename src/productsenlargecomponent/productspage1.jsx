"use client"

import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useCart } from "../context/CartContext"
import "../productsenlargecomponent/productspagedesign.css"
import image1 from "../assets/product1.jpg"

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("Small")
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const { addToCart } = useCart()

  const productData = {
    id: 1,
    name: "PUNISHER BROWN BOXY OVERSIZED TSHIRT",
    price: 699,
    originalPrice: 1319,
    discount: 47,
    rating: 5.0,
    image: image1,
  }

  const sizes = ["Small", "Medium", "Large", "Extra Large"]

  const handleSizeClick = (size) => {
    setSelectedSize(size)
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const toggleSizeChart = () => {
    setShowSizeChart(!showSizeChart)
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      size: selectedSize,
      quantity: quantity,
    }

    addToCart(cartItem)

    toast.success(
      <div className="custom-toast">
        <div className="toast-icon">✓</div>
        <div>
          <div className="toast-title">Added to Cart Successfully!</div>
          <div className="toast-message">
            {quantity} x {productData.name} ({selectedSize})
          </div>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      },
    )
  }

  const sizeChartData = [
    { size: "Small", chest: "36-38 in", length: "26 in" },
    { size: "Medium", chest: "38-40 in", length: "27 in" },
    { size: "Large", chest: "40-42 in", length: "28 in" },
    { size: "Extra Large", chest: "42-44 in", length: "29 in" },
  ]

  return (
    <>
      <ToastContainer />
      <section className="product-page-section">
        <div className="product-container">
          {/* Left - Back View Image */}
          <div className="back-image-column">
            <img src={image1 || "/placeholder.svg"} alt="Product Back View" className="back-image" />
          </div>

          {/* Center Main Image */}
          <div className="main-image-column">
            <img src={productData.image || "/placeholder.svg"} alt="Main Product" className="main-image" />
          </div>

          {/* Right Product Details */}
          <div className="details-column">
            <h1 className="product-title">{productData.name}</h1>
            <div className="rating">
              ★★★★★ <span className="rating-count">({productData.rating})</span>
            </div>

            <div className="price-section">
              <span className="save-badge">SAVE {productData.discount}%</span>
              <div className="prices">
                <span className="current-price">RS. {productData.price}.00</span>
                <span className="original-price">RS. {productData.originalPrice}.00</span>
              </div>
            </div>

            <div className="size-section">
              <div className="size-header">
                <label className="size-label">Size:</label>
                <button className="size-chart-btn" onClick={toggleSizeChart}>
                  Size chart
                </button>
              </div>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {showSizeChart && (
              <div className="size-chart-dropdown">
                <table className="size-chart-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest (in)</th>
                      <th>Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChartData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.size}</td>
                        <td>{row.chest}</td>
                        <td>{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="quantity-section">
              <div className="quantity-controls">
                <button className="qty-btn" onClick={decrementQuantity}>
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="buy-now-btn">BUY IT NOW</button>
            </div>

            <ul className="features-list">
              <li>• 240 GSM Cotton Terry</li>
              <li>• Crewneck Drop Shoulders</li>
              <li>• Boxy Oversized Fit</li>
              <li>• Mocha Brown Unique Colour</li>
              <li>• Biowashed | Combed | Hypo-Allergic Fabric</li>
              <li>• GOTS Organic Cotton Certified</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage;
