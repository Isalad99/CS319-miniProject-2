// src/hooks/useReviews.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, fetchReviews } from "../lib/reviewsApi";
import type { CreateReviewInput, Review, ReviewList } from "../types/review";

const FIVE_MINUTES = 1000 * 60 * 5;

export const reviewsKey = (imdbId: string) => ["reviews", imdbId] as const;

export function useReviews(imdbId: string) {
  return useQuery<ReviewList, Error>({
    queryKey: reviewsKey(imdbId),
    queryFn: () => fetchReviews(imdbId),
    enabled: imdbId.length > 0,
    staleTime: FIVE_MINUTES,
  });
}

export function useCreateReview(imdbId: string) {
  const queryClient = useQueryClient();
  return useMutation<Review, Error, CreateReviewInput>({
    mutationFn: createReview,
    onSuccess: (created) => {
      queryClient.setQueryData<ReviewList>(reviewsKey(imdbId), (old) => [
        created,
        ...(old ?? []),
      ]);
    },
  });
}
