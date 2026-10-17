// src/types/review.ts

export interface Review {
  id: string;
  imdbId: string;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface CreateReviewInput {
  imdbId: string;
  content: string;
  rating: number;
}

export type ReviewList = Review[];
