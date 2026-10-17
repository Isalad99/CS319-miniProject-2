// src/store/useReviewStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ReviewState {
  drafts: Record<string, string>;
}

export interface ReviewActions {
  setDraft: (imdbId: string, text: string) => void;
  clearDraft: (imdbId: string) => void;
}

export type ReviewStore = ReviewState & ReviewActions;

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      drafts: {},

      setDraft: (imdbId, text) =>
        set((state) => ({ drafts: { ...state.drafts, [imdbId]: text } })),

      clearDraft: (imdbId) =>
        set((state) => {
          const rest = { ...state.drafts };
          delete rest[imdbId];
          return { drafts: rest };
        }),
    }),
    { name: "movie-reviews-v1" },
  ),
);
