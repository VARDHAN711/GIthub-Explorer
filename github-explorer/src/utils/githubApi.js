import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = TOKEN
    ? { Authorization: `token ${TOKEN}` }
    : {};

export const fetchRepositories = async ({ query = '', language = '', sort = 'stars', order = 'desc' }) => {
    let q = query ? `${query}+in:name` : 'stars:>1000';
    if (language) q += `+language:${language}`;

    const url = `${BASE_URL}/search/repositories?q=${q}&sort=${sort}&order=${order}&per_page=20`;

    try {
        const res = await axios.get(url, { headers });
        return res.data.items;
    } catch (err) {
        console.error('Error fetching repositories:', err);
        throw err;
    }
};
