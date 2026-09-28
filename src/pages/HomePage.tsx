import { useNavigate } from 'react-router-dom'
import { CATEGORY_META, Category } from '../data/types'
import { getByCategory, COMMON } from '../data/hanzi'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/SearchBar'

const CATS: Category[] = ['common', 'uncommon', 'rare']

export default function HomePage() {
  const navigate = useNavigate()
  const featured = COMMON.slice(0, 12)

  return (
    <div>
      <section className="hero">
        <div className="hero-char">字</div>
        <h1 className="hero-title">典雅汉字</h1>
        <div className="hero-sub">字 里 乾 坤 · 一 笔 一 画 皆 华 夏</div>
        <p className="hero-desc">
          自仓颉造字，汉字已走过数千载。这里集常用、非常用与生僻之字，
          配以笔顺动画与描红练习，愿你在横竖撇捺之间，识其形、知其意、会其心。
        </p>
        <div className="hero-actions">
          <button className="btn" onClick={() => navigate('/cat/common')}>
            开始识字
          </button>
          <button className="btn ghost" onClick={() => navigate('/search')}>
            检索字词
          </button>
        </div>
        <div style={{ marginTop: 34 }}>
          <SearchBar />
        </div>
      </section>

      <section className="page" style={{ maxWidth: 'var(--maxw)' }}>
        <div className="section-head">
          <h2>三 类 分 览</h2>
          <div className="section-rule" />
        </div>
        <div className="cat-grid">
          {CATS.map((c) => {
            const meta = CATEGORY_META[c]
            const list = getByCategory(c)
            return (
              <div
                key={c}
                className="cat-card"
                onClick={() => navigate(`/cat/${c}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/cat/${c}`)
                }}
              >
                <div
                  className="corner seal-stamp"
                  style={{ background: meta.accent }}
                >
                  {list[0]?.char}
                </div>
                <h3 style={{ color: meta.accent }}>{meta.title}</h3>
                <div className="sub">{meta.subtitle}</div>
                <div className="desc">{meta.description}</div>
                <div className="meta">
                  <span className="count">共 {list.length} 字</span>
                  <span className="pill">{meta.level}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="page" style={{ maxWidth: 'var(--maxw)', marginTop: 48 }}>
        <div className="section-head">
          <h2>常 用 拾 贰</h2>
          <div className="section-rule" />
          <button
            className="btn small ghost"
            onClick={() => navigate('/cat/common')}
          >
            更多
          </button>
        </div>
        <div className="char-grid">
          {featured.map((h) => (
            <CharacterCard key={h.char} item={h} />
          ))}
        </div>
      </section>
    </div>
  )
}
