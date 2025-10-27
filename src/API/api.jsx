import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY

export default async function fetchSection(section, limit = 10) {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`;
    const response = await axios.get(url)
    return response.data?.results.slice(0, limit) || []
}