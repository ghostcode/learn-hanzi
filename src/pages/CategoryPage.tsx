import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CATEGORY_META, Category } from '../data/types'
import { getByCategory } from '../data/hanzi'
import CharacterCard from '../components/CharacterCard'

const VALID: Category[] = ['common', 'uncommon', 'rare']
const PAGE_SIZE = 120

export default function CategoryPage() {
  const { cat } = useParams<{ cat: string }>()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  if (!cat || !VALID.includes(cat as Category)) {
    return (
      <div className="empty-state">
        未找到该分类 ·
        <button className="btn small ghost" onClick={() => navigate('/')}>
          返回首页
        </button>
      </div>
    )
  }

  const category = cat as Category
  const meta = CATEGORY_META[category]
  const list = getByCategory(category)

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = useMemo(
    () => list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [list, safePage],
  )
  const from = list.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, list.length)

  const go = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="section-head">
        <h2 style={{ color: meta.accent }}>{meta.title}</h2>
        <div className="section-rule" />
        <span className="pill">{meta.level} · 共 {list.length} 字</span>
      </div>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>{meta.description}</p>

      <div className="char-grid">
        {pageItems.map((h) => (
          <CharacterCard key={h.char} item={h} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pager">
          <button
            className="btn small ghost"
            onClick={() => go(safePage - 1)}
            disabled={safePage <= 1}
          >
            ← 上一页
          </button>
          <span className="pager-info">
            第 <strong>{safePage}</strong> / {totalPages} 页 · 本页 {from}–{to}
          </span>
          <button
            className="btn small ghost"
            onClick={() => go(safePage + 1)}
            disabled={safePage >= totalPages}
          >
            下一页 →
          </button>
        </div>
      )}
    </div>
  )
}
