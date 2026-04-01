import React from 'react';

const items = [
  'Hollywood in Kodachrome — Coffee Table Edition',
  'Mid-Century Riviera Travel Guides',
  'Classic Cinema Europe Atlas',
  'Vintage Luggage Tags (Set)',
];

const Shop: React.FC = () => (
  <section className="section">
    <h1 className="page-title">Old Hollywood Travel Shop</h1>
    <div className="poster-grid">
      {items.map((item) => (
        <article key={item} className="mini-poster wood">
          <p className="meta">Staff Pick</p>
          <h3>{item}</h3>
          <button className="ticket-btn">View on Amazon</button>
        </article>
      ))}
    </div>
  </section>
);

export default Shop;
