"use client"

import { useState, useEffect } from "react"
import "../productgridcomponent/productlayout.css"
import image1 from "../assets/product5.png"
import image2 from "../assets/product7.jpg"
import image3 from "../assets/product6.png"
import image4 from "../assets/product8.jpg"

const Productlayout2 = () => {
  const [activeTab, setActiveTab] = useState("PANT'S")
  const [isVisible, setIsVisible] = useState(false)

  const tabs = ["TSHIRT'S"]

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
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="product-image-wrapper">
              {product.discount && (
                <div className="discount-badge">SAVE {product.discount}%</div>
              )}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-prices">
                <span className="current-price">RS. {product.currentPrice}</span>
                <span className="original-price">RS. {product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productlayout2;
