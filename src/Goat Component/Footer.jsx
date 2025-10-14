import React from 'react';
import "../Goat Css/Footer.css"
const Footer = ()=> {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-column customer-care">
            <h3>CUSTOMER CARE</h3>
            <ul>
              <li><a href="#">Track an Order</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Exchanges & Returns</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">THE DRIPCO Premier</a></li>
              <li><a href="#">Payment</a></li>
            </ul>
          </div>
          <div className="footer-column about-us">
            <h3>ABOUT US</h3>
            <ul>
              <li><a href="#">About THE DRIPCO</a></li>
              <li><a href="#">People & Planet</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Policy</a></li>
              <li><a href="#">Affiliates</a></li>
            </ul>
          </div>
          <div className="footer-app-section">
            <h3>GET THE DRIPCO APP</h3>
            <p>Scan the QR code with your iOS or Android smartphone</p>
            <div className="qr-code-placeholder">
              {/* Placeholder for QR code; in production, use an img tag with actual QR */}
              <div className="qr-placeholder">QR Code</div>
            </div>
            
          </div>
          <div className="footer-payments">
            <h3>THE DRIPCO ACCEPTS</h3>
            <div className="payment-icons">
              {/* Icons for PhonePe, GPay, Paytm, Debit Card */}
              <img src="phonepe-icon.png" alt="PhonePe" />
              <img src="gpay-icon.png" alt="GPay" />
              <img src="paytm-icon.png" alt="Paytm" />
              <img src="debit-card-icon.png" alt="Debit Card" />
            </div>
            <h4>QR SCANNER FOR PAYMENT</h4>
            <div className="payment-qr-placeholder">
              {/* Placeholder for payment QR scanner/code */}
              <div className="qr-placeholder-payment">Scan QR for Payment</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="mr-porter-section">
            <h3>THE DRIPCO</h3>
            <p>Shop from over better brands & Customised T-shirts be dressed for any event</p>
            <a href="https://thedripco.store">VISIT THEDRIPCO.COM</a>
          </div>
          <div className="copyright-chat">
            <p className="copyright">© 2025 THE DRIPCO</p>
            <a href="https://wa.me/918919960631?text=hey%20i%20want%20to%20know%20more%20this%20brand%20!!" target="_blank" rel="noopener noreferrer" className="chat-button">Chat to an expert</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;