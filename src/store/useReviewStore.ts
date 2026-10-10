// src/store/useReviewStore.ts
// Client state only:
//   - authorName: the display name the user types in the review form
//   - drafts: unsent comment text per movie (so it survives navigation)
//   - likedReviewIds: collection of review IDs this user liked
// Review content / like counts are server data → TanStack Query, never duplicated here.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ReviewState {
  authorName: string
  drafts: Record<string, string> // imdbId → draft text
  likedReviewIds: Record<string, true> // reviewId → true
}

export interface ReviewActions {
  setAuthorName: (name: string) => void
  setDraft: (imdbId: string, text: string) => void
  clearDraft: (imdbId: string) => void
  markLiked: (reviewId: string) => void
  markUnliked: (reviewId: string) => void
}

export type ReviewStore = ReviewState & ReviewActions

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      authorName: '',
      drafts: {},
      likedReviewIds: {},

      setAuthorName: (authorName) => set({ authorName }),

      setDraft: (imdbId, text) =>
        set((state) => ({ drafts: { ...state.drafts, [imdbId]: text } })),

      clearDraft: (imdbId) =>
        set((state) => {
          const rest = { ...state.drafts }
          delete rest[imdbId]
          return { drafts: rest }
        }),

      markLiked: (reviewId) =>
        set((state) => ({ likedReviewIds: { ...state.likedReviewIds, [reviewId]: true } })),

      markUnliked: (reviewId) =>
        set((state) => {
          const rest = { ...state.likedReviewIds }
          delete rest[reviewId]
          return { likedReviewIds: rest }
        }),
    }),
    { name: 'movie-reviews-v1' }
  )
)
