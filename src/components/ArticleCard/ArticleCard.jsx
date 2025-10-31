import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../ArticleCard/ArticleCard.sass"

import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ArticleCard({ article, onSave, onUnsave, isSaved }) {
  const [swiped, setSwiped] = useState(false)
  const [action , setAction] = useState(null)
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const newAction = isSaved ? "unsave" : "save"
      setAction(newAction)
      setSwiped(true)

      setTimeout(() => {
        if (newAction === "save") onSave(article)
        else if (newAction === "unsave") onUnsave(article.url)
        setSwiped(false)
        setAction(null)
      }, 700)
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const img = article.multimedia && article.multimedia[0]?.url ? article.multimedia[0].url : null;

  return (
    <div 
      className={`article-card ${swiped ? "swiped" : ""} ${action === "unsave" ? "unsaveing" : ""}`}
      {...handlers}
    >
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="article-card__link" 
        onClick={e => {
          if (swiped) e.preventDefault()
        }}
      >
        <div className="article-card__card-inner">
          {img && <img src={img} alt={article.title} className="article-card__thumbnail" />}
          <div className="article-card__info">
            <h4>{article.title}</h4>
            <p>{article.abstract}</p>
          </div>
        </div>
      </a>

      <div className="article-card__saved-overlay">
        <span><FaCheck /> Saved</span>
      </div>

      <div className="article-card__unsaved-overlay">
        <span><MdDelete /> Removed</span>
      </div>
    </div>
  );
}