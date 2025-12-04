// src/productgridcomponent/productgrid1.jsx
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

  const tabs = ["T-SHIRTS", "HOODIES"]

  // Each product has its OWN images now — no sharing!
  const products = [
    {
      id: 1,
      name: "SAIYAN BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 47,
      mainImage: image1,
      images: [image1, image1, image1, image1], // Only Saiyan images
      category: "PANT'S",
      material: "Premium Cotton",
      fit: "Baggy Fit",
      color: "Black",
      description: "The ultimate Saiyan baggy pants — bold, oversized, and made for legends."
    },
    {
      id: 2,
      name: "TYPHOON BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      mainImage: image2,
      images: [image2, image2, image2, image2], // Only Typhoon
      category: "PANT'S",
      material: "Cotton Blend",
      fit: "Straight Fit",
      color: "Black",
      description: "Typhoon series — powerful, clean, and built for the streets."
    },
    {
      id: 3,
      name: "CARNATION BLACK UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      mainImage: image3,
      images: [image3, image3, image3, image3], // Only Carnation
      category: "PANT'S",
      material: "Heavy Cotton",
      fit: "Relaxed Fit",
      color: "Black",
      description: "Carnation black — premium oversized fit with deep comfort."
    },
    {
      id: 4,
      name: "MUTATION UNISEX STRAIGHT FIT BAGGY PANTS",
      currentPrice: "699.00",
      originalPrice: "1,319.00",
      discount: 44,
      mainImage: image4,
      images: [image4, image4, image4, image4], // Only Mutation
      category: "PANT'S",
      material: "Poly-Cotton Blend",
      fit: "Baggy",
      color: "Black",
      description: "Mutation drop — stand out with bold design and perfect drape."
    },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts = products.filter(p => p.category === activeTab)

  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    navigate(`/product/${product.id}`, { state: { product } })
  }

  return (
    <div className={`product-grid-container ${isVisible ? "visible" : ""}`}>
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

      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card-wrapper"
            onClick={() => handleProductClick(product)}
            style={{ transitionDelay: `${index * 0.15}s`, cursor: "pointer" }}
          >
            <div className="product-card">
              <div className="product-image-wrapper">
                {product.discount && (
                  <div className="discount-badge">
                    SAVE {product.discount}%
                  </div>
                )}
                <img
                  src={product.mainImage}
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








