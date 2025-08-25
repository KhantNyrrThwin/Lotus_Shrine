// Utility functions for Koe Na Win process calculations

export const DAYS_PER_STAGE = 9;
export const TOTAL_STAGES = 9;
export const TOTAL_DAYS = DAYS_PER_STAGE * TOTAL_STAGES; // 81

const STORAGE_KEYS = {
  startDate: "knwStartDate",
  completedDates: "knwCompletedDates",
} as const;

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key: string): Date | null {
  const parts = key.split("-");
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map((p) => Number(p));
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
}

export function getMondayOnOrAfter(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  if (day === 1) return d;
  const offset = day === 0 ? 1 : (8 - day); // days to next Monday
  d.setDate(d.getDate() + offset);
  return d;
}

export function getProgramStartDate(): Date {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.startDate);
    if (stored) {
      const parsed = parseDateKey(stored);
      if (parsed) return parsed;
    }
  } catch {}

  const start = getMondayOnOrAfter(new Date());
  try {
    localStorage.setItem(STORAGE_KEYS.startDate, formatDateKey(start));
  } catch {}
  return start;
}

export function setProgramStartDate(date: Date): void {
  const monday = getMondayOnOrAfter(date);
  try {
    localStorage.setItem(STORAGE_KEYS.startDate, formatDateKey(monday));
  } catch {}
}

export function getProgramEndDate(startDate: Date): Date {
  const end = new Date(startDate);
  end.setDate(end.getDate() + (TOTAL_DAYS - 1));
  return end;
}

export function getDaysBetween(a: Date, b: Date): number {
  const start = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const end = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function getDayIndex(today: Date, startDate: Date): number {
  const diff = getDaysBetween(startDate, today);
  return Math.max(0, Math.min(diff, TOTAL_DAYS - 1));
}

export function getStageNumber(dayIndex: number): number {
  return Math.floor(dayIndex / DAYS_PER_STAGE) + 1; // 1..9
}

export function getDayInStage(dayIndex: number): number {
  return (dayIndex % DAYS_PER_STAGE) + 1; // 1..9
}

export function isMeatFreeDayByDayInStage(dayInStage: number): boolean {
  // 5th day of each 9-day stage
  return dayInStage === 5;
}

export function getDaysRemaining(today: Date, endDate: Date): number {
  const diff = getDaysBetween(today, endDate);
  return Math.max(0, diff);
}

export function getProgressPercentage(dayIndex: number): number {
  // Completed days before today divided by total days
  const completed = dayIndex; // days before/including yesterday
  return Math.round((completed / TOTAL_DAYS) * 100);
}

export function isTodayCompleted(today: Date): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.completedDates);
    if (!raw) return false;
    const set: string[] = JSON.parse(raw);
    const key = formatDateKey(today);
    return Array.isArray(set) && set.includes(key);
  } catch {
    return false;
  }
}

export function setTodayCompleted(today: Date, completed: boolean): void {
  try {
    const key = formatDateKey(today);
    const raw = localStorage.getItem(STORAGE_KEYS.completedDates);
    let set: string[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) set = parsed;
    }
    const has = set.includes(key);
    if (completed && !has) set.push(key);
    if (!completed && has) set = set.filter((k) => k !== key);
    localStorage.setItem(STORAGE_KEYS.completedDates, JSON.stringify(set));
  } catch {}
}

// Stage 1 daily schedule mapping (9 days starting on Monday)
// Index 0..8 corresponds to each day in the 9-day cycle
const STAGE_CYCLE_SCHEDULE = [
  { label: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2 }, // Mon
  { label: "ဘဂဝါ", loops: 9 },            // Tue
  { label: "သုဂတော", loops: 4 },          // Wed
  { label: "သတ္တာဒေဝမနုဿာနံ", loops: 7 }, // Thu
  { label: "လောကဝိဒူ", loops: 5 },        // Fri (meat-free day warning)
  { label: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3 }, // Sat
  { label: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6 }, // Sun
  { label: "အရဟံ", loops: 1 },            // Mon
  { label: "ဗုဒ္ဓေါ", loops: 8 },          // Tue
] as const;

export function getMantraForDayIndex(dayIndex: number) {
  const indexInCycle = dayIndex % DAYS_PER_STAGE; // 0..8
  return STAGE_CYCLE_SCHEDULE[indexInCycle];
}

