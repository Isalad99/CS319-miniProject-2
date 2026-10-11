// src/lib/reviewsApi.ts
//
// OMDb has no review endpoint, so reviews go through this small REST-style client.
// The "server" is a persisted, async mock (latency + validation + errors) so the app
// behaves like a real network resource: every call returns a Promise and can fail.
// To use a real backend, replace the bodies of the three exported functions with fetch()
// calls — the hooks and UI do not need to change.
import type { CreateReviewInput, Review, ReviewList, ToggleLikeInput } from '../types/review'

const DB_KEY = 'fresh-potatoes-reviews-db-v1'
const MIN_DELAY_MS = 350
const MAX_DELAY_MS = 750

export const REVIEW_MAX_LENGTH = 500
export const AUTHOR_MAX_LENGTH = 30

function delay(): Promise<void> {
  const ms = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isReview(value: unknown): value is Review {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.imdbId === 'string' &&
    typeof v.author === 'string' &&
    typeof v.content === 'string' &&
    typeof v.rating === 'number' &&
    typeof v.likes === 'number' &&
    typeof v.createdAt === 'string'
  )
}

function readDb(): ReviewList {
  let raw: string | null
  try {
    raw = localStorage.getItem(DB_KEY)
  } catch {
    throw new Error('ไม่สามารถเข้าถึงที่เก็บข้อมูลรีวิวได้')
  }
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isReview) : []
  } catch {
    return []
  }
}

function writeDb(reviews: ReviewList): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(reviews))
  } catch {
    throw new Error('บันทึกรีวิวไม่สำเร็จ (พื้นที่จัดเก็บเต็มหรือถูกปิดใช้งาน)')
  }
}

function newId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/** GET /movies/:imdbId/reviews — newest first */
export async function fetchReviews(imdbId: string): Promise<ReviewList> {
  await delay()
  return readDb()
    .filter((r) => r.imdbId === imdbId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** POST /movies/:imdbId/reviews */
export async function createReview(input: CreateReviewInput): Promise<Review> {
  await delay()
  const content = input.content.trim()
  const author = input.author.trim()

  if (!author) throw new Error('กรุณากรอกชื่อที่ใช้แสดง')
  if (!content && input.rating < 1) throw new Error('กรุณาเขียนความคิดเห็นหรือให้คะแนนอย่างน้อยหนึ่งอย่าง')
  if (content.length > REVIEW_MAX_LENGTH) throw new Error(`ความคิดเห็นต้องไม่เกิน ${REVIEW_MAX_LENGTH} ตัวอักษร`)

  const review: Review = {
    id: newId(),
    imdbId: input.imdbId,
    author: author.slice(0, AUTHOR_MAX_LENGTH),
    content,
    rating: Math.min(5, Math.max(0, Math.round(input.rating))),
    likes: 0,
    createdAt: new Date().toISOString(),
  }
  writeDb([...readDb(), review])
  return review
}

/** POST/DELETE /reviews/:id/like — returns the updated review */
export async function toggleReviewLike({ reviewId, liked }: ToggleLikeInput): Promise<Review> {
  await delay()
  const db = readDb()
  const target = db.find((r) => r.id === reviewId)
  if (!target) throw new Error('ไม่พบรีวิวนี้')
  const updated: Review = { ...target, likes: Math.max(0, target.likes + (liked ? 1 : -1)) }
  writeDb(db.map((r) => (r.id === reviewId ? updated : r)))
  return updated
}
