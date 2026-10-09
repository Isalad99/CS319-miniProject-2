// src/store/useRatingStore.ts
// Client state only: the user's own rating, keyed by imdbId.
// Movie title/poster etc. are server data → fetched via TanStack Query, never duplicated here.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserRating {
  userRating: number // 1-5
  ratedAt: string // ISO 8601
}

export interface RatingState {
  ratings: Record<string, UserRating>
}

export interface RatingActions {
  setRating: (imdbId: string, userRating: number) => void
  removeRating: (imdbId: string) => void
}

export type RatingStore = RatingState & RatingActions

export const useRatingStore = create<RatingStore>()(
  persist(
    (set) => ({
      ratings: {},

      setRating: (imdbId, userRating) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [imdbId]: { userRating, ratedAt: new Date().toISOString() },
          },
        })),

      removeRating: (imdbId) =>
        set((state) => {
          const rest = { ...state.ratings }
          delete rest[imdbId]
          return { ratings: rest }
        }),
    }),
    { name: 'movie-ratings-v2' }
  )
)
