import useNewsCache from "../Hooks/useNewsCatch"
import MostPopularList from "../components/MostPopularList/MostPopularList"


export default function Popular() {
    const { popularNews, loading, error, saveArticle, unsaveArticle, saved } = useNewsCache()

    return (
        <div className="popular-page">
            <h1>Most Popular Articles</h1>

            {loading && <p className="status">Loading most popular news...</p>}
            {error && <p className="status error">{error?.message}</p>}
            
            <MostPopularList
                popularNews={popularNews}
                saved={saved}
                onSave={saveArticle}
                onUnsave={unsaveArticle}
            />
        </div>
    )
}