import React from 'react';
import { stars } from '../siteData';

const Stars: React.FC = () => (
  <section className="section">
    <h1 className="page-title">Travel by Star</h1>
    <div className="poster-grid">
      {stars.map((star) => (
        <article key={star} className="star-film-still">
          <div className="portrait" aria-hidden="true" />
          <h3>{star}</h3>
        </article>
      ))}
    </div>
  </section>
);

export default Stars;
