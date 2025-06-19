import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import '../index.css';

const RepoCard = ({
  repo,
  isBookmarked,
  onBookmarkToggle,
  onNoteChange,
  onTagClick,
}) => {
  const [note, setNote] = useState(repo.note || '');

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    onNoteChange(repo.id, newNote);
  };

  return (
    <div className="repo-card">
      <div className="repo-header">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-title"
        >
          {repo.full_name}
        </a>
        <button onClick={() => onBookmarkToggle(repo)} className="bookmark-btn">
          {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <p className="repo-description">
        {repo.description || 'No description provided.'}
      </p>

      {repo.language && (
        <span
          onClick={() => onTagClick?.(repo.language)}
          className="repo-language"
        >
          {repo.language}
        </span>
      )}

      <div className="repo-stats">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🐛 {repo.open_issues_count}</span>
        <span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      {isBookmarked && (
        <div className="repo-note">
          <label className="note-label">📝 Your Note</label>
          <textarea
            className="note-textarea"
            rows="2"
            value={note}
            onChange={handleNoteChange}
            placeholder="Add your notes here..."
          />
        </div>
      )}

      <div className="repo-analytics">
        <Link
          to={`/repo/${repo.owner?.login}/${repo.name}`}
          className="analytics-link"
        >
          View Repo Analytics →
        </Link>
      </div>      
    </div>
  );
};

export default RepoCard;