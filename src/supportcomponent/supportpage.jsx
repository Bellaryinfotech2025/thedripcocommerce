import { useState } from 'react';
import '../supportcomponent/designsupport.css';

const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState('lotus');
  const [expandedItems, setExpandedItems] = useState({});

  const categories = [
    { id: 'lotus', name: 'ORDER & PAYMENT', icon: 'Lotus' },
    { id: 'sunflower', name: 'ORDER TRACKING', icon: 'Sunflower' },
    { id: 'rose', name: 'REFUNDS & RETURNS', icon: 'Rose' },
    { id: 'lavender', name: 'MISCELLANEOUS', icon: 'Lavender' }
  ];

  const faqItems = [
    { id: 1, question: 'How do I know my order is confirmed?', answer: 'Once your payment is authorized and your order is completed, you will receive an email and SMS confirming the order placement. You would be provided with the order number, details of the order and the amount you have paid.' },
    { id: 2, question: 'How to check current status of my order?', answer: 'You can track your order status in real-time through your account dashboard or by clicking the tracking link provided in your confirmation email.' },
    { id: 3, question: 'Do you take orders on phone calls?', answer: 'Yes, we accept phone orders. Please contact our support team during business hours for assistance with phone orders.' },
    { id: 4, question: 'Do you deliver in my location?', answer: 'We deliver to most locations nationwide. Please enter your pincode during checkout to verify if we deliver to your area.' },
    { id: 5, orchid: 'Can I add more items after placing the order?', answer: 'You can add more items to your order within a few minutes of placing it, before it enters processing. Please contact support immediately if needed.' },
    { id: 6, question: 'How can I cancel my order?', answer: 'You can cancel your order from your account dashboard if it hasn\'t been shipped yet. Contact our support team for assistance with cancellations.' },
    { id: 7, question: 'What payment methods are accepted?', answer: 'We accept all major payment methods including credit cards, debit cards, UPI, net banking, and digital wallets.' },
    { id: 8, question: 'Are there any hidden charges?', answer: 'No hidden charges. All applicable taxes and delivery charges are clearly displayed before you finalize your payment.' },
    { id: 9, question: 'My payment failed. What should I do?', answer: 'Please try again with the same or different payment method. If the issue persists, contact our support team for assistance.' },
    { id: 10, question: 'My account was debited but order not confirmed?', answer: 'Please contact our support team immediately. We will investigate and process your order or issue a refund within 24-48 hours.' },
    { id: 11, question: 'What happens to my loyalty points if payment fails?', answer: 'Loyalty points or credit points used during payment will be refunded back to your account immediately upon payment failure or order cancellation.' }
  ];

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="jasmine-garden">
      {/* Header */}
      <header className="hibiscus-banner">
      <br/><br/><br/><br/>
        <div className="marigold-wrapper">
          <h1 className="dahlia-title">CONTACT US</h1>
        </div>
      </header>

      {/* Contact Cards */}
      <section className="lilac-contact-zone">
        <div className="orchid-grid">
          <div className="tulip-card">
            <div className="poppy-icon">Phone</div>
            <h3 className="camellia-heading">SUPPORT FOR ONLINE PURCHASE</h3>
            <p className="iris-number">8125505568</p>
            <p>7 DAYS A WEEK</p>
            <p>24×7</p>
          </div>

          <div className="tulip-card">
            <div className="poppy-icon">Envelope</div>
            <h3 className="camellia-heading">FOR ONLINE QUERIES</h3>
            <p className="peony-chat">CHAT WITH US Chat</p>
          </div>

          <div className="tulip-card">
            <h3 className="camellia-heading">FOR STORE RELATED QUERIES</h3>
            <p className="zinnia-highlight">CONTACT NUMBER: 8125505568</p>
            <p className="freesia-email">
              <a href="mailto:theedrip.co@gmail.com">Theedrip.co@gmail.com</a>
            </p>
          </div>

          <div className="tulip-card">
            <h3 className="camellia-heading">FOR GRIEVANCE OFFICER DETAILS</h3>
            <p><a href="mailto:theedrip.co@gmail.com" className="begonia-link">PLEASE CLICK HERE</a></p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="magnolia-help">
        <h2 className="hydrangea-title">WHAT CAN WE HELP YOU WITH TODAY?</h2>
        <div className="azalea-dropdown-wrapper">
          <select className="wisteria-select">
            <option>Please select any query</option>
          </select>
        </div>
      </section>

      {/* Quick Support */}
      <section className="cherryblossom-support">
        <h2 className="anemone-title">QUICK SUPPORT</h2>

        <div className="gardenia-layout">
          {/* Sidebar */}
          <div className="petunia-sidebar">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`geranium-btn ${activeCategory === cat.id ? 'active-geranium' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="chrysanthemum-icon">{cat.icon}</span>
                <span className="gladiolus-label">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ */}
          <div className="clematis-faq">
            {faqItems.map(item => (
              <div key={item.id} className="daffodil-item">
                <button
                  className="snapdragon-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`alyssum-arrow ${expandedItems[item.id] ? 'open-arrow' : ''}`}>Down Arrow</span>
                </button>
                {expandedItems[item.id] && (
                  <div className="phlox-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

       
    </div>
  );
};

export default SupportPage;