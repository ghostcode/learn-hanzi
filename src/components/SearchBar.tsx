import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        className="search-input"
        placeholder="输入汉字、拼音或释义，如「明」或「míng」"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="search-btn" type="submit">
        检索
      </button>
    </form>
  )
}
