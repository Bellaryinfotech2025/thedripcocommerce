// src/productgridcomponent/Productlayout3.jsx
import { useState, useEffect } from "react";
import "../productgridcomponent/productlayout.css";

// MAIN THUMBNAILS (shown in grid)
import image1 from "../assets/oqojcgrka.jpg";
import image2 from "../assets/product13.png";
import image3 from "../assets/product16.png";
import image4 from "../assets/product17.png";

// EXTRA IMAGES FOR EACH PRODUCT (3 unique per t-shirt)
import t1_extra1 from "../assets/lmjhaskf.jpg";
import t1_extra2 from "../assets/meshiwq.jpg";
import t1_extra3 from "../assets/lmjhaskf.jpg"; // replace with actual

import t2_extra1 from "../assets/lmjhaskf.jpg";
import t2_extra2 from "../assets/lmjhaskf.jpg";
import t2_extra3 from "../assets/lmjhaskf.jpg";

import t3_extra1 from "../assets/lmjhaskf.jpg";
import t3_extra2 from "../assets/lmjhaskf.jpg";
import t3_extra3 from "../assets/lmjhaskf.jpg";

import t4_extra1 from "../assets/lmjhaskf.jpg";
import t4_extra2 from "../assets/lmjhaskf.jpg";
import t4_extra3 from "../assets/lmjhaskf.jpg";

import { useNavigate } from "react-router-dom";

const Productlayout3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [activeTab] = useState("TSHIRT'S");

  const products = [
    {
      id: 9,
      name: "DRIPCO LEGEND SERIES OVERSIZED TSHIRT - GOKU",
      currentPrice: "649.00",
      originalPrice: "1,399.00",
      discount: 54,
      mainImage: image1,
      gallery: [t1_extra1, t1_extra2, t1_extra3], // 3 unique extras
      category: "TSHIRT'S",
      material: "240 GSM Premium Cotton",
      fit: "Oversized Drop Shoulder",
      color: "Black",
      description: "The ultimate Goku tribute. High-quality puff print that pops off the fabric. Built for warriors who train hard and drip harder. Durable print, bold energy, legendary vibes."
    },
    {
      id: 10,
      name: "DRIPCO SHADOW REFLECTIVE TSHIRT - PHANTOM",
      currentPrice: "699.00",
      originalPrice: "1,499.00",
      discount: 53,
      mainImage: image2,
      gallery: [t2_extra1, t2_extra2, t2_extra3],
      category: "TSHIRT'S",
      material: "Cotton + Reflective Ink",
      fit: "Boxy Oversized",
      color: "Pitch Black",
      description: "Disappear in daylight. Dominate at night. Full reflective print activates under flash or low light. Made for night riders, photographers, and those who move in silence."
    },
    {
      id: 11,
      name: "DRIPCO MINIMAL LUXE TSHIRT - ELEGANCE",
      currentPrice: "599.00",
      originalPrice: "1,299.00",
      discount: 54,
      mainImage: image3,
      gallery: [t3_extra1, t3_extra2, t3_extra3],
      category: "TSHIRT'S",
      material: "Bio-Washed Supima Cotton",
      fit: "Relaxed Oversized",
      color: "Deep Black",
      description: "Luxury in simplicity. Crafted from rare Supima cotton with tonal embroidered logo. Feather-soft feel, premium drape, timeless silhouette. For those who speak softly but carry big style."
    },
    {
      id: 12,
      name: "DRIPCO ACID WASH VINTAGE TSHIRT - REBEL",
      currentPrice: "749.00",
      originalPrice: "1,599.00",
      discount: 53,
      mainImage: image4,
      gallery: [t4_extra1, t4_extra2, t4_extra3],
      category: "TSHIRT'S",
      material: "Heavy Acid-Washed Cotton",
      fit: "Vintage Oversized",
      color: "Faded Black",
      description: "Hand-dyed acid wash treatment. No two pieces are exactly alike. Distressed edges, raw energy, retro soul. Wear your rebellion. Age like fine wine."
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Properly pass mainImage + full gallery to product page
  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`, {
      state: {
        product: {
          ...product,
          mainImage: product.mainImage,
          gallery: product.gallery || []
        }
      }
    });
  };

  return (
    <div className={`product-grid-container ${isVisible ? "visible" : ""}`}>
      
      {/* Fixed Single Active Tab */}
      <div className="tabs-container">
        <button className="tab-button active">
          TSHIRT'S
        </button>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card-wrapper"
            onClick={() => handleProductClick(product)}
            style={{
              transitionDelay: `${index * 0.15}s`,
              cursor: "pointer"
            }}
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
                  loading="lazy"
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
  );
};

export default Productlayout3;