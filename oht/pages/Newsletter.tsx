import React from 'react';

const Newsletter: React.FC = () => (
  <section className="section telegram">
    <h1 className="page-title">Newsletter Signup</h1>
    <p>Classic Hollywood travel, delivered to your inbox.</p>
    <div className="ticket-form">
      <input placeholder="Your best email" />
      <button className="ticket-btn">Join the List</button>
    </div>
  </section>
);

export default Newsletter;
