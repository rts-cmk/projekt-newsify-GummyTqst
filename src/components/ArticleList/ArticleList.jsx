import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import ArticleCard from "../ArticleCard/ArticleCard";
import "../ArticleList/ArticleList.sass"

export default function ArticlesList({ section, articles, onSave, defaultOpen }) {
  return (
    <details
      className="articles-list"
      name="news-category"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="articles-list__summary">
        {section} <IoChevronForwardOutline className="articles-list__icon" />
      </summary>

      <div className="articles-list__section-content">
        {articles?.length ? (
          articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArticleCard article={article} onSave={onSave} />
            </a>
          ))
        ) : (
          <p className="articles-list__empty">No articles</p>
        )}
      </div>
    </details>
  );
}
