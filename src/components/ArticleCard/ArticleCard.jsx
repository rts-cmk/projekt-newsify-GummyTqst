import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../ArticleCard/ArticleCard.sass"

export default function ArticleCard({ article, onSave }) {
  const [swiped, setSwiped] = useState(false)
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwiped(true)
      setTimeout(() => {
        onSave(article)
        setSwiped(false)
      }, 700)
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const img = article.multimedia && article.multimedia[0]?.url ? article.multimedia[0].url : null;

  return (
    <div className={`article-card ${swiped ? "swiped" : ""}`} {...handlers}>
      <div className="article-card__card-inner">
        {img && <img src={img} alt={article.title} className="article-card__thumbnail" />}
        <div className="article-card__info">
          <h4>{article.title}</h4>
          <p>{article.abstract}</p>
        </div>
      </div>

      <div className="article-card__saved-overlay">
        <span>✓ Saved</span>
      </div>
    </div>
  );
}