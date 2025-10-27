import React from "react";
import useNewsCache from "../Hooks/useNewsCatch";
import ArticlesList from "../components/ArticleList/ArticleList";

export default function Home() {
  const { news, loading, error, saveArticle, unsaveArticle, saved, SECTIONS } = useNewsCache();

  return (
    <div className="home-news">
      <input type="text" placeholder="Search news..." className="search-box" />

      {loading && <p className="status">Loading latest news...</p>}
      {error && <p className="status error">{error.message}</p>}

      {SECTIONS.map((section, i) => (
        <ArticlesList
          key={section}
          section={section}
          articles={news[section] || []}
          onSave={saveArticle}
          onUnsave={unsaveArticle}
          saved={saved}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
