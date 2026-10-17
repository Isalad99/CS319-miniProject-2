// src/store/useWatchlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WatchlistEntry {
  addedAt: string;
}

export interface WatchlistState {
  watchlist: Record<string, WatchlistEntry>;
}

export interface WatchlistActions {
  addToWatchlist: (imdbId: string) => void;
  removeFromWatchlist: (imdbId: string) => void;
  toggleWatchlist: (imdbId: string) => void;
}

export type WatchlistStore = WatchlistState & WatchlistActions;

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: {},

      toggleWatchlist: (movie) =>
        set((state) => {
          if (movie.imdbID in state.watchlist) {
            const { [movie.imdbID]: _removed, ...rest } = state.watchlist
            return { watchlist: rest }
          }
          return {
            watchlist: {
              ...state.watchlist,
              [movie.imdbID]: { ...movie, watched: false, addedAt: Date.now() },
            },
          }
        }),

      removeFromWatchlist: (imdbID) =>
        set((state) => {
          const rest = { ...state.watchlist };
          delete rest[imdbId];
          return { watchlist: rest };
        }),

      toggleWatchlist: (imdbId) => {
        if (imdbId in get().watchlist) get().removeFromWatchlist(imdbId);
        else get().addToWatchlist(imdbId);
      },
    }
  }),
        
    }),
    { name: "movie-watchlist-v2" },
  ),
);
