import RatingDisplay from "./RatingDisplay";
import type { Review } from "../types/review";

const AVATAR_COLORS = [
  "bg-primary text-primary-content",
  "bg-secondary text-secondary-content",
  "bg-accent text-accent-content",
  "bg-info text-neutral",
  "bg-success text-neutral",
] as const;

function avatarClass(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function initial(name: string): string {
  return Array.from(name.trim())[0]?.toUpperCase() ?? "?";
}

/** "เมื่อสักครู่", "5 นาทีที่ผ่านมา", "1 เดือนที่ผ่านมา" … */
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

function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarClass(name)}`}
    >
      {initial(name)}
    </span>
  );
}

interface Props {
  review: Review;
}

export default function ReviewItem({ review }: Props) {
  const when = timeAgo(review.createdAt);

  // Rating without a comment → compact row
  if (!review.content) {
    return (
      <li className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 sm:px-4 text-xs text-base-content/60">
        <Avatar name={review.author} />
        <span className="font-semibold text-base-content/70 break-all">
          {review.author}
        </span>
        <RatingDisplay value={review.rating} />
        <time dateTime={review.createdAt}>{when}</time>
      </li>
    );
  }

  return (
    <li className="rounded-box border border-base-300 bg-base-100 p-4">
      {/* ข้อความรีวิว */}
      <p className="text-sm sm:text-base font-semibold text-base-content whitespace-pre-line break-words">
        {review.content}
      </p>

      {/* แถบด้านล่าง: ย้าย Rating ไปไว้ซ้ายล่าง และคงซ้าย-ขวาด้วย justify-between */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {/* ซ้ายล่าง: ดาวคะแนน (ถ้ามีคะแนน) */}
        <div>
          {review.rating > 0 && <RatingDisplay value={review.rating} />}
        </div>

        {/* ขวาล่าง: โปรไฟล์และชื่อผู้เขียน (เหมือนเดิม) */}
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
          <Avatar name={review.author} />
        </div>
      </div>
    </li>
  );
}
