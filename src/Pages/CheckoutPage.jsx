"use client"
import { useState, useEffect } from "react"
import "../Pages/C.css"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

function CheckoutPage() {
    const { cartItems: cart, clearCart, getTotalPrice } = useCart()
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        address: "", city: "", state: "", zipCode: "", paymentMethod: "",
        cardNumber: "", cardName: "", expiry: "", cvv: "", upiId: ""
    })

    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")
    const [finalOrderItems, setFinalOrderItems] = useState([])
    const [finalTotal, setFinalTotal] = useState(0)

    const subtotal = getTotalPrice()
    const tax = Math.round(subtotal * 0.18)
    const shipping = 0
    const total = subtotal + tax + shipping

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleShippingSubmit = (e) => {
        e.preventDefault()
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
            !formData.address || !formData.city || !formData.state || !formData.zipCode) {
            alert("Please fill all required fields!")
            return
        }
        setStep(2)
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault()
        if (!formData.paymentMethod) {
            alert("Please select a payment method!")
            return
        }
        if (formData.paymentMethod === "card") {
            if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
                alert("Please fill all card details!")
                return
            }
        }
        if (formData.paymentMethod === "upi" && !formData.upiId.includes("@")) {
            alert("Enter valid UPI ID")
            return
        }

        // Generate Order
        const orderId = "ORD" + Date.now()
        const orderDate = new Date().toISOString().split('T')[0]
        const deliveryDate = new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0]

        const newOrder = {
            id: orderId,
            items: [...cart],
            total: total,
            subtotal: subtotal,
            tax: tax,
            shipping: shipping,
            status: "Processing",
            orderDate: orderDate,
            deliveryDate: deliveryDate,
            tracking: "TRACK" + Math.floor(Math.random() * 1000000),
            customer: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
            }
        }

        // Save to localStorage (persist forever)
        const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]")
        existingOrders.unshift(newOrder) // newest first
        localStorage.setItem("userOrders", JSON.stringify(existingOrders))

        // Show success
        setFinalOrderItems([...cart])
        setFinalTotal(total)
        setOrderNumber(orderId)
        setOrderPlaced(true)
        clearCart()
    }

    const handleBack = () => {
        if (step === 2) setStep(1)
        else navigate(-1)
    }

    const handleContinueShopping = () => navigate("/")

    if (cart.length === 0 && !orderPlaced) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px" }}>
                <p>Your bag is empty!</p>
                <button onClick={handleContinueShopping} style={{
                    padding: "12px 24px", background: "#000", color: "#fff",
                    border: "none", fontSize: "16px"
                }}>
                    Continue Shopping
                </button>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f9f9f9",
            padding: "0",
            margin: "0",
            position: "relative"
        }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
                 <br/> <br/> <br/> <br/> 

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid #eee",
                    background: "#fff"
                }}>
                    <h1 style={{ margin: 0, fontSize: "20px" }}>
                        Checkout {step === 1 ? "(1/2)" : "(2/2)"}
                    </h1>
                    <button onClick={handleBack} style={{
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer"
                    }}>
                        X
                    </button>
                </div>

                {orderPlaced ? (
                    <div style={{ background: "#fff", padding: "24px", marginTop: "20px" }}>
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <div style={{ width: "64px", height: "64px", margin: "0 auto 16px" }}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                            <h1 style={{ fontSize: "24px", margin: "0 0 8px" }}>Order Confirmed!</h1>
                            <p style={{ margin: "0", fontSize: "16px" }}>
                                Order No: <strong>{orderNumber}</strong>
                            </p>
                        </div>

                        <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                            <h3 style={{ fontSize: "18px", margin: "16px 0 8px" }}>Order Summary</h3>
                            {finalOrderItems.map(item => (
                                <div key={item.cartId} style={{
                                    display: "flex", justifyContent: "space-between", padding: "6px 0"
                                }}>
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: "1px solid #eee", margin: "12px 0", paddingTop: "8px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Subtotal:</span><span>₹{(finalTotal - tax - shipping).toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Tax (18%):</span><span>₹{tax.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Shipping:</span><span style={{ color: "green" }}>FREE</span>
                                </div>
                                <div style={{
                                    display: "flex", justifyContent: "space-between",
                                    fontWeight: "bold", fontSize: "18px", marginTop: "8px"
                                }}>
                                    <span>TOTAL PAID:</span>
                                    <span>₹{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "20px", fontSize: "13px", color: "#555" }}>
                            <p>[Mail] Confirmation sent to <strong>{formData.email}</strong></p>
                            <p>[Info] Tracking information coming soon</p>
                            <p>[Clock] Estimated delivery: 3-5 business days</p>
                        </div>

                        <button onClick={handleContinueShopping} style={{
                            width: "100%",
                            background: "#000",
                            color: "#fff",
                            padding: "14px",
                            border: "none",
                            fontSize: "16px",
                            marginTop: "20px"
                        }}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    // Your original checkout UI (unchanged)
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
                        {step === 1 && (
                            <div style={{ flex: "1", minWidth: "300px", background: "#fff", padding: "20px" }}>
                                <div style={{ marginBottom: "24px" }}>
                                    <h3 style={{ fontSize: "16px", margin: "0 0 12px", fontWeight: "600" }}>
                                        Your Items
                                    </h3>
                                    <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }}>
                                        {cart.map(item => (
                                            <div key={item.cartId} style={{
                                                display: "flex",
                                                gap: "12px",
                                                padding: "12px 0",
                                                borderBottom: "1px solid #eee"
                                            }}>
                                                <div style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    flexShrink: 0,
                                                    background: "#f5f5f5",
                                                    borderRadius: "8px",
                                                    overflow: "hidden"
                                                }}>
                                                    <img
                                                        src={item.image || "https://via.placeholder.com/70"}
                                                        alt={item.name}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1, fontSize: "14px" }}>
                                                    <div style={{ fontWeight: "500" }}>{item.name}</div>
                                                    <div style={{ color: "#666", margin: "4px 0" }}>
                                                        Qty: {item.quantity}
                                                        {item.size && ` • Size: ${item.size}`}
                                                        {item.color && ` • Color: ${item.color}`}
                                                    </div>
                                                    <div style={{ fontWeight: "600" }}>
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <form onSubmit={handleShippingSubmit}>
                                    <h2 style={{ fontSize: "18px", margin: "0 0 16px" }}>
                                        Shipping Information
                                    </h2>
                                    <div style={{ display: "grid", gap: "12px" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                            <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} required style={inputStyle} />
                                            <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required style={inputStyle} />
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required style={inputStyle} />
                                            <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleInputChange} required style={inputStyle} />
                                        </div>
                                        <input type="text" name="address" placeholder="Address *" value={formData.address} onChange={handleInputChange} required style={inputStyle} />
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                                            <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleInputChange} required style={inputStyle} />
                                            <input type="text" name="state" placeholder="State *" value={formData.state} onChange={handleInputChange} required style={inputStyle} />
                                            <input type="text" name="zipCode" placeholder="Zip *" value={formData.zipCode} onChange={handleInputChange} required style={inputStyle} />
                                        </div>
                                    </div>
                                    <button type="submit" style={{
                                        width: "100%",
                                        background: "#000",
                                        color: "#fff",
                                        padding: "12px",
                                        border: "none",
                                        marginTop: "16px",
                                        fontSize: "16px"
                                    }}>
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div style={{ flex: "1", minWidth: "300px", background: "#fff", padding: "20px" }}>
                                <form onSubmit={handlePaymentSubmit}>
                                    <h2 style={{ fontSize: "18px", margin: "0 0 16px" }}>
                                        Select Payment Method
                                    </h2>

                                    <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
                                        {["card", "upi", "netbanking", "emi", "cod"].map(method => (
                                            <label key={method} style={{
                                                display: "flex", alignItems: "center", gap: "10px",
                                                padding: "12px", border: "1px solid #ddd", borderRadius: "8px",
                                                background: formData.paymentMethod === method ? "#f0f0f0" : "transparent",
                                                cursor: "pointer"
                                            }}>
                                                <input type="radio" name="paymentMethod" value={method}
                                                    checked={formData.paymentMethod === method}
                                                    onChange={handleInputChange} />
                                                <span style={{ fontSize: "15px" }}>
                                                    {method === "card" ? "Credit/Debit Card" :
                                                     method === "upi" ? "UPI (Google Pay, PhonePe, etc.)" :
                                                     method === "netbanking" ? "Net Banking" :
                                                     method === "emi" ? "No Cost EMI" : "Cash on Delivery (COD)"}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    {formData.paymentMethod === "card" && (
                                        <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
                                            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} style={inputStyle} maxLength="19" />
                                            <input type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleInputChange} style={{ ...inputStyle, marginTop: "10px" }} />
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "10px" }}>
                                                <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} style={inputStyle} maxLength="5" />
                                                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} style={inputStyle} maxLength="4" />
                                            </div>
                                        </div>
                                    )}

                                    {formData.paymentMethod === "upi" && (
                                        <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
                                            <input type="text" name="upiId" placeholder="UPI ID (e.g. name@oksbi)" value={formData.upiId} onChange={handleInputChange} style={inputStyle} />
                                            <p style={{ fontSize: "13px", color: "#666", margin: "8px 0 0" }}>You will be redirected to your UPI app</p>
                                        </div>
                                    )}

                                    {formData.paymentMethod === "cod" && (
                                        <div style={{ borderTop: "1px solid #eee", padding: "20px 0", textAlign: "center" }}>
                                            <p style={{ fontSize: "16px" }}>Pay ₹{total.toLocaleString()} cash on delivery</p>
                                        </div>
                                    )}

                                    {(formData.paymentMethod === "netbanking" || formData.paymentMethod === "emi") && (
                                        <div style={{ borderTop: "1px solid #eee", padding: "20px 0", textAlign: "center" }}>
                                            <p>You will be redirected to your bank after placing the order</p>
                                        </div>
                                    )}

                                    <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                                        <button type="button" onClick={() => setStep(1)} style={{
                                            flex: 1, background: "#eee", color: "#000",
                                            padding: "12px", border: "none", fontSize: "15px"
                                        }}>
                                            Back
                                        </button>
                                        <button type="submit" style={{
                                            flex: 2, background: "#000", color: "#fff",
                                            padding: "12px", border: "none", fontSize: "16px"
                                        }}>
                                            {formData.paymentMethod === "cod" ? "Confirm Order" : `Pay ₹${total.toLocaleString()}`}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div style={{
                            flex: "0 0 320px",
                            background: "#fff",
                            padding: "16px",
                            position: "sticky",
                            top: "20px",
                            alignSelf: "flex-start",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                        }}>
                            <h2 style={{ fontSize: "18px", margin: "0 0 12px" }}>Order Summary</h2>
                            <div style={{ fontSize: "14px" }}>
                                {cart.map(item => (
                                    <div key={item.cartId} style={{
                                        display: "flex", justifyContent: "space-between", marginBottom: "6px"
                                    }}>
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: "1px dashed #ccc", margin: "10px 0", paddingTop: "8px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Subtotal:</span><span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Tax:</span><span>₹{tax.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Shipping:</span><span style={{ color: "green" }}>FREE</span>
                                    </div>
                                    <div style={{
                                        display: "flex", justifyContent: "space-between",
                                        fontWeight: "bold", marginTop: "8px"
                                    }}>
                                        <span>Total:</span><span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const inputStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    borderRadius: "6px"
}

export default CheckoutPage;