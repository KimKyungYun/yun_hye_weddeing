-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "side" AS ENUM ('groom', 'bride');

-- CreateEnum
CREATE TYPE "meal_plan" AS ENUM ('yes', 'no', 'undecided');

-- CreateTable
CREATE TABLE "guestbook_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(20) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guestbook_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "side" "side" NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "meal" "meal_plan",
    "message" VARCHAR(200),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guestbook_entries_created_at_idx" ON "guestbook_entries"("created_at" DESC);

-- CreateIndex
CREATE INDEX "rsvps_side_created_at_idx" ON "rsvps"("side", "created_at");


-- ─────────────────────────────────────────────────────────────────
-- 아래는 Prisma 로 표현할 수 없어 직접 보강한 부분
-- ─────────────────────────────────────────────────────────────────

-- 값 제약 (앱의 zod 검증과 같은 규칙을 DB 에서 한 번 더 지킨다)
ALTER TABLE "guestbook_entries" ADD CONSTRAINT "guestbook_entries_name_not_blank" CHECK (char_length(btrim("name")) > 0);
ALTER TABLE "guestbook_entries" ADD CONSTRAINT "guestbook_entries_message_not_blank" CHECK (char_length(btrim("message")) > 0);
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_name_not_blank" CHECK (char_length(btrim("name")) > 0);
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_headcount_range" CHECK ("headcount" BETWEEN 0 AND 10);
-- 참석이면 1명 이상·식사 여부 필수, 불참이면 0명·식사 여부 없음
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_attendance_consistent" CHECK (
  ("attending" AND "headcount" >= 1 AND "meal" IS NOT NULL)
  OR (NOT "attending" AND "headcount" = 0 AND "meal" IS NULL)
);

-- Supabase Data API(공개 키로 부르는 REST) 차단.
-- 앱은 서버에서 Prisma(postgres 역할)로만 읽고 쓰므로 anon·authenticated 에게 열어 둘 이유가 없다.
-- RLS 를 켜고 정책을 두지 않으면 Data API 로는 아무것도 보이지 않는다.
ALTER TABLE "guestbook_entries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "rsvps" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "guestbook_entries", "rsvps" FROM anon, authenticated;
