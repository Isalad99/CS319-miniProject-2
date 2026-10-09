// src/store/useWatchlistStore.ts
// Client state only: collection of imdbIds the user saved.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WatchlistEntry {
  addedAt: string // ISO 8601
}

export interface WatchlistState {
  watchlist: Record<string, WatchlistEntry>
}

export interface WatchlistActions {
  addToWatchlist: (imdbId: string) => void
  removeFromWatchlist: (imdbId: string) => void
  toggleWatchlist: (imdbId: string) => void
}

export type WatchlistStore = WatchlistState & WatchlistActions

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: {},

      addToWatchlist: (imdbId) =>
        set((state) => ({
          watchlist: {
            ...state.watchlist,
            [imdbId]: { addedAt: new Date().toISOString() },
          },
        })),

      removeFromWatchlist: (imdbId) =>
        set((state) => {
          const rest = { ...state.watchlist }
          delete rest[imdbId]
          return { watchlist: rest }
        }),

      toggleWatchlist: (imdbId) => {
        if (imdbId in get().watchlist) get().removeFromWatchlist(imdbId)
        else get().addToWatchlist(imdbId)
      },
    }),
    { name: 'movie-watchlist-v2' }
  )
)
