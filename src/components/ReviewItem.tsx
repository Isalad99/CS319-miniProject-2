import RatingDisplay from "./RatingDisplay";
import UserIcon from "./UserIcon";
import type { Review } from "../types/review";

export function timeAgo(iso: string, now: number = Date.now()): string {
  const seconds = Math.max(
    0,
    Math.floor((now - new Date(iso).getTime()) / 1000),
  );
  const units: ReadonlyArray<readonly [number, string]> = [
    [60 * 60 * 24 * 365, "ปี"],
    [60 * 60 * 24 * 30, "เดือน"],
    [60 * 60 * 24 * 7, "สัปดาห์"],
    [60 * 60 * 24, "วัน"],
    [60 * 60, "ชั่วโมง"],
    [60, "นาที"],
  ];
  for (const [size, label] of units) {
    if (seconds >= size)
      return `${Math.floor(seconds / size)} ${label}ที่ผ่านมา`;
  }
  return "เมื่อสักครู่";
}

function Avatar() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content"
    >
      <UserIcon className="size-4 opacity-90" />
    </span>
  );
}

interface Props {
  review: Review;
}

export default function ReviewItem({ review }: Props) {
  const when = timeAgo(review.createdAt);

  return (
    <li className="rounded-box border border-base-300 bg-base-100 p-4">
      {review.content && (
        <p className="text-sm sm:text-base font-thin text-base-content whitespace-pre-line break-words">
          {review.content}
        </p>
      )}

      <div
        className={`${review.content ? "mt-3" : ""} flex flex-wrap items-center justify-between gap-x-4 gap-y-2`}
      >
        <div>
          {review.rating > 0 && <RatingDisplay value={review.rating} />}
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="min-w-0 text-right leading-tight">
            <p className="truncate text-xs font-semibold text-base-content/70">
              {review.author}
            </p>
            <time
              dateTime={review.createdAt}
              className="text-[11px] text-base-content/50"
            >
              {when}
            </time>
          </div>
          <Avatar />
        </div>
      </div>
    </li>
  );
}
