// src/productgridcomponent/productgrid3.jsx
import { useState, useEffect } from "react";
import "../productgridcomponent/productlayout.css";
import image1 from "../assets/product15.png";
import image2 from "../assets/product13.png";
import image3 from "../assets/product16.png";
import image4 from "../assets/product17.png";
import { useNavigate } from "react-router-dom";

const Productlayout3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fixed: Only TSHIRT'S tab and always active
  const [activeTab] = useState("TSHIRT'S");

  const products = [
    {
      id: 9,
      name: "DRIPCO LEGEND SERIES OVERSIZED TSHIRT - GOKU",
      currentPrice: "649.00",
      originalPrice: "1,399.00",
      discount: 54,
      mainImage: image1,
      images: [image1, image1, image1, image1],
      category: "TSHIRT'S",
      material: "240 GSM Premium Cotton",
      fit: "Oversized Drop Shoulder",
      color: "Black",
      description: "The ultimate Goku tribute. High-quality puff print that pops. Built for warriors."
    },
    {
      id: 10,
      name: "DRIPCO SHADOW REFLECTIVE TSHIRT - PHANTOM",
      currentPrice: "699.00",
      originalPrice: "1,499.00",
      discount: 53,
      mainImage: image2,
      images: [image2, image2, image2, image2],
      category: "TSHIRT'S",
      material: "Cotton + Reflective Ink",
      fit: "Boxy Oversized",
      color: "Pitch Black",
      description: "Disappear in light, glow in dark. Reflective print that hits different at night."
    },
    {
      id: 11,
      name: "DRIPCO MINIMAL LUXE TSHIRT - ELEGANCE",
      currentPrice: "599.00",
      originalPrice: "1,299.00",
      discount: 54,
      mainImage: image3,
      images: [image3, image3, image3, image3],
      category: "TSHIRT'S",
      material: "Bio-Washed Supima Cotton",
      fit: "Relaxed Fit",
      color: "Deep Black",
      description: "Less is more. Ultra-soft fabric with subtle embroidered logo. Pure class."
    },
    {
      id: 12,
      name: "DRIPCO ACID WASH VINTAGE TSHIRT - REBEL",
      currentPrice: "749.00",
      originalPrice: "1,599.00",
      discount: 53,
      mainImage: image4,
      images: [image4, image4, image4, image4],
      category: "TSHIRT'S",
      material: "Heavy Acid-Washed Cotton",
      fit: "Vintage Oversized",
      color: "Faded Black",
      description: "Hand-dyed acid wash effect. Each piece is unique. True vintage drip."
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className={`product-grid-container ${isVisible ? "visible" : ""}`}>
      
      {/* Tabs - Only TSHIRT'S */}
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