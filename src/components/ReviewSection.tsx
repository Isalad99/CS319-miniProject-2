import { useReviews, useToggleLike } from "../hooks/useReviews";
import { useReviewStore } from "../store/useReviewStore";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import ReviewSkeleton from "./ReviewSkeleton";
import ErrorState from "./ErrorState";
import type { Review } from "../types/review";

interface Props {
  imdbId: string;
}

export default function ReviewSection({ imdbId }: Props) {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useReviews(imdbId);

  return (
    <section aria-label="รีวิวทั้งหมด" className="mt-10 space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-base-content">
        รีวิวทั้งหมด
        {data && data.length > 0 && (
          <span className="ml-2 text-sm font-normal text-base-content/60">
            ({data.length})
          </span>
        )}
      </h2>

      <ReviewForm imdbId={imdbId} />

      {isLoading && <ReviewSkeleton />}

      {isError && (
        <ErrorState
          message={error.message || "โหลดรีวิวไม่สำเร็จ"}
          onRetry={() => void refetch()}
          isRetrying={isFetching}
        />
      )}

      {data && data.length === 0 && (
        <p className="py-8 text-center text-sm text-base-content/60">
          ยังไม่มีรีวิว — เป็นคนแรกที่รีวิวหนังเรื่องนี้เลย
        </p>
      )}

      {data && data.length > 0 && (
        <ul className="space-y-3">
          {data.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}
