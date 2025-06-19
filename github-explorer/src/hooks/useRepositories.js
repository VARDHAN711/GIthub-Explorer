import { useEffect, useState } from 'react';
import { fetchRepositories } from '../utils/githubApi';

export const useRepositories = (params) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchRepositories(params);
                setRepos(data);
                setError('');
            } catch (err) {
                setError('Failed to fetch repositories:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [params]);

    return { repos, loading, error };
};
