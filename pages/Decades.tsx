import React from 'react';

const decades = [
  { label: '1920s–30s', subtitle: 'The Pre-Code Era' },
  { label: '1940s', subtitle: 'Wartime Hollywood' },
  { label: '1950s', subtitle: 'The Golden Age' },
  { label: '1960s', subtitle: 'New Hollywood Begins' },
];

const Decades: React.FC = () => (
  <section className="section">
    <h1 className="page-title">Browse by Era</h1>
    <div className="timeline">
      {decades.map((decade) => (
        <article key={decade.label} className="timeline-card">
          <h3>{decade.label}</h3>
          <p>{decade.subtitle}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Decades;
