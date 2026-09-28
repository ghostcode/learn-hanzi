import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <div className="nav-seal">字</div>
          <div className="nav-title">
            典雅汉字
            <small>字里乾坤 · HANZI</small>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            首页
          </NavLink>
          <NavLink to="/cat/common" className="nav-link">
            常用字
          </NavLink>
          <NavLink to="/cat/uncommon" className="nav-link">
            非常用字
          </NavLink>
          <NavLink to="/cat/rare" className="nav-link">
            生僻字
          </NavLink>
          <NavLink to="/search" className="nav-link">
            检索
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
