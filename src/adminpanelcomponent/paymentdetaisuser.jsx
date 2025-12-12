import React, { useState, useEffect } from "react";
import axios from "axios";  
import "../adminpanelcomponent/paymentdesign.css";
import API_NATURAL from "../config/api";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCheckboxState = (paymentId, key) => {
    return localStorage.getItem(`${paymentId}_${key}`) === "true";
  };

  const saveCheckboxState = (paymentId, key, value) => {
    localStorage.setItem(`${paymentId}_${key}`, value);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${API_NATURAL.API_ECO}/api/payments/all`);
        const data = Array.isArray(res.data) ? res.data : [];
        const updatedData = data.map((payment) => ({
          ...payment,
          orderPlaced: loadCheckboxState(payment.id, "orderPlaced"),
          orderPacked: loadCheckboxState(payment.id, "orderPacked"),
        }));
        setPayments(updatedData);
        setFilteredPayments(updatedData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch payments error:", err);
        setError("Failed to load payments. Check backend or network console.");
        setPayments([]);
        setFilteredPayments([]);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPayments(payments);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const filtered = payments.filter((p) =>
      Object.values(p).some(
        (value) => value != null && value.toString().toLowerCase().includes(lower)
      )
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  if (loading) return <div className="paymentDash-loading">Loading...</div>;
  if (error) return <div className="paymentDash-error">{error}</div>;

  return (
    <div className="paymentDash-container">
      <br /><br /><br /><br />

      <h1 className="paymentDash-heading">Payment Details Dashboard</h1>

      <div className="paymentDash-searchSection">
        <input
          type="text"
          placeholder="Search by any field (payment ID, email, name, phone...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="paymentDash-searchInput"
        />
      </div>

      <div className="paymentDash-tableWrapper">
        <table className="paymentDash-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Razorpay Order</th>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Bank RRN</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Signature</th>
              <th>Created At</th>
              <th>Order Placed</th>
              <th>Order Packed</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="18" style={{ textAlign: "center" }}>No payments found</td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.paymentId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.razorpayOrderId}</td>
                  <td>{payment.userId}</td>
                  <td>{payment.productId}</td>
                  <td>{payment.bankRrn}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.currency}</td>
                  <td>
                    <span
                      className={
                        payment.status === "paid"
                          ? "tag-paid"
                          : payment.status === "failed"
                          ? "tag-failed"
                          : "tag-pending"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.customerName}</td>
                  <td>{payment.customerEmail}</td>
                  <td>{payment.customerPhone}</td>
                  <td>{payment.signature}</td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>

                  <td>
                    <input
                      type="checkbox"
                      checked={payment.orderPlaced || false}
                      onChange={(e) => {
                        const value = e.target.checked;
                        saveCheckboxState(payment.id, "orderPlaced", value);
                        setPayments((prev) =>
                          prev.map((p) =>
                            p.id === payment.id ? { ...p, orderPlaced: value } : p
                          )
                        );
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={payment.orderPacked || false}
                      onChange={(e) => {
                        const value = e.target.checked;
                        saveCheckboxState(payment.id, "orderPacked", value);
                        setPayments((prev) =>
                          prev.map((p) =>
                            p.id === payment.id ? { ...p, orderPacked: value } : p
                          )
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;