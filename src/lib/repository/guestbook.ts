import 'server-only';
import { cache } from 'react';
import { withRetry } from '@/lib/db/retry';
import { prisma } from '@/lib/prisma';
import type { GuestbookEntry } from '@/types/domain';

// 관리자 전용. 최신순
// cache: 한 요청 안에서 같은 조회를 한 번만 한다 / withRetry: 풀러 연결이 순간적으로 끊기면 한 번 다시 묻는다
export const listGuestbookEntries = cache(async (): Promise<GuestbookEntry[]> => {
  const rows = await withRetry(() => prisma.guestbookEntry.findMany({ orderBy: { createdAt: 'desc' } }));
  return rows.map((row) => ({ id: row.id, name: row.name, message: row.message, createdAt: row.createdAt.toISOString() }));
});
