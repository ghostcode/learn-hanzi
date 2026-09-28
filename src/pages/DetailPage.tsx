import { useParams, useNavigate, Link } from 'react-router-dom'
import { getByChar, ALL_HANZI } from '../data/hanzi'
import { CATEGORY_META } from '../data/types'
import HanziWriterCard from '../components/HanziWriterCard'

export default function DetailPage() {
  const { char } = useParams<{ char: string }>()
  const navigate = useNavigate()
  const decoded = char ? decodeURIComponent(char) : ''
  const item = getByChar(decoded)

  if (!item) {
    return (
      <div className="empty-state">
        未收录此字「{decoded}」·
        <Link className="btn small ghost" to="/search">
          去检索
        </Link>
      </div>
    )
  }

  const meta = CATEGORY_META[item.category]
  const idx = ALL_HANZI.findIndex((h) => h.char === item.char)
  const prev = idx > 0 ? ALL_HANZI[idx - 1] : null
  const next = idx < ALL_HANZI.length - 1 ? ALL_HANZI[idx + 1] : null

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <button className="btn small ghost" onClick={() => navigate(-1)}>
          ← 返回
        </button>
      </div>

      <div className="detail-wrap">
        <div className="writer-panel">
          <HanziWriterCard char={item.char} size={280} />
          <p
            style={{
              textAlign: 'center',
              color: 'var(--ink-faint)',
              fontSize: 13,
              marginTop: 14,
              marginBottom: 0,
            }}
          >
            点击「演示笔顺」观看运笔，或「描红练习」亲手书写
          </p>
        </div>

        <div className="detail-right">
          <h1 className="glyph-big">{item.char}</h1>
          <div className="detail-meta-row">
            <span className="detail-pinyin">{item.pinyin}</span>
            <span
              className="pill"
              style={{ borderColor: meta.accent, color: meta.accent }}
            >
              {meta.title}
            </span>
            <span className="pill">{meta.level}</span>
          </div>

          <div className="info-list">
            <div className="info-row">
              <div className="info-label">部首</div>
              <div className="info-value">{item.radical}</div>
            </div>
            <div className="info-row">
              <div className="info-label">笔画</div>
              <div className="info-value">{item.strokes} 画</div>
            </div>
            <div className="info-row">
              <div className="info-label">结构</div>
              <div className="info-value">{item.structure || '—'}</div>
            </div>
            <div className="info-row">
              <div className="info-label">释义</div>
              <div className="info-value">
                {item.meanings.length > 0 ? (
                  <ul className="mean-list">
                    {item.meanings.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="muted">待补充</span>
                )}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">组词</div>
              <div className="info-value">
                {item.words.length > 0 ? (
                  <div className="word-tags">
                    {item.words.map((w) => (
                      <span className="tag" key={w}>
                        {w}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="muted">—</span>
                )}
              </div>
            </div>
            {item.idioms && item.idioms.length > 0 && (
              <div className="info-row">
                <div className="info-label">成语</div>
                <div className="info-value">
                  <div className="word-tags">
                    {item.idioms.map((w) => (
                      <span className="tag idiom" key={w}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 30,
              borderTop: '1px solid var(--line)',
              paddingTop: 18,
            }}
          >
            {prev ? (
              <Link
                className="btn small ghost"
                to={`/char/${encodeURIComponent(prev.char)}`}
              >
                ← {prev.char} {prev.pinyin}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                className="btn small ghost"
                to={`/char/${encodeURIComponent(next.char)}`}
              >
                {next.char} {next.pinyin} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
