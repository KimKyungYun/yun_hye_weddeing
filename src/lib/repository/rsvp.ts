import 'server-only';
import { cache } from 'react';
import { withRetry } from '@/lib/db/retry';
import { prisma } from '@/lib/prisma';
import type { Rsvp as RsvpRow } from '@/generated/prisma/client';
import type { RsvpResponse } from '@/types/domain';

function toResponse(row: RsvpRow): RsvpResponse {
  return {
    id: row.id,
    side: row.side,
    name: row.name,
    attending: row.attending,
    headcount: row.headcount,
    meal: row.meal,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  };
}

// 관리자 전용. 최신순
export const listRsvps = cache(async (): Promise<RsvpResponse[]> => {
  const rows = await withRetry(() => prisma.rsvp.findMany({ orderBy: { createdAt: 'desc' } }));
  return rows.map(toResponse);
});
