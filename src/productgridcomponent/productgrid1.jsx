import { useState, useEffect } from "react"
import "../productgridcomponent/productlayout.css"
import image1 from "../assets/product1.jpg"
import image2 from "../assets/product2.jpg"
import image3 from "../assets/product9.png"
import image4 from "../assets/product4.jpg"
import { useNavigate } from "react-router-dom"

const Productlayout = () => {
  const [activeTab, setActiveTab] = useState("PANT'S")
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const tabs = ["PANT'S", "TSHIRT'S"]

  const products = [
    {
      id: 1,
      name: "SAIYAN BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 47,
      image: image1,
      category: "PANT'S",
    },
    {
      id: 2,
      name: "TYPHOON BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      image: image2,
      category: "PANT'S",
    },
    {
      id: 3,
      name: "CARNATION BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      image: image3,
      category: "PANT'S",
    },
    {
      id: 4,
      name: "MUTATION UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      image: image4,
      category: "PANT'S",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts = products.filter(p => p.category === activeTab)

  // Scroll and navigate based on product ID
  const handleProductClick = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    navigate(`/products/${id}`)
  }

  return (
    <div className={`product-grid-container ${isVisible ? "visible" : ""}`}>
      
      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card-wrapper"
            onClick={() => handleProductClick(product.id)}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="product-card">
              <div className="product-image-wrapper">
                {product.discount && (
                  <div className="discount-badge">
                    SAVE {product.discount}%
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="quick-view-overlay">
                  <span>QUICK VIEW</span>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-prices">
                  <span className="current-price">RS. {product.currentPrice}</span>
                  <span className="original-price">RS. {product.originalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productlayout;
