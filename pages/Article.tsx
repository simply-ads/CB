import React from 'react';
import { useParams } from 'react-router-dom';
import { launchArticles } from '../siteData';

const Article: React.FC = () => {
  const { slug } = useParams();
  const article = launchArticles.find((entry) => entry.slug === slug) ?? launchArticles[0];

  return (
    <article className="section article-layout">
      <header className="article-hero">
        <p className="meta">{article.decade} · {article.readTime}</p>
        <h1 className="page-title">{article.title}</h1>
        <p>{article.teaser}</p>
      </header>
      <blockquote>
        “Classic Hollywood didn’t just entertain us — it taught us how to travel romantically.”
      </blockquote>
      <p>
        This template is designed for long-form editorial storytelling: ornate typography, warm background,
        title-card pull quotes, destination tags, and watchlist modules.
      </p>
      <div className="chip-row">
        <span className="chip active">{article.destination}</span>
        <span className="chip">Series: Rat Pack Grand Tour</span>
      </div>
    </article>
  );
};

export default Article;
