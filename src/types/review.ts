// src/types/review.ts

export interface Review {
  id: string;
  imdbId: string;
  author: string;
  content: string;
  rating: number;
  likes: number;
  createdAt: string; // ISO 8601
}

export interface CreateReviewInput {
  imdbId: string;
  content: string;
  rating: number;
}

export interface ToggleLikeInput {
  reviewId: string;
  imdbId: string;
  liked: boolean;
}

export type ReviewList = Review[];
