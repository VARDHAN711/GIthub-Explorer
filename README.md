# GitHub Project Explorer

A modern React application to explore GitHub repositories with features like search, filters, bookmarks, analytics, and chart visualizations.

## 🌟 Features

### 🔍 Repository Explorer
- Search repositories by name
- Filter by language (JavaScript, Python, Java, TypeScript)
- Sort by stars, forks, or recently updated
- Bookmark repositories for quick access
- Add personal notes to bookmarked repositories

### 📁 Bookmark Manager
- View all bookmarked repositories
- Remove bookmarks
- Persist notes per repository
- Clean responsive card layout using CSS Grid
- Styled using regular CSS (Tailwind was removed due to config issues)

### 📊 Repo Analytics Page
- View per-repository analytics (stars, forks, issues, last updated)
- Pie chart breakdown of repository languages
- Custom list with colored language tags matching pie chart colors
- Bar chart showing top 5 contributors
- Charts built using `react-chartjs-2` and `chart.js`

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Routing:** React Router DOM
- **Charts:** Chart.js & react-chartjs-2
- **HTTP Client:** Fetch API
- **State:** React Context for bookmarks
- **Styling:** CSS