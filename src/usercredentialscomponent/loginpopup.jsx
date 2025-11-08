// src/components/DripLoginPopup.jsx
import { FaTimes } from "react-icons/fa";
import "../usercredentialscomponent/logindesignppup.css";

const DripLoginPopup = ({ onClose }) => {
  return (
    <div className="dripco_popup_overlay">
      <div className="dripco_popup_container">
        <button className="dripco_close_btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <h2 className="dripco_popup_title">LOG IN / SIGN UP</h2>
        <p className="dripco_popup_subtitle">Join Now for Seamless Shopping Experience</p>

        <div className="dripco_benefits">
          <p>Check Easy order tracking</p>
          <p>Check Manage return and exchange within 15-days</p>
          <p>Check Exclusive deals and additional benefit</p>
        </div>

        <div className="dripco_input_group">
          <label>MOBILE NUMBER*</label>
          <input type="text" placeholder="+91 Enter 10 digit mobile number" />
        </div>

        <p className="dripco_terms">
          By Continuing, I agree to the <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
        </p>

        <button className="dripco_register_btn">REGISTER WITH DRIPCO</button>
      </div>
    </div>
  );
};

export default DripLoginPopup;