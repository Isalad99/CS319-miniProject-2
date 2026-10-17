import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WatchlistMovie } from './useWatchlistStore'

export interface MyReview extends WatchlistMovie {
  rating: number 
  text: string
  createdAt: number
  updatedAt: number
}

interface MyReviewState {
  reviews: Record<string, MyReview>
  saveReview: (movie: WatchlistMovie, data: { rating: number; text: string }) => void
  deleteReview: (imdbID: string) => void
}

export const useMyReviewStore = create<MyReviewState>()(
  persist(
    (set) => ({
      reviews: {},

      saveReview: (movie, { rating, text }) =>
        set((state) => {
          const now = Date.now()
          const existing = state.reviews[movie.imdbID]
          return {
            reviews: {
              ...state.reviews,
              [movie.imdbID]: {
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
                rating,
                text,
                createdAt: existing?.createdAt ?? now,
                updatedAt: now,
              },
            },
          }
        }),

      deleteReview: (imdbID) =>
        set((state) => {
          const { [imdbID]: _removed, ...rest } = state.reviews
          return { reviews: rest }
        }),
    }),
    { name: 'my-review-storage' }, // เปลี่ยน key ไม่ให้ชนกับของเดิม
  ),
)