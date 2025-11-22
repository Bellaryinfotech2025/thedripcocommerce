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
import ProductPage from "./productsenlargecomponent/productspage1";
import ProductPage2 from "./productsenlargecomponent/productpage2";
import ProductCart from "./productaddedcartcomponent/productcart";
import { CartProvider } from "./context/CartContext";
import ProductPage3 from "./productsenlargecomponent/productpage3";
import ProductPage4 from "./productsenlargecomponent/productpage4";
import ProductPage5 from "./productsenlargecomponent/productpage5";
import ProductPage6 from "./productsenlargecomponent/productpage6";
import ScrollToTop from "./scrolltoptopcomponent/scrolltootop";
import ProductPage7 from "./productsenlargecomponent/productpage7";
import ProductPage8 from "./productsenlargecomponent/productpage8";
import ProductPage9 from "./productsenlargecomponent/productpage9";
import ProductPage10 from "./productsenlargecomponent/productpage10";
import ProductPage11 from "./productsenlargecomponent/productpage11";
import ProductPage12 from "./productsenlargecomponent/productpage12";
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
const ProductRouter = () => {
  const { id } = useParams();
  const pageStyle = { marginTop: "120px" };

  if (id === "1") return <div style={pageStyle}><ProductPage /></div>;
  if (id === "2") return <div style={pageStyle}><ProductPage2 /></div>;
  if (id === "3") return <div style={pageStyle}><ProductPage3 /></div>;
  if (id === "4") return <div style={pageStyle}><ProductPage4 /></div>;
  if (id === "5") return <div style={pageStyle}><ProductPage5 /></div>;
  if (id === "6") return <div style={pageStyle}><ProductPage6 /></div>;
  if (id === "7") return <div style={pageStyle}><ProductPage7 /></div>;
  if (id === "8") return <div style={pageStyle}><ProductPage8 /></div>;
  if (id === "9") return <div style={pageStyle}><ProductPage9 /></div>;
  if (id === "10") return <div style={pageStyle}><ProductPage10 /></div>;
  if (id === "11") return <div style={pageStyle}><ProductPage11 /></div>;
  if (id === "12") return <div style={pageStyle}><ProductPage12 /></div>;

  return <h2 style={{ textAlign: "center", marginTop: "150px" }}>Product not found</h2>;
};

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
              <Route path="/products/:id" element={<ProductRouter />} />

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