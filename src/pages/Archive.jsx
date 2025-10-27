import React from "react";
import useNewsCache from "../Hooks/useNewsCatch";
import ArticleCard from "../components/ArticleCard/ArticleCard";

export default function Archive() {
    const { saved, unsaveArticle } = useNewsCache();

    return (
        <div className="saved-page" style={{ padding: "16px" }}>
            <h2>Saved Articles</h2>
            {saved.length === 0 ? (
                <p>No saved articles yet.</p>
            ) : (
            saved.map((article) => (
                <ArticleCard
                    key={article.url}
                    article={article}
                    onSave={() => {}}
                    onUnsave={unsaveArticle}
                    isSaved={true}
                />
            ))
            )}
      </div>
    );
}
