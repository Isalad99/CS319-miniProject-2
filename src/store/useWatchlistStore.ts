// src/store/useWatchlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WatchlistItem {
  imdbId: string    // PK
  title: string
  poster: string
  year: string
  addedAt: string   // ISO 8601 timestamp
}

interface WatchlistStore {
  // State — Record<imdbId, WatchlistItem>
  watchlist: Record<string, WatchlistItem>

  // Actions
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (imdbId: string) => void
  isInWatchlist: (imdbId: string) => boolean
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: {},

      addToWatchlist: (item) =>
        set((state) => ({
          watchlist: { ...state.watchlist, [item.imdbId]: item },
        })),

      removeFromWatchlist: (imdbId) =>
        set((state) => {
          const { [imdbId]: _removed, ...rest } = state.watchlist
          return { watchlist: rest }
        }),

      isInWatchlist: (imdbId) =>
        imdbId in get().watchlist,
    }),
    { name: 'movie-watchlist' }   // localStorage key
  )
)
