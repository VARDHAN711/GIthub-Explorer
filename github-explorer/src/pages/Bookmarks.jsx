import { useContext } from 'react';
import { BookmarksContext } from '../context/BookmarksContext';
import RepoCard from '../components/RepoCard';
import { Link } from 'react-router-dom';
import '../index.css';

const BookmarksPage = () => {
  const { bookmarks, removeBookmark, updateNote } = useContext(BookmarksContext);

  return (
    <div className="bookmarks-container">
      <div className="bookmarks-header">
        <h1 className="bookmarks-title">⭐ Bookmarked Repositories</h1>
        <Link to="/" className="back-link">← Back to Explore</Link>
      </div>

      {bookmarks.length === 0 ? (
        <p className="no-bookmarks-text">No bookmarks yet.</p>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isBookmarked={true}
              onBookmarkToggle={() => removeBookmark(repo.id)}
              onNoteChange={updateNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
