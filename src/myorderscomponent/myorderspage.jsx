import { useState, useMemo, useEffect } from "react"
import "../myorderscomponent/myordersdesign.css"
import { Link } from "react-router-dom"
import { CiMenuFries } from "react-icons/ci";

const MyOrders = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState("account")
  const [searchTerm, setSearchTerm] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    document.body.classList.add("hide-navbar-on-mobile")
    const saved = JSON.parse(localStorage.getItem("userOrders") || "[]")
    setOrders(saved)
    return () => {
      document.body.classList.remove("hide-navbar-on-mobile")
    }
  }, [])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = searchTerm.toLowerCase()
      const hasItemMatching = order.items.some(item => 
        item.name.toLowerCase().includes(search)
      )
      return search === "" ||
        order.id.toLowerCase().includes(search) ||
        hasItemMatching ||
        order.customer.name.toLowerCase().includes(search)
    })
  }, [orders, searchTerm])

  const handleLogout = () => {
    if (onLogout) onLogout()
    window.location.href = "/"
  }

  const handleMenuClick = (view) => {
    setCurrentView(view)
    setMenuOpen(false)
  }

  return (
    <div className="zebra-account_order_container">
      <div className="eagle-sidebar_header">
        <button className="penguin-hamburger_toggle" onClick={() => setMenuOpen(!menuOpen)}>
         <CiMenuFries/>
        </button>
        <div className="lion-profile_title">My Account</div>
      </div>

      <div className={`dolphin-sidebar_wrapper ${menuOpen ? "dolphin-sidebar_open" : ""}`}>
        <div className="tiger-profile_section">
          <div className="panda-profile_info">
            <div className="cheetah-profile_name">MDKHAJA</div>
            <div className="leopard-profile_phone">+91 9353186909</div>
          </div>
        </div>

        <nav className="butterfly-menu_container">
          <button className={`fox-menu_item ${currentView === "account" ? "fox-menu_active" : ""}`} onClick={() => handleMenuClick("account")}>
            <span>MY ACCOUNT</span>
          </button>
          <button className={`fox-menu_item ${currentView === "orders" ? "fox-menu_active" : ""}`} onClick={() => handleMenuClick("orders")}> 
            <span>MY ORDERS</span>
          </button>
          <button className="fox-menu_item fox-menu_logout" onClick={handleLogout}>
            <span>LOGOUT</span>
          </button>
        </nav>
      </div>

      {currentView === "account" && (
        <div className="hawk-main_content">
          <div className="parrot-breadcrumb">
            <Link to="/" style={{textDecoration:'none'}}>
              <span className="sparrow-breadcrumb_home">Home</span>
            </Link>
            <span className="raven-breadcrumb_separator">›</span>
            <span className="owl-breadcrumb_current">My Account</span>
          </div>

          <div className="phoenix-account_header">
            <h1 className="swan-greeting_text">Hello, Mdkhaja Moin!</h1>
          </div>

          <div className="peacock-account_section">
            <div className="crow-section_header">
              <h2>PERSONAL INFORMATION</h2>
              <button className="hummingbird-edit_btn">Edit</button>
            </div>
            <div className="finch-info_card">
              <div className="albatross-info_row">
                <div className="canary-info_column">
                  <label>Name</label>
                  <p className="cardinal-info_value">Mdkhaja Moin</p>
                </div>
                <div className="canary-info_column">
                  <label>Gender</label>
                  <p className="cardinal-info_value">Male</p>
                </div>
              </div>
              <div className="albatross-info_row">
                <div className="canary-info_column">
                  <label>Date Of Birth</label>
                  <p className="cardinal-info_value">31.07.2002</p>
                </div>
              </div>
            </div>
          </div>

          <div className="peacock-account_section">
            <div className="crow-section_header">
              <h2>CONTACT INFORMATION</h2>
              <button className="hummingbird-edit_btn">Edit</button>
            </div>
            <div className="finch-info_card">
              <div className="albatross-info_row">
                <div className="canary-info_column">
                  <label>Primary Mobile Number</label>
                  <p className="cardinal-info_value">+91 9353186909</p>
                </div>
                <div className="canary-info_column">
                  <label>Email Id</label>
                  <div className="flamingo-email_section">
                    <p className="cardinal-info_value">mdkhaja50489@gmail.com</p>
                    <a href="#" className="ostrich-verify_link">Verify your Email</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === "orders" && (
        <div className="hawk-main_content">
          <div className="parrot-breadcrumb">
            <span className="sparrow-breadcrumb_home">Home</span>
            <span className="raven-breadcrumb_separator">›</span>
            <span className="owl-breadcrumb_current">My Orders</span>
          </div>

          <div className="mongoose-orders_header">
            <h1>MY ORDERS</h1>
          </div>

          <div className="jackal-search_section">
            <input
              type="text"
              className="badger-search_input"
              placeholder="Search Order"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredOrders.length === 0 ? (
            <div className="vulture-empty_state">
              <div className="lynx-empty_icon">Package</div>
              <p className="meerkat-empty_text">Uh-oh, no orders found</p>
              <button className="cobra-reset_filters_btn" onClick={() => setSearchTerm("")}>
                Clear search
              </button>
            </div>
          ) : (
            <div className="squirrel-orders_list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="koala-order_card">
                  <div className="giraffe-order_header">
                    <div className="zebra-order_id_brand">
                      <span className="porcupine-order_id">{order.id}</span>
                      <span className="hedgehog-order_brand">
                        {order.items.length} Item{order.items.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className={`sloth-order_status sloth-status_${order.status.toLowerCase().replace(" ", "_")}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="antelope-order_product">
                    <span className="gazelle-product_name">
                      {order.items[0].name}{order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </span>
                    <span className="wildebeest-product_amount">₹{order.total.toLocaleString()}</span>
                  </div>

                  <div className="camel-order_tracking">
                    <div className="bison-tracking_item">
                      <span className="elk-tracking_label">Tracking:</span>
                      <span className="moose-tracking_number">{order.tracking}</span>
                    </div>
                    <div className="bison-tracking_item">
                      <span className="elk-tracking_label">Expected Delivery:</span>
                      <span className="deer-tracking_date">{order.deliveryDate}</span>
                    </div>
                  </div>

                  <div className="buffalo-order_dates">
                    <span className="impala-date_item">Order: {order.orderDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="emu-continue_shopping_btn" onClick={() => (window.location.href = "/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default MyOrders;