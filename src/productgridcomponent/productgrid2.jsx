import { useState, useEffect } from "react";
import "../productgridcomponent/productlayout.css";

// MAIN THUMBNAILS (shown in grid)
import image1 from "../assets/Tshirtttttt333.jpg";
import image2 from "../assets/product7.jpg";
import image3 from "../assets/product6.png";
import image4 from "../assets/product8.jpg";

// 3 EXTRA IMAGES FOR EACH T-SHIRT (you can rename these files as you like)
import t1_extra1  from "../assets/kakakakkakka.jpg";
import t1_extra2  from "../assets/lalalalallal.jpg";
import t1_extra3  from "../assets/Tshirtttttt333.jpg";

import t2_extra1  from "../assets/Tshirtttttt333.jpg";
import t2_extra2  from "../assets/Tshirtttttt333.jpg";
import t2_extra3  from "../assets/Tshirtttttt333.jpg";

import t3_extra1 from "../assets/Tshirtttttt333.jpg";
import t3_extra2 from "../assets/Tshirtttttt333.jpg";
import t3_extra3 from "../assets/Tshirtttttt333.jpg";

import t4_extra1 from "../assets/Tshirtttttt333.jpg";
import t4_extra2 from "../assets/Tshirtttttt333.jpg";
import t4_extra3 from "../assets/Tshirtttttt333.jpg";

import { useNavigate } from "react-router-dom";

const Productlayout2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const tabs = ["TSHIRT'S"];
  const [activeTab] = useState("TSHIRT'S");

  const products = [
    {
      id: 5,
      name: "DRIPCO OVERSIZED ANIME EDITION TSHIRT - SAIYAN",
      currentPrice: "599.00",
      originalPrice: "1,299.00",
      discount: 54,
      mainImage: image1,
      gallery: [t1_extra1, t1_extra2, t1_extra3], // 3 UNIQUE extra images
      category: "TSHIRT'S",
      material: "100% Premium Cotton",
      fit: "Oversized Fit",
      color: "Black",
      description: "Unleash your inner Saiyan with this bold anime-inspired oversized tee. Perfect drop-shoulder fit, premium print that lasts forever."
    },
    {
      id: 6,
      name: "DRIPCO STREETWEAR REFLECTIVE TSHIRT - TYPHOON",
      currentPrice: "649.00",
      originalPrice: "1,399.00",
      discount: 53,
      mainImage: image2,
      gallery: [t2_extra1, t2_extra2, t2_extra3],
      category: "TSHIRT'S",
      material: "Cotton + Poly Blend",
      fit: "Oversized",
      color: "Black",
      description: "Glow in the dark reflective print. Made for night riders and street kings. Heavy GSM fabric."
    },
    {
      id: 7,
      name: "DRIPCO MINIMAL BLACK CARNATION TSHIRT",
      currentPrice: "579.00",
      originalPrice: "1,199.00",
      discount: 52,
      mainImage: image3,
      gallery: [t3_extra1, t3_extra2, t3_extra3],
      category: "TSHIRT'S",
      material: "Bio-Washed Cotton",
      fit: "Relaxed Oversized",
      color: "Jet Black",
      description: "Clean. Minimal. Deadly. The Carnation series — subtle logo, maximum drip."
    },
    {
      id: 8,
      name: "DRIPCO MUTATION GLOW EDITION TSHIRT",
      currentPrice: "699.00",
      originalPrice: "1,499.00",
      discount: 53,
      mainImage: image4,
      gallery: [t4_extra1, t4_extra2, t4_extra3],
      category: "TSHIRT'S",
      material: "Heavy Cotton 240 GSM",
      fit: "Boxy Oversized",
      color: "Black",
      description: "Mutation glow-in-dark print. Limited drop. Once gone, it’s gone forever."
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // SEND mainImage + gallery correctly to product page
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
      
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

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

export default Productlayout2;