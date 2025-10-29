import React, { useEffect, useState } from "react";
import useNewsCache from "../Hooks/useNewsCatch";
import ArticlesList from "../components/ArticleList/ArticleList";
import Search from "../components/Search/Search"

export default function Home() {
  const { news, loading, error, saveArticle, unsaveArticle, saved, SECTIONS } = useNewsCache();
  const [visibleSections, setVisibleSections] = useState(SECTIONS);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("visibleSections"))
        if (saved) setVisibleSections(saved)
    }, [])

  return (
    <div className="home-news">
      <Search />

      {loading && <p className="status">Loading latest news...</p>}
      {error && <p className="status error">{error.message}</p>}

      {visibleSections.map((section, i) => (
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
