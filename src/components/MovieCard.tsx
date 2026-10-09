// src/components/MovieCard.tsx
import { Link } from 'react-router'
import type { MovieSummary } from '../types/movie'

interface Props {
  movie: MovieSummary
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="group relative rounded-lg overflow-hidden bg-accent shadow-sm
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://placehold.co/300x400/B0BA99/3D1F0E?text=No+Poster'
          }
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="px-2 py-1.5 flex items-center justify-between gap-1">
        <span className="text-xs font-semibold text-accent-content line-clamp-1 flex-1">
          {movie.Title}
        </span>
        <span className="text-xs text-accent-content/60 shrink-0">{movie.Year}</span>
      </div>
    </Link>
  )
}
