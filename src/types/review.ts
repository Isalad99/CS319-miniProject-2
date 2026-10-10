// src/types/review.ts

/** Review as returned by the reviews API (server data — owned by TanStack Query) */
export interface Review {
  id: string
  imdbId: string
  author: string
  /** Comment body. May be empty when the user only left a star rating. */
  content: string
  /** 0 = no rating, 1-5 = stars */
  rating: number
  likes: number
  createdAt: string // ISO 8601
}

/** Payload for POST /movies/:imdbId/reviews */
export interface CreateReviewInput {
  imdbId: string
  author: string
  content: string
  rating: number
}

/** Payload for toggling a like on a review */
export interface ToggleLikeInput {
  reviewId: string
  imdbId: string
  /** true = add a like, false = remove it */
  liked: boolean
}

export type ReviewList = Review[]
