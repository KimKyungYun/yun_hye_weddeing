import { describe, expect, it } from 'vitest';
import type { RsvpResponse } from '@/types/domain';
import { summarizeRsvps } from './rsvpSummary';

const response = (overrides: Partial<RsvpResponse>): RsvpResponse => ({
  id: 'id',
  side: 'GROOM',
  name: '하객',
  attending: true,
  headcount: 1,
  meal: 'YES',
  message: null,
  createdAt: '2026-10-31T00:00:00.000Z',
  ...overrides,
});

describe('summarizeRsvps', () => {
  it('측별·합계로 응답 수와 인원을 센다', () => {
    const summary = summarizeRsvps([
      response({ side: 'GROOM', headcount: 3, meal: 'YES' }),
      response({ side: 'GROOM', headcount: 2, meal: 'UNDECIDED' }),
      response({ side: 'GROOM', attending: false, headcount: 0, meal: null }),
      response({ side: 'BRIDE', headcount: 4, meal: 'NO' }),
    ]);

    expect(summary.GROOM).toEqual({ responses: 3, attending: 2, declined: 1, guests: 5, mealGuests: 3, mealUndecidedGuests: 2 });
    expect(summary.BRIDE).toEqual({ responses: 1, attending: 1, declined: 0, guests: 4, mealGuests: 0, mealUndecidedGuests: 0 });
    expect(summary.TOTAL).toEqual({ responses: 4, attending: 3, declined: 1, guests: 9, mealGuests: 3, mealUndecidedGuests: 2 });
  });

  it('응답이 없으면 모두 0', () => {
    expect(summarizeRsvps([]).TOTAL.responses).toBe(0);
  });
});
