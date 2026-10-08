// src/store/useRatingStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MovieRating {
  imdbId: string      // PK — foreign key ไปยัง OMDb
  title: string       // cache title ไว้แสดงผลใน My Ratings
  poster: string      // cache poster URL
  userRating: number  // 1-5 (star rating)
  ratedAt: string     // ISO 8601 timestamp
}

interface RatingStore {
  // State — Record<imdbId, MovieRating>
  ratings: Record<string, MovieRating>

  // Actions
  setRating: (movie: MovieRating) => void
  removeRating: (imdbId: string) => void
  getRating: (imdbId: string) => number | null
}

export const useRatingStore = create<RatingStore>()(
  persist(
    (set, get) => ({
      ratings: {},

      setRating: (movie) =>
        set((state) => ({
          ratings: { ...state.ratings, [movie.imdbId]: movie },
        })),

      removeRating: (imdbId) =>
        set((state) => {
          const { [imdbId]: _removed, ...rest } = state.ratings
          return { ratings: rest }
        }),

      getRating: (imdbId) =>
        get().ratings[imdbId]?.userRating ?? null,
    }),
    { name: 'movie-ratings' }   // localStorage key
  )
)
