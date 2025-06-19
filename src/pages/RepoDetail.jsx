import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import '../index.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RepoDetail = () => {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [repoRes, langRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repo}`),
          fetch(`https://api.github.com/repos/${owner}/${repo}/languages`),
          fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`)
        ]);

        const repoData = await repoRes.json();
        const langData = await langRes.json();
        const contribData = await contribRes.json();

        setRepoData(repoData);
        setLanguages(langData);
        setContributors(contribData);
      } catch (err) {
        console.error('Failed to load repo analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [owner, repo]);

  if (loading) return <p className="loading-text">Loading analytics...</p>;
  if (!repoData) return <p className="error-text">Repository not found.</p>;

  const languageChart = {
    labels: Object.keys(languages),
    datasets: [
      {
        label: 'Languages',
        data: Object.values(languages),
        backgroundColor: [
          '#60a5fa', // Blue
          '#f59e0b', // Amber
          '#10b981', // Emerald
          '#ef4444', // Red
          '#8b5cf6', // Violet
          '#f472b6', // Pink
          '#facc15', // Yellow
          '#22d3ee', // Cyan
          '#6366f1', // Indigo
          '#ec4899', // Fuchsia
          '#34d399', // Green
          '#eab308', // Mustard
          '#0ea5e9'  // Sky Blue
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const contributorChart = {
    labels: contributors.map(c => c.login),
    datasets: [
      {
        label: 'Contributions',
        data: contributors.map(c => c.contributions),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="repo-detail-container">
      <div className="repo-header">
        <h1 className="repo-title">📊 {owner}/{repo} Analytics</h1>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>

      <div className="repo-summary">
        <p className="repo-description">{repoData.description || 'No description provided.'}</p>
        <div className="repo-stats">
          <span>⭐ Stars: {repoData.stargazers_count}</span>
          <span>🍴 Forks: {repoData.forks_count}</span>
          <span>🐛 Issues: {repoData.open_issues_count}</span>
          <span>🕒 Updated: {new Date(repoData.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="chart-box language-breakdown-box">
        <h2 className="chart-title">Language Breakdown</h2>
        <div className="language-layout">
          <ul className="language-list">
            {Object.entries(languages).map(([lang], i) => (
              <li key={lang} className="language-item">
                <span
                  className="color-box"
                  style={{ backgroundColor: languageChart.datasets[0].backgroundColor[i] }}
                ></span>
                <span className="lang-label">{lang}</span>
              </li>
            ))}
          </ul>
          <div className="chart-wrapper">
            <Pie data={languageChart} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="chart-box">
        <h2 className="chart-title">Top Contributors</h2>
        {contributors.length > 0 ? (
          <div className="chart-wrapper">
            <Bar data={contributorChart} />
          </div>
        ) : (
          <p className="no-data-text">No contributors data available.</p>
        )}
      </div>

    </div>
  );
};

export default RepoDetail;