import { useState, useEffect } from "react";
import "../productgridcomponent/productlayout.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductlayoutMain = () => {
  const [activeTab, setActiveTab] = useState("PANT'S");
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const tabs = ["PANT'S", "TSHIRT'S"];

  useEffect(() => {
    setIsVisible(true);

    const loadProducts = () => {
      try {
        const saved = localStorage.getItem("admin-products");
        if (!saved) return;
        const parsed = JSON.parse(saved);
        setProducts(prev => 
          JSON.stringify(prev) === JSON.stringify(parsed) ? prev : parsed || []
        );
      } catch (e) {
        console.error("Load error:", e);
      }
    };

    loadProducts();
    const interval = setInterval(loadProducts, 2000);
    window.addEventListener("storage", loadProducts);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadProducts);
    };
  }, []);

  const filteredProducts = products.filter(p => p.category === activeTab);
  const total = filteredProducts.length;
  const hasMore = total > 8;

  const [expanded, setExpanded] = useState(false);
  const displayedProducts = showProducts
    ? (expanded ? filteredProducts : filteredProducts.slice(0, 8))
    : [];

  const getDiscount = (current, previous) => {
    if (!previous) return null;
    const c = parseFloat(current);
    const p = parseFloat(previous);
    if (isNaN(c) || isNaN(p) || p <= 0) return null;
    return Math.round(((p - c) / p) * 100);
  };

  const goToCategory = () => {
    navigate(`/category/${activeTab.toLowerCase().replace("'s", "s")}`);
  };

  const toggleShow = () => {
    if (!showProducts) {
      setShowProducts(true);
      setExpanded(false);
    } else {
      setExpanded(prev => !prev);
    }
  };

  const hideAll = () => {
    setShowProducts(false);
    setExpanded(false);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowProducts(false);
    setExpanded(false);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      cartId: Date.now() + Math.random(),
      id: product.id,
      name: product.name,
      price: parseFloat(product.currentPrice),
      quantity: 1,
      image: product.images?.[0] || "https://via.placeholder.com/70",
      size: product.size || null,
      color: product.color || null
    };
    addToCart(cartItem);
    alert(`${product.name} added to cart!`);
  };

  // Navigate to dynamic product page with full product data
  const openProductPage = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className={`product-grid-container ${isVisible ? "visible" : ""}`}>
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => switchTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ minHeight: "400px" }}>
        {!showProducts && total > 0 && (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <button onClick={toggleShow} className="big-btn">
              VIEW ALL PRODUCTS
            </button>
          </div>
        )}

        {showProducts && displayedProducts.length > 0 && (
          <>
            <div className="products-grid">
              {displayedProducts.map((product, index) => {
                const discount = getDiscount(product.currentPrice, product.previousPrice);
                return (
                  <div
                    key={product.id}
                    className="product-card-wrapper"
                    style={{
                      transitionDelay: `${index * 0.15}s`,
                      animation: "fadeInUp 0.6s ease forwards"
                    }}
                  >
                    <div className="product-card">
                      <div className="product-image-wrapper">
                        {discount !== null && <div className="discount-badge">SAVE {discount}%</div>}
                        <img
                          src={product.images?.[0] || "https://via.placeholder.com/400?text=No+Image"}
                          alt={product.name}
                          className="product-image"
                          onClick={() => openProductPage(product)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-prices">
                          <span className="current-price">₹{product.currentPrice}</span>
                          {product.previousPrice && (
                            <span className="original-price">₹{product.previousPrice}</span>
                          )}
                        </div>
                        {parseInt(product.stock) === 0 ? (
                          <p style={{ color: "red", marginTop: "8px" }}>Out of Stock</p>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            style={{
                              marginTop: "12px",
                              width: "100%",
                              padding: "10px",
                              background: "#000",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              fontWeight: "bold",
                              cursor: "pointer"
                            }}
                          >
                            ADD TO CART
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              textAlign: "center",
              marginTop: "50px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <button onClick={expanded ? hideAll : toggleShow} className={expanded ? "btn-outline" : "btn-black"}>
                {expanded ? "VIEW LESS" : "VIEW MORE"}
              </button>

              {hasMore && (
                <button onClick={goToCategory} className="btn-black">
                  VIEW ALL IN SHOP
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .big-btn {
          padding: 18px 60px;
          font-size: 1.4rem;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        .btn-black {
          padding: 14px 36px;
          font-size: 1rem;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-outline {
          padding: 14px 36px;
          font-size: 1rem;
          background: #fff;
          color: #000;
          border: 2px solid #000;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ProductlayoutMain;