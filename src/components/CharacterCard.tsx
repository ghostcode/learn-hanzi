import { useNavigate } from 'react-router-dom'
import { Hanzi } from '../data/types'

export default function CharacterCard({ item }: { item: Hanzi }) {
  const navigate = useNavigate()
  return (
    <div
      className="char-card"
      onClick={() => navigate(`/char/${encodeURIComponent(item.char)}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/char/${encodeURIComponent(item.char)}`)
      }}
    >
      <div className="glyph">{item.char}</div>
      <div className="py">{item.pinyin}</div>
      <div className="mean">{item.meanings[0]}</div>
    </div>
  )
}
