// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Goat Component/Navbar';
import MainContent from './Goat Component/MainComponent';
import Sidebar from './Goat Component/Sidebar';
import Footer from './Goat Component/Footer';

import Productlayout from './productgridcomponent/productgrid1';
import ProductDetail from './productdetailcomponent/productdetail';
import Productlayout2 from './productgridcomponent/productgrid2';
import Productlayout3 from './productgridcomponent/productgrid3';
import ReutrnsCode from './returnscomponent/returnscode';
import Designated from './designatedcomponent/designatedcode';
import ProductPage from './productsenlargecomponent/productspage1';
import { CartProvider } from './context/CartContext';
import ProductCart from './productaddedcartcomponent/productcart';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Navbar toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />}
        
        <div className="app">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={
              <>
              <br/><br/><br/><br/><br/>
                <MainContent />
                
                <Productlayout />
                <Designated />
                <Productlayout2 />
                <Productlayout3 />
                <ReutrnsCode />
              </>
            } />

            {/* Product detail page */}
             
            <Route path="/products" element={
              <>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
              
              <ProductPage />
              
               </>
              }
                
               />

                <Route path="/productcart" element={<ProductCart />} />



          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
