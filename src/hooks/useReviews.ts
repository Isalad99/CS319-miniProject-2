// src/hooks/useReviews.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createReview, fetchReviews, toggleReviewLike } from '../lib/reviewsApi'
import { useReviewStore } from '../store/useReviewStore'
import type { CreateReviewInput, Review, ReviewList, ToggleLikeInput } from '../types/review'

const FIVE_MINUTES = 1000 * 60 * 5

export const reviewsKey = (imdbId: string) => ['reviews', imdbId] as const

/** Reviews change more often than movie metadata → shorter staleTime than the 24h default */
export function useReviews(imdbId: string) {
  return useQuery<ReviewList, Error>({
    queryKey: reviewsKey(imdbId),
    queryFn: () => fetchReviews(imdbId),
    enabled: imdbId.length > 0,
    staleTime: FIVE_MINUTES,
  })
}

/** Post a review, then put the server's response straight into the cache (no refetch needed) */
export function useCreateReview(imdbId: string) {
  const queryClient = useQueryClient()
  return useMutation<Review, Error, CreateReviewInput>({
    mutationFn: createReview,
    onSuccess: (created) => {
      queryClient.setQueryData<ReviewList>(reviewsKey(imdbId), (old) => [created, ...(old ?? [])])
    },
  })
}

interface LikeContext {
  previous: ReviewList | undefined
}

/** Like / unlike with an optimistic update that rolls back if the request fails */
export function useToggleLike(imdbId: string) {
  const queryClient = useQueryClient()
  const markLiked = useReviewStore((s) => s.markLiked)
  const markUnliked = useReviewStore((s) => s.markUnliked)

  return useMutation<Review, Error, ToggleLikeInput, LikeContext>({
    mutationFn: toggleReviewLike,
    onMutate: async ({ reviewId, liked }) => {
      await queryClient.cancelQueries({ queryKey: reviewsKey(imdbId) })
      const previous = queryClient.getQueryData<ReviewList>(reviewsKey(imdbId))
      queryClient.setQueryData<ReviewList>(reviewsKey(imdbId), (old) =>
        old?.map((r) =>
          r.id === reviewId ? { ...r, likes: Math.max(0, r.likes + (liked ? 1 : -1)) } : r
        )
      )
      if (liked) markLiked(reviewId)
      else markUnliked(reviewId)
      return { previous }
    },
    onError: (_err, { reviewId, liked }, context) => {
      if (context?.previous) queryClient.setQueryData(reviewsKey(imdbId), context.previous)
      // revert the client-side flag too
      if (liked) markUnliked(reviewId)
      else markLiked(reviewId)
    },
  })
}
