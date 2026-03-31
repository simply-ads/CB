import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { launchArticles, navItems } from '../siteData';

const Layout: React.FC = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return launchArticles.filter((article) => article.title.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  return (
    <div className="toh-site">
      <div className="paper-grain" aria-hidden="true" />
      <header className="toh-header">
        <Link to="/" className="logo-mark">Travel Old Hollywood</Link>
        <nav className="marquee-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="ticket-btn" onClick={() => setOpen((prev) => !prev)}>
          Search
        </button>
      </header>

      {open && (
        <section className="search-overlay">
          <div className="search-card">
            <label htmlFor="search">Card catalogue search</label>
            <input
              id="search"
              placeholder="Find stars, destinations, films..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ul>
              {results.length === 0 && query ? <li>No matching articles yet.</li> : null}
              {results.map((result) => (
                <li key={result.slug}>
                  <Link to={`/articles/${result.slug}`} onClick={() => setOpen(false)}>
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="toh-footer">
        <p>Travel Old Hollywood · In the footsteps of the stars.</p>
        <Link to="/newsletter" className="ticket-btn">Classic Hollywood travel, delivered to your inbox.</Link>
      </footer>
    </div>
  );
};

export default Layout;
