import { useState, type ChangeEvent, type FormEvent } from "react";
import StarRating from "./StarRating";
import { useCreateReview } from "../hooks/useReviews";
import { useReviewStore } from "../store/useReviewStore";
import { useRatingStore } from "../store/useRatingStore";
import { AUTHOR_MAX_LENGTH, REVIEW_MAX_LENGTH } from "../lib/reviewsApi";

interface Props {
  imdbId: string;
}

export default function ReviewForm({ imdbId }: Props) {
  const authorName = useReviewStore((s) => s.authorName);
  const setAuthorName = useReviewStore((s) => s.setAuthorName);
  const draft = useReviewStore((s) => s.drafts[imdbId] ?? "");
  const setDraft = useReviewStore((s) => s.setDraft);
  const clearDraft = useReviewStore((s) => s.clearDraft);
  const myRating = useRatingStore((s) => s.ratings[imdbId]?.userRating ?? 0);

  // Local UI state: stars the user picks for *this* review (defaults to their own movie rating)
  const [rating, setRating] = useState<number>(myRating);
  const { mutate, isPending, isError, error, reset } = useCreateReview(imdbId);

  const trimmedName = authorName.trim();
  const trimmedDraft = draft.trim();
  const canSubmit =
    trimmedName.length > 0 &&
    (trimmedDraft.length > 0 || rating > 0) &&
    !isPending;

  function submit() {
    if (!canSubmit) return;
    mutate(
      { imdbId, author: trimmedName, content: trimmedDraft, rating },
      {
        onSuccess: () => {
          clearDraft(imdbId);
          setRating(myRating);
        },
      },
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit();
  }

  function handleDraft(e: ChangeEvent<HTMLTextAreaElement>) {
    if (isError) reset();
    setDraft(imdbId, e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-box border border-base-300 bg-base-200 p-4 space-y-3"
      aria-label="เขียนรีวิว"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="form-control w-full sm:max-w-xs">
          <span className="mb-1 block text-xs font-semibold text-base-content/60">
            ชื่อ
          </span>
          <input
            type="text"
            value={authorName}
            maxLength={AUTHOR_MAX_LENGTH}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="เช่น Movie Lover"
            className="input input-sm w-full bg-base-100"
            disabled={isPending}
          />
        </label>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-base-content/60">
            ให้คะแนน
          </span>
          <StarRating
            size="md"
            value={rating}
            onChange={setRating}
            readonly={isPending}
          />
        </div>
      </div>

      <label className="block">
        <span className="sr-only">ความคิดเห็น</span>
        <textarea
          value={draft}
          onChange={handleDraft}
          maxLength={REVIEW_MAX_LENGTH}
          rows={6}
          placeholder="เขียนความคิดเห็นเกี่ยวกับหนังเรื่องนี้…"
          className="textarea w-full bg-base-100 text-sm resize-none "
          disabled={isPending}
        />
      </label>

      {isError && (
        <div role="alert" className="alert alert-error alert-soft py-2 text-sm">
          <span className="flex-1">{error.message || "ส่งรีวิวไม่สำเร็จ"}</span>
          <button
            type="button"
            className="btn btn-xs btn-error"
            onClick={submit}
            disabled={!canSubmit}
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-base-content/50 tabular-nums">
          {draft.length}/{REVIEW_MAX_LENGTH}
        </span>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!canSubmit}
        >
          {isPending && <span className="loading loading-spinner loading-xs" />}
          {isPending ? "กำลังส่ง…" : "ส่งรีวิว"}
        </button>
      </div>
    </form>
  );
}
