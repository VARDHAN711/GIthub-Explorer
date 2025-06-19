import { useState, useEffect } from 'react';

const STORAGE_KEY = 'github_bookmarks';

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setBookmarks(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (repo) => {
        if (!bookmarks.find(b => b.id === repo.id)) {
            setBookmarks([...bookmarks, { ...repo, note: '' }]);
        }
    };

    const removeBookmark = (id) => {
        setBookmarks(bookmarks.filter(b => b.id !== id));
    };

    const updateNote = (id, newNote) => {
        setBookmarks(bookmarks.map(b =>
            b.id === id ? { ...b, note: newNote } : b
        ));
    };

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        updateNote,
    };
};
