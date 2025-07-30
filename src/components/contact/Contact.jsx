import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact-us" id="contact">
      <div className="contact-content">
        <div className="contact-text">
          <div className="contact-main-content">
            <p>Got a question, a spark of an idea, or something that needs to be said?</p>

            <p>We’re listening.</p>

            <p>Whether it’s collaboration, inquiries or just a message.</p>

            <p>Every signal gets noticed.</p>

            <a>📩 contact@blench.xyz</a>
          </div>
          
          <p className="contact-closing">Let's forge something extraordinary together.</p>
        </div>
        
        <div className="contact-image">
          <img src="/contact.png" alt="Contact Blench" />
        </div>
      </div>
    </section>
  );
};

export default Contact;