import { useState, useEffect, useRef } from "react";
import { fetchSection, fetchPopular } from "../API/api";

const LS_KEY = "newsify_cache_v1";
const SAVED_KEY = "newsify_saved_v1";
const SECTIONS = ["world", "health", "business", "travel"];
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const POPULAR_PERIODS = {
    'Today': 1,
    'This Week': 7,
    'This Month': 30
}

export default function useNewsCache() {
    const [news, setNews] = useState({});
    const [popularNews, setPopularNews] = useState({})
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetching = useRef(false);

    useEffect(() => {
        const cached = JSON.parse(localStorage.getItem(LS_KEY));
        const savedArticles = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
        setSaved(savedArticles);

        if (cached && Date.now() - cached.timestamp < REFRESH_INTERVAL) {
            setNews(cached.sections);
            setPopularNews(cached.popular || {})
        } else {
            refreshData();
        }

        const interval = setInterval(() => refreshData(), REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    async function refreshData() {
        if (fetching.current) return;
        fetching.current = true;
        setLoading(true);
        try {
            // Top Stories Fetch
            const results = {};
            const promises = SECTIONS.map((s) =>
                fetchSection(s).then((r) => ({ s, r }))
            );
            const resolved = await Promise.all(promises);
            resolved.forEach(({ s, r }) => (results[s] = r));
            setNews(results);

            // Popular Articles Fetch
            const popularArticles = {}
            const popularPromises = Object.entries(POPULAR_PERIODS).map(([label, period]) => 
                fetchPopular(period).then((r) => ({ label, r}))    
            )
            const popularResolved = await Promise.all(popularPromises)
            popularResolved.forEach(({ label, r}) => (popularArticles[label] = r))
            setPopularNews(popularArticles)

            localStorage.setItem(
                LS_KEY,
                JSON.stringify({ timestamp: Date.now(), sections: results, popular: popularArticles })
            );
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
            fetching.current = false;
        }
    }

    console.log(popularNews)

    function saveArticle(article) {
        setSaved((prev) => {
            const exists = prev.some((a) => a.url === article.url);
            if (exists) return prev;
            const updated = [article, ...prev];
            localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    function unsaveArticle(url) {
        setSaved((prev) => {
            const updated = prev.filter((a) => a.url !== url);
            localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    return { news, popularNews, saved, loading, error, saveArticle, unsaveArticle, SECTIONS };
}
