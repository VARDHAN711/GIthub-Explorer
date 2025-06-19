import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useRepositories } from '../hooks/useRepositories';
import RepoCard from '../components/RepoCard';
import { BookmarksContext } from '../context/BookmarksContext';
import '../index.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('stars');

  const params = useMemo(() => ({ query, language, sort }), [query, language, sort]);
  const { repos, loading, error } = useRepositories(params);

  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateNote,
  } = useContext(BookmarksContext);

  const toggleBookmark = (repo) => {
    const isBookmarked = bookmarks.some((b) => b.id === repo.id);
    isBookmarked ? removeBookmark(repo.id) : addBookmark(repo);
  };

  const getNote = (id) => bookmarks.find((b) => b.id === id)?.note || '';
  const handleTagClick = (lang) => setLanguage(lang);

  return (
    <div className="home-container">
      {/* Filters and Search */}
      <div className="filters">
        <input
          type="text"
          className="input-box"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="select-box"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select-box"
        >
          <option value="stars">Stars</option>
          <option value="updated">Recently Updated</option>
          <option value="forks">Forks</option>
        </select>

        <Link
          to="/bookmarks"
          className="bookmark-link"
        >
          View Bookmarks
        </Link>
      </div>

      {/* Status */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Repository Grid */}
      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={{ ...repo, note: getNote(repo.id) }}
            isBookmarked={bookmarks.some((b) => b.id === repo.id)}
            onBookmarkToggle={toggleBookmark}
            onNoteChange={updateNote}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
