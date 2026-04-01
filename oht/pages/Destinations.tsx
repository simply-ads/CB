import React, { useState } from 'react';
import { destinations, launchArticles } from '../siteData';

const Destinations: React.FC = () => {
  const [active, setActive] = useState(destinations[0]);
  const related = launchArticles.filter((article) => article.destination.includes(active) || active === 'USA');

  return (
    <section className="section">
      <h1 className="page-title">Interactive Destination Map</h1>
      <p className="page-subtitle">Sepia map interactions styled as vintage postcards.</p>
      <div className="map-layout">
        <div className="vintage-map" aria-hidden="true">
          <div className="compass">✶</div>
          <div className="route" />
        </div>
        <aside className="postcard-panel">
          <h3>{active}</h3>
          <ul>
            {related.length ? related.map((article) => <li key={article.slug}>{article.title}</li>) : <li>Content coming soon.</li>}
          </ul>
        </aside>
      </div>
      <div className="chip-row">
        {destinations.map((item) => (
          <button key={item} className={`chip ${item === active ? 'active' : ''}`} onClick={() => setActive(item)}>
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Destinations;
