import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { search } from '../data/hanzi'
import CharacterCard from '../components/CharacterCard'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [q, setQ] = useState(initial)
  const [results, setResults] = useState(() => search(initial))

  useEffect(() => {
    setResults(search(q))
  }, [q])

  const onInput = (val: string) => {
    setQ(val)
    setParams(val.trim() ? { q: val.trim() } : {}, { replace: true })
  }

  return (
    <div>
      <div className="section-head">
        <h2>检 索</h2>
        <div className="section-rule" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <SearchBarControlled value={q} onChange={onInput} />
      </div>

      {q.trim() === '' ? (
        <div className="empty-state">
          支持按「汉字 / 拼音 / 释义」检索，例如：山、shuǐ、光明
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">未找到与「{q}」相关的汉字，换个词试试。</div>
      ) : (
        <>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 16 }}>
            找到 {results.length} 个相关汉字
          </p>
          <div className="char-grid">
            {results.map((h) => (
              <CharacterCard key={h.char} item={h} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// 受控版搜索框（与首页 SearchBar 共享样式）
function SearchBarControlled({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="search-input"
        placeholder="输入汉字、拼音或释义，如「明」或「míng」"
        value={value}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search-btn" type="submit">
        检索
      </button>
    </form>
  )
}
