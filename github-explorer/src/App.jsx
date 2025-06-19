import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookmarksPage from './pages/Bookmarks';
import { BookmarksProvider } from './context/BookmarksContext';
import RepoDetail from './pages/RepoDetail';

function App() {
  return (
    <BookmarksProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/repo/:owner/:repo" element={<RepoDetail />} />
      </Routes>
    </BookmarksProvider>
  );
}

export default App;
