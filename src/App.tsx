import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page">
        <div className="page-inner">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cat/:cat" element={<CategoryPage />} />
            <Route path="/char/:char" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        典雅汉字 · 字里乾坤　|　常用 · 非常用 · 生僻，一笔一画皆华夏
      </footer>
    </div>
  )
}
