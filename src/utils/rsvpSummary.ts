import type { RsvpResponse, RsvpSummary, RsvpTally } from '@/types/domain';

const emptyTally = (): RsvpTally => ({
  responses: 0,
  attending: 0,
  declined: 0,
  guests: 0,
  mealGuests: 0,
  mealUndecidedGuests: 0,
});

function add(tally: RsvpTally, response: RsvpResponse) {
  tally.responses += 1;
  if (!response.attending) {
    tally.declined += 1;
    return;
  }
  tally.attending += 1;
  tally.guests += response.headcount;
  if (response.meal === 'YES') tally.mealGuests += response.headcount;
  if (response.meal === 'UNDECIDED') tally.mealUndecidedGuests += response.headcount;
}

// 대시보드와 참석 의사 화면이 같은 숫자를 보이도록 집계는 여기 한 곳에서만 한다.
export function summarizeRsvps(responses: RsvpResponse[]): RsvpSummary {
  const summary: RsvpSummary = { GROOM: emptyTally(), BRIDE: emptyTally(), TOTAL: emptyTally() };
  responses.forEach((response) => {
    add(summary[response.side], response);
    add(summary.TOTAL, response);
  });
  return summary;
}
