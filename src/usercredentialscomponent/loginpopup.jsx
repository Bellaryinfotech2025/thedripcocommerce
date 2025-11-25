// src/usercredentialscomponent/loginpopup.jsx
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../usercredentialscomponent/logindesignppup.css";
import axios from "axios";
import { setUserIdCookie } from "../usercredentialscomponent/logincoookieauth"; // <- write cookie here

const login_url = "http://localhost:6161/api/v2";

const DripLoginPopup = ({ onClose, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || phone.length !== 10) {
      alert("Please enter valid name and 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      // include credentials in case your backend sets cookies or expects them
      const res = await axios.post(
        `${login_url}/users`,
        {
          name: name.trim(),
          phoneNumber: phone
        },
        { withCredentials: true }
      );

      // Backend might return shape A or B:
      // A: { userId: "123456" }
      // B: { id: 1, userId: "123456", name: "...", ... }
      // We'll accept either. If server returns something else, try to find userId robustly.
      const data = res && res.data ? res.data : null;
      let returnedUserId = null;

      if (data) {
        // Common: data.userId
        if (data.userId) returnedUserId = data.userId;
        // Some servers nest result: data.data.userId
        else if (data.data && data.data.userId) returnedUserId = data.data.userId;
        // Fallback: if server returns only a string or number
        else if (typeof data === "string" || typeof data === "number") returnedUserId = String(data);
      }

      if (!returnedUserId) {
        // If we could not extract userId, try to fetch it using phone number (less ideal)
        // But to avoid extra calls, we will still proceed and call onRegisterSuccess, and let global check validate later.
        console.warn("No userId found in response. Registration might still succeed, but cookie won't be set.");
        onRegisterSuccess();
        return;
      }

      // Persist cookie for long-lived login
      setUserIdCookie(returnedUserId);

      // notify parent
      onRegisterSuccess();
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dripco_popup_overlay">
      <div className="dripco_popup_container">
        <button className="dripco_close_btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <h2 className="dripco_popup_title">LOG IN / SIGN UP</h2>
        <p className="dripco_popup_subtitle">Join Now for Seamless Shopping Experience</p>

        <div className="dripco_benefits">
          <p>Easy order tracking</p>
          <p>Manage return and exchange within 15-days</p>
          <p>Exclusive deals and additional benefit</p>
        </div>

        <div className="dripco_input_group">
          <label>FULL NAME*</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="dripco_input_group">
          <label>MOBILE NUMBER*</label>
          <input
            type="text"
            placeholder="+91 Enter 10 digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            maxLength="10"
          />
        </div>

        <p className="dripco_terms">
          By Continuing, I agree to the <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
        </p>

        <button
          className="dripco_register_btn"
          onClick={handleRegister}
          disabled={loading}
          style={{ opacity: loading || !name || phone.length !== 10 ? 0.6 : 1 }}
        >
          {loading ? "Registering..." : "REGISTER WITH DRIPCO"}
        </button>
      </div>
    </div>
  );
};

export default DripLoginPopup;
