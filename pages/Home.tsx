import React from 'react';
import { Link } from 'react-router-dom';
import { launchArticles, stars } from '../siteData';

const Home: React.FC = () => {
  const featured = launchArticles.slice(0, 4);
  const latest = launchArticles.slice(4);

  return (
    <>
      <section className="hero-poster">
        <div className="hero-copy">
          <p className="eyebrow">Travel Inspiration from Hollywood's Golden Age</p>
          <h1>TRAVEL OLD HOLLYWOOD</h1>
          <p className="script">In the footsteps of the stars</p>
          <Link to="/destinations" className="ticket-btn">Explore Journeys</Link>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="sunset-slice" />
          <div className="coast-road" />
        </div>
      </section>

      <section className="section angled">
        <h2>Start Here</h2>
        <div className="poster-grid">
          {featured.map((article) => (
            <article key={article.slug} className="mini-poster">
              <p className="meta">{article.destination}</p>
              <h3>{article.title}</h3>
              <p>{article.teaser}</p>
              <Link to={`/articles/${article.slug}`} className="ticket-btn">Read More</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Travel by Star</h2>
        <div className="star-row">
          {stars.map((star) => (
            <div key={star} className="star-card">
              <div className="portrait" aria-hidden="true" />
              <p>{star}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section angled">
        <h2>Latest Articles</h2>
        <div className="latest-grid">
          {latest.map((article) => (
            <article key={article.slug} className="lobby-card">
              <h3>{article.title}</h3>
              <p>{article.teaser}</p>
              <small>{article.readTime} · {article.decade}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section telegram">
        <h2>Newsletter Ticket</h2>
        <p>Classic Hollywood travel, delivered to your inbox.</p>
        <div className="ticket-form">
          <input placeholder="Your email" />
          <button className="ticket-btn">Stamp & Subscribe</button>
        </div>
      </section>
    </>
  );
};

export default Home;
