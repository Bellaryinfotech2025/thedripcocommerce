import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaHeart, FaShoppingBag, FaSearch, FaBars } from "react-icons/fa"
import { useCart } from "../context/CartContext"
import logo from "../assets/logo.jpg"
import adityaBirla from "../assets/Eshoppers.jpg"
import "../Goat Css/navbar.css"
import { Link } from "react-router-dom"

const Navbar = ({ toggleSidebar }) => {
  const [isSticky, setIsSticky] = useState(false)
  const { getTotalItems } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const navbarHeight = document.querySelector(".navbar-container")?.offsetHeight || 0
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight

      if (scrollPosition + windowHeight >= documentHeight - navbarHeight) {
        setIsSticky(false)
      } else {
        setIsSticky(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCartClick = () => {
    navigate("/productcart")
  }

  return (
    <header className={`navbar-container ${isSticky ? "fixed" : ""}`}>
      <div className="top-nav">
        <div className="more-brands-container">
          <button className="more-brands-btn">
            The Drip.co <span className="arrow-down"></span>
          </button>
          {/* Mobile Cart Icon */}
          <button className="mobile-cart-btn" onClick={handleCartClick}>
            <FaShoppingBag className="icon" />
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </button>
        </div>

        <div className="delivery-location">
          <span>Delivering to</span>
          <button className="add-location-btn">
            <FaMapMarkerAlt className="icon" /> Add delivery location
          </button>
        </div>

        <div className="top-nav-right">
          <button className="top-nav-btn">
            <FaPhoneAlt className="icon" /> SUPPORT
          </button>
          <button className="top-nav-btn">
            <FaUser className="icon" /> LOG IN
          </button>
          <button className="top-nav-btn wishlist">
            <FaHeart className="icon" />
          </button>
          <button className="top-nav-btn cart" onClick={handleCartClick}>
            <FaShoppingBag className="icon" />
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </button>
        </div>
      </div>

      <div className="main-nav">
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <FaBars />
        </div>

        <div className="logo-container">
        <Link to="/">
          <img src={logo || "/placeholder.svg"} alt="The goat" className="logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <ul>
            <li>
              <a href="#">PRODUCTS</a>
            </li>
            <li>
              <a href="#">NEW ARRIVALS</a>
            </li>
            <li>
              <a href="#">SPECIAL SIZES</a>
            </li>
            <li>
              <a href="#" className="sale-link">
                SALE
              </a>
            </li>
          </ul>
        </nav>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Your Happiness" className="search-input" />
        </div>

        <div className="express-delivery">
          <div className="delivery-text">
            <strong>SHOP NOW</strong>
          </div>
        </div>

        <div className="aditya-birla">
          <img src={adityaBirla || "/placeholder.svg"} alt="Aditya Birla Fashion" />
        </div>
      </div>
    </header>
  )
}

export default Navbar;
