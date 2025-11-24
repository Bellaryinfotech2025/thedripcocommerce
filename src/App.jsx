import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import Navbar from "./Goat Component/Navbar";
import MainContent from "./Goat Component/MainComponent";
import Sidebar from "./Goat Component/Sidebar";
import Footer from "./Goat Component/Footer";

import Productlayout from "./productgridcomponent/productgrid1";
import Productlayout2 from "./productgridcomponent/productgrid2";
import Productlayout3 from "./productgridcomponent/productgrid3";
import ReutrnsCode from "./returnscomponent/returnscode";
import Designated from "./designatedcomponent/designatedcode";
 
import ProductCart from "./productaddedcartcomponent/productcart";
import { CartProvider } from "./context/CartContext";
 
import ScrollToTop from "./scrolltoptopcomponent/scrolltootop";
 
import CheckoutPage from "./Pages/CheckoutPage";
import AdminPanel from "./adminpanelcomponent/adminpanelcode";
import ProductlayoutMain from "./productgridcomponent/productlayoutmain";
import CategoryPage from "./productgridcomponent/CategoryPage";
import NewArrivals from "../src/Pages/NewArrivals";
import SupportPage from "./supportcomponent/supportpage.jsx";
// ADD THIS IMPORT
import Productpagemainwrapper from "../src/productsenlargecomponent/productpagemainwrapper.jsx";   
import MyOrders from "./myorderscomponent/myorderspage.jsx";

/* ---------- ProductRouter (OLD - keep exactly as it is) ---------- */
 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />

        <div className="App">
          <Navbar toggleSidebar={toggleSidebar} />
          {isSidebarOpen && <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />}

          <div className="app">
            <Routes>
              {/* Homepage */}
              <Route
                path="/"
                element={
                  <>
                    <br /><br /><br /><br /><br />
                    <MainContent />
                    <Productlayout />
                    <Designated />
                    <Productlayout2 />
                    <Productlayout3 />
                    <ProductlayoutMain />
                    <ReutrnsCode />
                  </>
                }
              />

              {/* OLD static product pages (keep them) */}
              
              {/* NEW DYNAMIC PRODUCT PAGE - ADD THIS LINE */}
              <Route path="/product/:id" element={<Productpagemainwrapper />} />

              {/* Cart */}
              <Route path="/productcart" element={<ProductCart />} />

              {/* Checkout */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Admin */}
              <Route path="/adminpanel" element={<AdminPanel />} />

              {/* Category */}
              <Route path="/category/:category" element={<CategoryPage />} />

              {/* New Arrivals */}
              <Route path="/new-arrivals" element={<NewArrivals />} />

               <Route path="/myaccount" element={<MyOrders />} />
                <Route path="/supportdripco" element={<SupportPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;