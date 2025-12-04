import { useState } from 'react';
import '../supportcomponent/designsupport.css';

const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState('ORDER_AND_PAYMENT');
  const [expandedItems, setExpandedItems] = useState({});

  const categories = [
    {
      id: 'ORDER_AND_PAYMENT',
       
    },
    {
      id: 'ORDER_TRACKING',
      
    },
    {
      id: 'REFUNDS',
      
    },
    {
      id: 'MISCELLANEOUS',
       
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'How do I know my order is confirmed?',
      answer: 'Once your payment is authorized and your order is completed, you will receive an email and SMS confirming the order placement. You would be provided with the order number, details of the order and the amount you have paid.'
    },
    {
      id: 2,
      question: 'How to check current status of my order?',
      answer: 'You can track your order status in real-time through your account dashboard or by clicking the tracking link provided in your confirmation email.'
    },
    {
      id: 3,
      question: 'Do you take orders on phonecalls',
      answer: 'Yes, we accept phone orders. Please contact our support team during business hours for assistance with phone orders.'
    },
    {
      id: 4,
      question: 'Do you deliver in my location?',
      answer: 'We deliver to most locations nationwide. Please enter your pincode during checkout to verify if we deliver to your area.'
    },
    {
      id: 5,
      question: 'Can I add more items after placing the order?',
      answer: 'You can add more items to your order within a few minutes of placing it, before it enters processing. Please contact support immediately if needed.'
    },
    {
      id: 6,
      question: 'How can I cancel my order?',
      answer: 'You can cancel your order from your account dashboard if it hasn\'t been shipped yet. Contact our support team for assistance with cancellations.'
    },
    {
      id: 7,
      question: 'What all payments methods accepted?',
      answer: 'We accept all major payment methods including credit cards, debit cards, UPI, net banking, and digital wallets.'
    },
    {
      id: 8,
      question: 'Any there any hidden charges or additional charges I pay?',
      answer: 'No hidden charges. All applicable taxes and delivery charges are clearly displayed before you finalize your payment.'
    },
    {
      id: 9,
      question: 'My Payment has failed? What should I do?',
      answer: 'Please try again with the same or different payment method. If the issue persists, contact our support team for assistance.'
    },
    {
      id: 10,
      question: 'My account has been debited but order not confirmed? What should I do?',
      answer: 'Please contact our support team immediately. We will investigate and process your order or issue a refund within 24-48 hours.'
    },
    {
      id: 11,
      question: 'What happens to my loyalty points/ credit points if the payment fails or order is cancelled?',
      answer: 'Loyalty points or credit points used during payment will be refunded back to your account immediately upon payment failure or order cancellation.'
    }
  ];

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="support-page">
      {/* Header Section */}
      <header className="support-header">
        <div className="header-content">
          <h1>CONTACT US</h1>
        </div>
      </header>

      {/* Contact Cards Section */}
      <section className="contact-section">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-icon">📞</div>
            <h3>SUPPORT FOR ONLINE PURCHASE</h3>
            <p className="phone-number">8125505568</p>
            <p>7 DAYS A WEEK</p>
            <p>24*7</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">✉️</div>
            <h3>FOR ONLINE QUERIES</h3>
            
            <p className="chat-link">CHAT WITH US 😊</p>
          </div>

          <div className="contact-card">
            <h3>FOR STORE RELATED QUERIES</h3>
            <p className="highlight-text">CONTACT NUMBER: 8125505568</p>
            <p className="email-link"><a href="mailto:theedrip.co@gmail.com">Theedrip.co@gmail.com</a></p>
          </div>

           

          

          <div className="contact-card">
            <h3>FOR GRIEVANCE OFFICER DETAILS</h3>
            <p><a href="theedrip.co@gmail.com" className="link">PLEASE CLICK HERE</a></p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="help-section">
        <h2>WHAT CAN WE HELP YOU WITH TODAY?</h2>
        <div className="dropdown-container">
          <select className="dropdown-select">
            <option>Please select any query</option>
          </select>
        </div>
      </section>

      {/* Quick Support Section */}
      <section className="quick-support-section">
        <h2>QUICK SUPPORT</h2>
        
        <div className="support-container">
          {/* Sidebar Categories */}
          <div className="support-sidebar">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="faq-container">
            {faqItems.map(item => (
              <div key={item.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`chevron ${expandedItems[item.id] ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedItems[item.id] && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="chat-widget">
        <span>Hey! How may I help you?</span>
      </div>
    </div>
  );
};

export default SupportPage;