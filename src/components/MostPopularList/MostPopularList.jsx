import ArticlesList from "../ArticleList/ArticleList";
import { POPULAR_PERIODS } from "../../Hooks/useNewsCatch"
import "../ArticleList/ArticleList.sass"

// Function to group articles by their section
function groupArticlesBySection(articles) {
    const grouped = {}
    const sections = ["world", "health", "business", "travel"]

    articles.forEach((article) => {
        const sectionName = article.section?.toLowerCase() || "Other"
        const normalizedSection = sectionName.charAt(0).toUpperCase() + sectionName.slice(1)

        if (sections.includes(sectionName)) {
            if (!grouped[normalizedSection]) {
                grouped[normalizedSection] = []
            }
            grouped[normalizedSection].push(article)
        }
    })
    return grouped
}

export default function MostPopularList({ popularNews, onSave, onUnsave, saved }) {
    const sortedPeriods = Object.keys(POPULAR_PERIODS)

    return (
        <div className="most-popular-container">
            <h2>Most Popular Articles</h2>

            {sortedPeriods.map((periodLabel) => {
                const articles = popularNews[periodLabel] || []
                const groupedSections = groupArticlesBySection(articles)

                return (
                    <details 
                        key={periodLabel}
                        className="articles-list articles-list--popular"
                        onToggle={(e) => {
                            const element = e.target
                            const openHeight = element.scrollHeight + "px"
                            element.style.height = element.open ? openHeight : "null"
                        }}
                    >
                        <summary className="articles-list__summary">
                            <h3 className="articles-list__section-header">{periodLabel}</h3>
                        </summary>

                        <div className="articles-list__section-content articles-list__section-content--nested">
                            {Object.entries(groupedSections).length > 0 ? (
                                // 2. Inner Dropdown: Health, World, Travel (uses your existing ArticleList)
                                Object.entries(groupedSections).map(([section, sectionArticles]) => (
                                    <ArticlesList
                                        key={section}
                                        section={section} // e.g., "World", "Health"
                                        articles={sectionArticles}
                                        onSave={onSave}
                                        onUnsave={onUnsave}
                                        saved={saved}
                                        defaultOpen={false}
                                    />
                                ))
                            ) : (
                                <p>No popular articles found for the defined sections in the {periodLabel} period.</p>
                            )}
                        </div>
                    </details>
                )
            })}
        </div>
    )
}