export type FreqType = "daily" | "weekdays" | "custom" | "xtimes" | "weekly";

export type Frequency = {
  type: FreqType;
  days?: number[];
  times?: number;
  preferredDay?: number;
};

export type Habit = {
  id: string;
  name: string;
  icon: HabitIconId;
  color: HabitColorId;
  why: string;
  minimumVersion: string;
  frequency: Frequency;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type Completion = {
  id: string;
  habitId: string;
  date: string;
  status: "done";
  completedAt: string;
};

export type Goal = {
  id: string;
  title: string;
  description: string;
  habitIds: string[];
  createdAt: string;
};

export type Reflection = {
  date: string;
  mood: number | null;
  wentWell: string;
  proud: string;
  improve: string;
};

export type ScreenTimeEntry = {
  date: string;
  totalMinutes: number;
  autoMinutes: number;
  osMinutes: number | null;
  hourly: number[];
  social: number | null;
  entertainment: number | null;
  note: string;
  loggedAt: string;
  source: "auto" | "manual" | "mixed";
};

export type FocusSession = {
  id: string;
  date: string;
  minutes: number;
  plannedMinutes: number;
  completedAt: string;
};

export type DayArchive = {
  date: string;
  completionPct: number;
  doneCount: number;
  scheduledCount: number;
  screenMinutes: number;
};

export type Settings = {
  onboardingDone: boolean;
  lastOpen: string | null;
  screenTimeGoalMin: number;
  autoTrack: boolean;
  remindersEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
  eveningHour: number;
  lastReminderKey: string | null;
  lastSyncAt: string | null;
  snoozedUntil: Record<string, number>;
  notificationsGranted: boolean;
};

export type SproutData = {
  habits: Habit[];
  completions: Completion[];
  goals: Goal[];
  reflections: Reflection[];
  screenTime: ScreenTimeEntry[];
  focusSessions: FocusSession[];
  archives: DayArchive[];
  settings: Settings;
};

export type ViewName = "today" | "progress" | "goals" | "focus" | "settings";

export const HABIT_ICON_IDS = [
  "sprout",
  "book",
  "dumbbell",
  "droplet",
  "brain",
  "moon",
  "apple",
  "music",
  "sun",
  "target",
  "wind",
  "heart",
  "coffee",
  "pen",
  "footprints",
  "flower",
] as const;

export type HabitIconId = (typeof HABIT_ICON_IDS)[number];

export const HABIT_COLOR_IDS = [
  "habit-1",
  "habit-2",
  "habit-3",
  "habit-4",
  "habit-5",
  "habit-6",
] as const;

export type HabitColorId = (typeof HABIT_COLOR_IDS)[number];

export const MOODS = [
  { label: "Tough", hint: "A hard day" },
  { label: "Low", hint: "A bit off" },
  { label: "Steady", hint: "Even keel" },
  { label: "Good", hint: "Feeling well" },
  { label: "Bright", hint: "A great day" },
] as const;

export const FREQ_OPTIONS: { id: FreqType; label: string }[] = [
  { id: "daily", label: "Every day" },
  { id: "weekdays", label: "Weekdays" },
  { id: "custom", label: "Selected days" },
  { id: "xtimes", label: "X times / week" },
  { id: "weekly", label: "Once a week" },
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function uid(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(key: string, n: number): string {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return todayKey(d);
}

export function dayOfWeek(key: string): number {
  return fromKey(key).getDay();
}

export function startOfWeek(key: string): string {
  const d = fromKey(key);
  d.setDate(d.getDate() - d.getDay());
  return todayKey(d);
}

export function startOfMonth(key: string): string {
  const d = fromKey(key);
  return todayKey(new Date(d.getFullYear(), d.getMonth(), 1));
}

export function daysInMonth(key: string): number {
  const d = fromKey(key);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function daysBetween(a: string, b: string): number {
  return Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 86400000);
}

export function weekKeys(around: string): string[] {
  const start = startOfWeek(around);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function monthGrid(monthKey: string): { key: string; other: boolean }[] {
  const start = startOfMonth(monthKey);
  const firstDow = dayOfWeek(start);
  const days = daysInMonth(monthKey);
  const cells: { key: string; other: boolean }[] = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push({ key: addDays(start, i - firstDow), other: true });
  }
  for (let i = 0; i < days; i++) {
    cells.push({ key: addDays(start, i), other: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]?.key ?? start;
    cells.push({ key: addDays(last, 1), other: true });
  }
  return cells;
}

export function greeting(d = new Date()): string {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function formatLong(key: string): string {
  return fromKey(key).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMinutes(m: number | null | undefined): string {
  if (m == null || Number.isNaN(m)) return "—";
  const h = Math.floor(m / 60);
  const mins = Math.round(m % 60);
  if (h <= 0) return `${mins}m`;
  if (mins === 0) return `${h}h`;
  return `${h}h ${mins}m`;
}

export function defaultSettings(): Settings {
  return {
    onboardingDone: false,
    lastOpen: null,
    screenTimeGoalMin: 180,
    autoTrack: true,
    remindersEnabled: true,
    reminderHour: 8,
    reminderMinute: 0,
    eveningHour: 20,
    lastReminderKey: null,
    lastSyncAt: null,
    snoozedUntil: {},
    notificationsGranted: false,
  };
}

export function emptyData(): SproutData {
  return {
    habits: [],
    completions: [],
    goals: [],
    reflections: [],
    screenTime: [],
    focusSessions: [],
    archives: [],
    settings: defaultSettings(),
  };
}

export function isScheduledOn(habit: Habit, dateKey: string): boolean {
  const freq = habit.frequency ?? { type: "daily" };
  const dow = dayOfWeek(dateKey);
  switch (freq.type) {
    case "daily":
      return true;
    case "weekdays":
      return dow >= 1 && dow <= 5;
    case "custom":
      return Array.isArray(freq.days) && freq.days.includes(dow);
    case "weekly":
      return dow === (freq.preferredDay ?? 0);
    case "xtimes":
      return true;
    default:
      return true;
  }
}

export function scheduledHabits(habits: Habit[], dateKey: string): Habit[] {
  return habits.filter((h) => !h.archivedAt && isScheduledOn(h, dateKey));
}

export function isCompleted(
  completions: Completion[],
  habitId: string,
  date: string,
): boolean {
  return completions.some(
    (c) => c.habitId === habitId && c.date === date && c.status === "done",
  );
}

export function dayCompletionPct(
  habits: Habit[],
  completions: Completion[],
  dateKey: string,
): number | null {
  const scheduled = scheduledHabits(habits, dateKey);
  if (scheduled.length === 0) return null;
  const done = scheduled.filter((h) => isCompleted(completions, h.id, dateKey)).length;
  return Math.round((done / scheduled.length) * 100);
}

export function currentStreak(habit: Habit, completions: Completion[]): number {
  if (habit.frequency?.type === "xtimes") return xtimesStreak(habit, completions, false);
  const today = todayKey();
  let streak = 0;
  let cursor = today;
  if (isScheduledOn(habit, today) && !isCompleted(completions, habit.id, today)) {
    cursor = addDays(today, -1);
  }
  for (let i = 0; i < 365; i++) {
    if (!isScheduledOn(habit, cursor)) {
      cursor = addDays(cursor, -1);
      continue;
    }
    if (isCompleted(completions, habit.id, cursor)) {
      streak++;
      cursor = addDays(cursor, -1);
    } else {
      break;
    }
  }
  return streak;
}

export function bestStreak(habit: Habit, completions: Completion[]): number {
  if (habit.frequency?.type === "xtimes") return xtimesStreak(habit, completions, true);
  const dates = completions
    .filter((c) => c.habitId === habit.id && c.status === "done")
    .map((c) => c.date)
    .sort();
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  let best = 0;
  let current = 0;
  let cursor = dates[0] ?? todayKey();
  const end = todayKey();
  while (cursor <= end) {
    if (isScheduledOn(habit, cursor)) {
      if (set.has(cursor)) {
        current++;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    }
    cursor = addDays(cursor, 1);
  }
  return best;
}

function xtimesStreak(habit: Habit, completions: Completion[], best: boolean): number {
  const times = habit.frequency?.times ?? 3;
  const today = todayKey();
  let streak = 0;
  let bestStreak = 0;
  let weekStart = startOfWeek(today);
  for (let w = 0; w < 52; w++) {
    const week = weekKeys(weekStart);
    const countable = week.filter((d) => d <= today);
    const count = countable.filter((d) => isCompleted(completions, habit.id, d)).length;
    const met = count >= times;
    if (met) {
      streak++;
      bestStreak = Math.max(bestStreak, streak);
    } else if (best) {
      streak = 0;
    } else if (!(w === 0 && count < times)) {
      return streak;
    }
    weekStart = addDays(weekStart, -7);
  }
  return best ? bestStreak : streak;
}

export function completionRate(
  habit: Habit,
  completions: Completion[],
  daysBack = 30,
): number {
  const today = todayKey();
  let scheduled = 0;
  let done = 0;
  for (let i = 0; i < daysBack; i++) {
    const d = addDays(today, -i);
    if (isScheduledOn(habit, d)) {
      scheduled++;
      if (isCompleted(completions, habit.id, d)) done++;
    }
  }
  if (scheduled === 0) return 0;
  return Math.round((done / scheduled) * 100);
}

export function overallConsistencyStreak(
  habits: Habit[],
  completions: Completion[],
): number {
  const today = todayKey();
  let streak = 0;
  let cursor = today;
  const todayScheduled = scheduledHabits(habits, today);
  if (
    todayScheduled.length > 0 &&
    !todayScheduled.some((h) => isCompleted(completions, h.id, today))
  ) {
    cursor = addDays(today, -1);
  }
  for (let i = 0; i < 365; i++) {
    const scheduled = scheduledHabits(habits, cursor);
    if (scheduled.length === 0) {
      cursor = addDays(cursor, -1);
      continue;
    }
    const anyDone = scheduled.some((h) => isCompleted(completions, h.id, cursor));
    if (anyDone) {
      streak++;
      cursor = addDays(cursor, -1);
    } else {
      break;
    }
  }
  return streak;
}

export function daysSinceLastActivity(completions: Completion[]): number | null {
  const all = completions
    .filter((c) => c.status === "done")
    .map((c) => c.date)
    .sort();
  if (all.length === 0) return null;
  return daysBetween(all[all.length - 1]!, todayKey());
}

export function freqLabel(habit: Habit): string {
  const f = habit.frequency ?? { type: "daily" };
  switch (f.type) {
    case "daily":
      return "Every day";
    case "weekdays":
      return "Weekdays";
    case "weekly":
      return "Once a week";
    case "xtimes":
      return `${f.times ?? 3}× per week`;
    case "custom": {
      if (!f.days?.length) return "Custom";
      return f.days.map((d) => DAY_NAMES[d]).join(", ");
    }
    default:
      return "Custom";
  }
}

export function levelFromPct(pct: number | null): number {
  if (pct == null || pct === 0) return 0;
  if (pct < 30) return 1;
  if (pct < 60) return 2;
  if (pct < 80) return 3;
  return 4;
}

export function colorVar(id: HabitColorId): string {
  return `var(--color-${id})`;
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function buildSeed(): SproutData {
  const today = todayKey();
  const now = new Date().toISOString();
  const h1: Habit = {
    id: "h-rise",
    name: "Morning stretch",
    icon: "sun",
    color: "habit-4",
    why: "Start the body before the day starts me",
    minimumVersion: "Five minutes, any stretch",
    frequency: { type: "daily" },
    createdAt: addDays(today, -24) + "T07:00:00.000Z",
    updatedAt: now,
    archivedAt: null,
  };
  const h2: Habit = {
    id: "h-work",
    name: "Deep work",
    icon: "brain",
    color: "habit-2",
    why: "Protect one block of real attention",
    minimumVersion: "A single 25-minute block",
    frequency: { type: "weekdays" },
    createdAt: addDays(today, -24) + "T07:00:00.000Z",
    updatedAt: now,
    archivedAt: null,
  };
  const h3: Habit = {
    id: "h-water",
    name: "Drink water",
    icon: "droplet",
    color: "habit-1",
    why: "Keep the simplest promise",
    minimumVersion: "One full glass",
    frequency: { type: "daily" },
    createdAt: addDays(today, -24) + "T07:00:00.000Z",
    updatedAt: now,
    archivedAt: null,
  };
  const h4: Habit = {
    id: "h-read",
    name: "Read",
    icon: "book",
    color: "habit-3",
    why: "Feed a quieter mind",
    minimumVersion: "Ten pages",
    frequency: { type: "xtimes", times: 4 },
    createdAt: addDays(today, -24) + "T07:00:00.000Z",
    updatedAt: now,
    archivedAt: null,
  };
  const habits = [h1, h2, h3, h4];
  const completions: Completion[] = [];
  for (let i = 1; i <= 18; i++) {
    const d = addDays(today, -i);
    if (i === 5 || i === 6) continue;
    for (const h of habits) {
      if (!isScheduledOn(h, d)) continue;
      if (hashStr(d + h.id) % 10 < 8) {
        completions.push({
          id: `c-${h.id}-${d}`,
          habitId: h.id,
          date: d,
          status: "done",
          completedAt: `${d}T18:12:00.000Z`,
        });
      }
    }
  }

  const screenTime: ScreenTimeEntry[] = [];
  const pattern = [168, 214, 142, 288, 196, 231, 175];
  for (let i = 1; i <= 6; i++) {
    const d = addDays(today, -i);
    const mins = pattern[i % pattern.length] ?? 180;
    const hourly = Array.from({ length: 24 }, (_, hr) => {
      if (hr < 8 || hr > 22) return 0;
      return Math.round((mins / 14) * (0.6 + (hashStr(d + String(hr)) % 80) / 100));
    });
    screenTime.push({
      date: d,
      totalMinutes: mins,
      autoMinutes: 0,
      osMinutes: mins,
      hourly,
      social: Math.round(mins * 0.35),
      entertainment: Math.round(mins * 0.22),
      note: "",
      loggedAt: `${d}T21:00:00.000Z`,
      source: "manual",
    });
  }

  const archives: DayArchive[] = [];
  for (let i = 1; i <= 18; i++) {
    const d = addDays(today, -i);
    const pct = dayCompletionPct(habits, completions, d);
    const scheduled = scheduledHabits(habits, d);
    archives.push({
      date: d,
      completionPct: pct ?? 0,
      doneCount: scheduled.filter((h) => isCompleted(completions, h.id, d)).length,
      scheduledCount: scheduled.length,
      screenMinutes: screenTime.find((s) => s.date === d)?.totalMinutes ?? 0,
    });
  }

  return {
    habits,
    completions,
    goals: [
      {
        id: "g-quiet",
        title: "A quieter mind",
        description: "Show up for attention, rest, and a page a day.",
        habitIds: ["h-rise", "h-work", "h-read"],
        createdAt: addDays(today, -20) + "T12:00:00.000Z",
      },
    ],
    reflections: [
      {
        date: addDays(today, -1),
        mood: 3,
        wentWell: "Kept the deep-work block before noon.",
        proud: "Did not reopen the phone after the stretch.",
        improve: "Read before screens in the evening.",
      },
    ],
    screenTime,
    focusSessions: [
      {
        id: "f-1",
        date: addDays(today, -1),
        minutes: 25,
        plannedMinutes: 25,
        completedAt: addDays(today, -1) + "T10:30:00.000Z",
      },
    ],
    archives,
    settings: {
      ...defaultSettings(),
      onboardingDone: true,
      lastOpen: today,
    },
  };
}
