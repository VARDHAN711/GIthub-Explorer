import { createContext, useContext, useEffect, useState } from 'react';

export const BookmarksContext = createContext();

const STORAGE_KEY = 'github_bookmarks';

export const BookmarksProvider = ({ children }) => {
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
    if (!bookmarks.some(b => b.id === repo.id)) {
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

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, updateNote }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
