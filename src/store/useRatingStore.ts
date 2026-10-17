// src/store/useRatingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserRating {
  userRating: number;
  ratedAt: string;
}

export interface RatingState {
  ratings: Record<string, UserRating>;
}

export type RatingStore = RatingState;

export const useRatingStore = create<RatingStore>()(
  persist(
    () => ({
      ratings: {},
    }),
    { name: "movie-ratings-v2" },
  ),
);
