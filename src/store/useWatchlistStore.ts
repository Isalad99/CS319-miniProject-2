import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WatchlistMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchlistItem extends WatchlistMovie {
  watched: boolean;
  addedAt: number;
}

interface WatchlistState {
  watchlist: Record<string, WatchlistItem>;
  toggleWatchlist: (movie: WatchlistMovie) => void;
  removeFromWatchlist: (imdbID: string) => void;
  toggleWatched: (imdbID: string) => void;
  setWatched: (movie: WatchlistMovie, watched: boolean) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchlist: {},

      toggleWatchlist: (movie) =>
        set((state) => {
          if (movie.imdbID in state.watchlist) {
            const { [movie.imdbID]: _removed, ...rest } = state.watchlist;
            return { watchlist: rest };
          }
          return {
            watchlist: {
              ...state.watchlist,
              [movie.imdbID]: { ...movie, watched: false, addedAt: Date.now() },
            },
          };
        }),

      removeFromWatchlist: (imdbID) =>
        set((state) => {
          const { [imdbID]: _removed, ...rest } = state.watchlist;
          return { watchlist: rest };
        }),

      toggleWatched: (imdbID) =>
        set((state) => {
          const item = state.watchlist[imdbID];
          if (!item) return state;
          return {
            watchlist: {
              ...state.watchlist,
              [imdbID]: { ...item, watched: !item.watched },
            },
          };
        }),
      setWatched: (movie, watched) =>
        set((state) => {
          const existing = state.watchlist[movie.imdbID];
          return {
            watchlist: {
              ...state.watchlist,
              [movie.imdbID]: existing
                ? { ...existing, watched }
                : { ...movie, watched, addedAt: Date.now() },
            },
          };
        }),
    }),
    { name: "watchlist-storage" },
  ),
);
