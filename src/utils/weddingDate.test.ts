import { describe, expect, it } from 'vitest';
import {
  formatDateTime,
  formatEnglishDate,
  formatShortDate,
  formatWeddingDate,
  formatWeekdayTime,
  getCountdown,
  getMonthGrid,
} from './weddingDate';

const WEDDING = new Date('2027-03-20T11:00:00+09:00');

describe('날짜 문구 (Asia/Seoul 고정)', () => {
  it('예식 일시 문구', () => {
    expect(formatWeddingDate(WEDDING)).toBe('2027년 3월 20일 토요일 오전 11시');
    expect(formatWeekdayTime(new Date('2027-03-20T13:30:00+09:00'))).toBe('토요일 오후 1시 30분');
    expect(formatWeekdayTime(new Date('2027-03-20T00:00:00+09:00'))).toBe('토요일 오전 12시');
  });

  it('섹션별 날짜 형식', () => {
    expect(formatShortDate(WEDDING)).toBe('2027.3.20');
    expect(formatEnglishDate(WEDDING)).toBe('March 20, 2027');
    expect(formatDateTime(WEDDING)).toBe('2027.03.20 11:00');
  });

  it('UTC 로는 전날이어도 한국 날짜로 읽는다', () => {
    // 2027-03-19T16:00Z = 한국 3월 20일 01:00
    expect(formatDateTime(new Date('2027-03-19T16:00:00Z'))).toBe('2027.03.20 01:00');
  });
});

describe('getMonthGrid', () => {
  it('2027년 3월은 월요일 시작(빈칸 1)·31일·20일 강조', () => {
    expect(getMonthGrid(WEDDING)).toMatchObject({ leadingBlanks: 1, daysInMonth: 31, highlightDay: 20 });
  });

  it('윤년 2월', () => {
    expect(getMonthGrid(new Date('2028-02-10T12:00:00+09:00')).daysInMonth).toBe(29);
  });
});

describe('getCountdown', () => {
  it('남은 시간을 일·시·분·초로 나누고 D-day 는 올림한다', () => {
    const now = new Date('2027-03-18T09:59:30+09:00');
    expect(getCountdown(WEDDING, now)).toEqual({ days: 2, hours: 1, minutes: 0, seconds: 30, dDay: 3, isPast: false });
  });

  it('지났으면 0 과 isPast', () => {
    expect(getCountdown(WEDDING, new Date('2027-03-20T11:00:01+09:00'))).toMatchObject({ days: 0, isPast: true });
  });
});
