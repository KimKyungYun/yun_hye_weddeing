import type { MealPlan, Side } from '@/constants/rsvp';

export interface Person {
  name: string;
  // 혼주 줄·인트로 손글씨에 쓰는 이름
  firstName: string;
  nameEn: string;
  father: string;
  mother: string;
  fatherDeceased: boolean;
  motherDeceased: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface RsvpResponse {
  id: string;
  side: Side;
  name: string;
  attending: boolean;
  headcount: number;
  meal: MealPlan | null;
  message: string | null;
  createdAt: string;
}

// 한 측(또는 합계)의 집계. guests 는 참석 응답의 인원 합(본인 포함)이다.
export interface RsvpTally {
  responses: number;
  attending: number;
  declined: number;
  guests: number;
  mealGuests: number;
  mealUndecidedGuests: number;
}

export type RsvpSummary = Record<Side | 'TOTAL', RsvpTally>;
