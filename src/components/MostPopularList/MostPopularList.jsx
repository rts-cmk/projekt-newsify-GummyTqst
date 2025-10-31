import ArticlesList from "../ArticleList/ArticleList";
import { POPULAR_PERIODS } from "../../Hooks/useNewsCatch"
import "../ArticleList/ArticleList.sass"
import "../MostPopularList/MostPopularList.sass"


export default function MostPopularList({ popularNews, onSave, onUnsave, saved }) {
    const sortedPeriods = Object.keys(POPULAR_PERIODS)

    return (
        <div className="most-popular-container">
            <div className="most-popular-container__scroll">
                {sortedPeriods.map((periodLabel, i) => {
                    const articles = popularNews[periodLabel] || []

                    return (
                        <details 
                            key={periodLabel}
                            className="articles-list articles-list--popular"
                        >
                            <summary className="articles-list__summary">
                                <h3 className="articles-list__section-header">{periodLabel}</h3>
                            </summary>

                            <div className="articles-list__section-content">
                                {articles.length > 0 ? (
                                    <ArticlesList
                                        section={periodLabel}
                                        articles={articles}
                                        onSave={onSave}
                                        onUnsave={onUnsave}
                                        saved={saved}
                                        defaultOpen={true}
                                    />
                                ) : (
                                    <p>No popular articles found for {periodLabel.toLowerCase()}.</p>
                                )}
                            </div>
                        </details>
                    )
                })}
            </div>
        </div>
    )
}