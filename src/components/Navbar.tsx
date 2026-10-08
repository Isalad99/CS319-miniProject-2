// src/components/Navbar.tsx
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useState, useEffect, type FormEvent } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  // Sync input when URL ?q changes (e.g. navigating back)
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="h-14 bg-primary text-primary-content flex items-center px-4 gap-4 shrink-0 sticky top-0 z-50">
      {/* Logo area */}
      <Link
        to="/"
        id="navbar-logo"
        className="flex items-center gap-2 min-w-[130px] hover:opacity-90 transition-opacity"
      >
        {/* Placeholder potato icon — user will replace */}
        <div className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center text-lg select-none">
          🥔
        </div>
        <span className="text-xs font-black leading-tight uppercase tracking-wide">
          Fresh<br />Potatoes
        </span>
      </Link>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
        <label className="input input-sm bg-base-100/10 border-primary-content/30 text-primary-content
          placeholder:text-primary-content/50 w-full flex items-center gap-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-60 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7 7 0 1110 3a7 7 0 016.65 13.65z"
            />
          </svg>
          <input
            id="navbar-search"
            type="search"
            placeholder="Search your movie"
            className="grow bg-transparent outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </form>

      {/* Right actions */}
      <div className="flex items-center gap-4 ml-auto">
        <Link
          to="/about"
          id="navbar-about"
          className="text-sm font-medium hover:opacity-80 transition-opacity hidden sm:block"
        >
          About Us
        </Link>

        {/* Profile — mock only */}
        <button
          id="navbar-profile"
          className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center
            hover:bg-primary-content/30 transition-colors"
          title="Profile (mock)"
          aria-label="Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </button>

        {/* 3-dot menu — mock only */}
        <button
          id="navbar-more"
          className="w-8 h-8 rounded-full flex items-center justify-center
            hover:bg-primary-content/20 transition-colors"
          title="More (mock)"
          aria-label="More options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </header>
  )
}
