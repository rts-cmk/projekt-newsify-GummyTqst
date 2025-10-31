import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import ArticleCard from "../ArticleCard/ArticleCard";
import logo from "../../assets/img/logo.png"
import "../ArticleList/ArticleList.sass"

export default function ArticlesList({ section, articles, onSave, onUnsave, saved, defaultOpen=false }) {

    const handleToggle = event => {
        const element = event.target

        const openHeight = element.scrollHeight + 'px';

        element.style.height = element.open ? openHeight : null 
    }

  return (
    <details
        onToggle={handleToggle}
        className="articles-list"
        name="news-category"
        {...(defaultOpen ? { open: true } : {})}
    >
        <summary className="articles-list__summary">
            <div className="articles-list__section-header">
                <img src={logo} alt="Logo" className="articles-list__logo" />
                {section}
            </div>
             <IoChevronForwardOutline className="articles-list__icon" />
        </summary>

        <div className="articles-list__section-content">
            {articles?.length ? (
                articles.map((article) => {
                    const isSaved = saved?.some((a) => a.url === article.url);

                    return (
                        <ArticleCard
                            key={article.url}
                            article={article}
                            onSave={onSave}
                            onUnsave={onUnsave}
                            isSaved={isSaved}
                        />
                    );
                })
            ) : (
                <p className="articles-list__empty">No articles</p>
            )}
        </div>
    </details>
  );
}
