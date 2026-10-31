// 예식 날짜 계산. 화면·카운트다운·메타 문구가 모두 이 함수들만 쓴다.
//
// 한국은 서머타임이 없어 UTC+9 고정이다. 그래서 Intl 대신 9시간을 더한 뒤 UTC 필드로 읽는다 —
// 서버(UTC)·하객 기기 어느 시간대에서 돌려도 같은 결과가 나온다.

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface SeoulParts {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
}

export function toSeoulParts(date: Date): SeoulParts {
  const shifted = new Date(date.getTime() + KST_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
  };
}

const pad = (value: number) => String(value).padStart(2, '0');

// "토요일 오전 11시" (분이 있으면 "오후 1시 30분")
export function formatWeekdayTime(date: Date): string {
  const { weekday, hour, minute } = toSeoulParts(date);
  const period = hour < 12 ? '오전' : '오후';
  const hour12 = hour % 12 || 12;
  const minuteText = minute > 0 ? ` ${minute}분` : '';
  return `${WEEKDAYS[weekday]}요일 ${period} ${hour12}시${minuteText}`;
}

// "2027년 3월 20일 토요일 오전 11시"
export function formatWeddingDate(date: Date): string {
  const { year, month, day } = toSeoulParts(date);
  return `${year}년 ${month}월 ${day}일 ${formatWeekdayTime(date)}`;
}

// "2027.3.20" — 날짜 섹션의 큰 날짜
export function formatShortDate(date: Date): string {
  const { year, month, day } = toSeoulParts(date);
  return `${year}.${month}.${day}`;
}

// "March 20, 2027" — 마무리 사진 위
export function formatEnglishDate(date: Date): string {
  const { year, month, day } = toSeoulParts(date);
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}

// "2027.03.20 11:00" — 인트로 날짜 · 관리자 화면의 접수 시각
export function formatDateTime(date: Date): string {
  const { year, month, day, hour, minute } = toSeoulParts(date);
  return `${year}.${pad(month)}.${pad(day)} ${pad(hour)}:${pad(minute)}`;
}

export interface MonthGrid {
  weekdays: string[];
  leadingBlanks: number;
  daysInMonth: number;
  highlightDay: number;
}

// 예식이 있는 달의 달력. 1일 앞 빈칸 수와 그 달 일수만 알면 그릴 수 있다.
export function getMonthGrid(date: Date): MonthGrid {
  const { year, month, day } = toSeoulParts(date);
  return {
    weekdays: WEEKDAYS,
    leadingBlanks: new Date(Date.UTC(year, month - 1, 1)).getUTCDay(),
    daysInMonth: new Date(Date.UTC(year, month, 0)).getUTCDate(),
    highlightDay: day,
  };
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  // 남은 날 (올림). 당일 오전이면 1
  dDay: number;
  isPast: boolean;
}

export function getCountdown(target: Date, now: Date): Countdown {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, dDay: 0, isPast: true };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
    dDay: Math.ceil(diff / 86_400_000),
    isPast: false,
  };
}
