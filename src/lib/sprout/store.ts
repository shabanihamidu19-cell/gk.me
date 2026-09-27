import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addDays,
  buildSeed,
  dayCompletionPct,
  defaultSettings,
  emptyData,
  scheduledHabits,
  todayKey,
  type Completion,
  type FocusSession,
  type Goal,
  type Habit,
  type Reflection,
  type ScreenTimeEntry,
  type Settings,
  type SproutData,
  type ViewName,
  uid,
} from "./domain";

export type SproutState = SproutData & {
  view: ViewName;
  hydrated: boolean;
  setView: (view: ViewName) => void;
  setHydrated: (v: boolean) => void;
  addHabit: (habit: Omit<Habit, "id" | "createdAt" | "updatedAt" | "archivedAt">) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  archiveHabit: (id: string, archived: boolean) => void;
  toggleCompletion: (habitId: string, date: string) => boolean;
  markDone: (habitId: string, date: string) => void;
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  saveReflection: (reflection: Reflection) => void;
  saveScreenTime: (entry: Partial<ScreenTimeEntry> & { date: string }) => void;
  addFocusSession: (session: Omit<FocusSession, "id">) => void;
  addUsageMinutes: (delta: number) => void;
  setScreenTimeGoal: (min: number) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  snoozeHabit: (habitId: string, ms: number) => void;
  rolloverIfNeeded: () => void;
  markSynced: () => void;
  importData: (data: Partial<SproutData>) => boolean;
  clearAll: () => void;
  loadSample: () => void;
};

function ensureTodayScreenTime(list: ScreenTimeEntry[], date: string): ScreenTimeEntry[] {
  if (list.some((s) => s.date === date)) return list;
  return [
    ...list,
    {
      date,
      totalMinutes: 0,
      autoMinutes: 0,
      osMinutes: null,
      hourly: Array.from({ length: 24 }, () => 0),
      social: null,
      entertainment: null,
      note: "",
      loggedAt: new Date().toISOString(),
      source: "auto",
    },
  ];
}

export const useSproutStore = create<SproutState>()(
  persist(
    (set, get) => ({
      ...emptyData(),
      view: "today",
      hydrated: false,

      setView: (view) => set({ view }),
      setHydrated: (hydrated) => set({ hydrated }),

      addHabit: (habit) => {
        const now = new Date().toISOString();
        const row: Habit = {
          ...habit,
          id: uid(),
          createdAt: now,
          updatedAt: now,
          archivedAt: null,
        };
        set({ habits: [...get().habits, row] });
      },

      updateHabit: (id, updates) => {
        set({
          habits: get().habits.map((h) =>
            h.id === id ? { ...h, ...updates, updatedAt: new Date().toISOString() } : h,
          ),
        });
      },

      deleteHabit: (id) => {
        set({
          habits: get().habits.filter((h) => h.id !== id),
          completions: get().completions.filter((c) => c.habitId !== id),
          goals: get().goals.map((g) => ({
            ...g,
            habitIds: g.habitIds.filter((hid) => hid !== id),
          })),
        });
      },

      archiveHabit: (id, archived) => {
        set({
          habits: get().habits.map((h) =>
            h.id === id
              ? { ...h, archivedAt: archived ? new Date().toISOString() : null }
              : h,
          ),
        });
      },

      toggleCompletion: (habitId, date) => {
        const existing = get().completions.find(
          (c) => c.habitId === habitId && c.date === date,
        );
        if (existing) {
          set({ completions: get().completions.filter((c) => c !== existing) });
          return false;
        }
        const row: Completion = {
          id: uid(),
          habitId,
          date,
          status: "done",
          completedAt: new Date().toISOString(),
        };
        set({ completions: [...get().completions, row] });
        return true;
      },

      markDone: (habitId, date) => {
        if (get().completions.some((c) => c.habitId === habitId && c.date === date)) return;
        set({
          completions: [
            ...get().completions,
            {
              id: uid(),
              habitId,
              date,
              status: "done",
              completedAt: new Date().toISOString(),
            },
          ],
        });
      },

      addGoal: (goal) => {
        set({
          goals: [
            ...get().goals,
            { ...goal, id: uid(), createdAt: new Date().toISOString() },
          ],
        });
      },

      updateGoal: (id, updates) => {
        set({
          goals: get().goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        });
      },

      deleteGoal: (id) => {
        set({ goals: get().goals.filter((g) => g.id !== id) });
      },

      saveReflection: (reflection) => {
        const rest = get().reflections.filter((r) => r.date !== reflection.date);
        set({ reflections: [...rest, reflection] });
      },

      saveScreenTime: (entry) => {
        const date = entry.date;
        const list = ensureTodayScreenTime(get().screenTime, date);
        set({
          screenTime: list.map((s) => {
            if (s.date !== date) return s;
            const osMinutes = entry.osMinutes ?? s.osMinutes;
            const autoMinutes = s.autoMinutes;
            const total = osMinutes != null ? osMinutes : Math.round(autoMinutes);
            return {
              ...s,
              ...entry,
              osMinutes,
              autoMinutes,
              totalMinutes: entry.totalMinutes ?? total,
              source: osMinutes != null ? (autoMinutes > 0 ? "mixed" : "manual") : "auto",
              loggedAt: new Date().toISOString(),
            };
          }),
        });
      },

      addFocusSession: (session) => {
        set({
          focusSessions: [...get().focusSessions, { ...session, id: uid() }],
        });
      },

      addUsageMinutes: (delta) => {
        if (delta <= 0) return;
        const date = todayKey();
        const hour = new Date().getHours();
        const list = ensureTodayScreenTime(get().screenTime, date);
        set({
          screenTime: list.map((s) => {
            if (s.date !== date) return s;
            const hourly = s.hourly.slice();
            hourly[hour] = (hourly[hour] ?? 0) + delta;
            const autoMinutes = s.autoMinutes + delta;
            const totalMinutes = s.osMinutes != null ? s.osMinutes : autoMinutes;
            return { ...s, hourly, autoMinutes, totalMinutes };
          }),
        });
      },

      setScreenTimeGoal: (min) => {
        const v = Math.max(30, Math.min(1440, Number(min) || 180));
        set({ settings: { ...get().settings, screenTimeGoalMin: v } });
      },

      updateSettings: (patch) => {
        set({ settings: { ...get().settings, ...patch } });
      },

      snoozeHabit: (habitId, ms) => {
        const until = Date.now() + ms;
        set({
          settings: {
            ...get().settings,
            snoozedUntil: { ...get().settings.snoozedUntil, [habitId]: until },
          },
        });
      },

      rolloverIfNeeded: () => {
        const today = todayKey();
        const last = get().settings.lastOpen;
        if (!last || last === today) {
          if (last !== today) {
            set({ settings: { ...get().settings, lastOpen: today } });
          }
          return;
        }
        let cursor = last;
        const archives = get().archives.slice();
        const habits = get().habits;
        const completions = get().completions;
        const screenTime = get().screenTime;
        while (cursor < today) {
          if (!archives.some((a) => a.date === cursor)) {
            const scheduled = scheduledHabits(habits, cursor);
            archives.push({
              date: cursor,
              completionPct: dayCompletionPct(habits, completions, cursor) ?? 0,
              doneCount: scheduled.filter((h) =>
                completions.some((c) => c.habitId === h.id && c.date === cursor),
              ).length,
              scheduledCount: scheduled.length,
              screenMinutes: screenTime.find((s) => s.date === cursor)?.totalMinutes ?? 0,
            });
          }
          cursor = addDays(cursor, 1);
        }
        set({
          archives,
          settings: { ...get().settings, lastOpen: today, snoozedUntil: {} },
        });
      },

      markSynced: () => {
        set({
          settings: { ...get().settings, lastSyncAt: new Date().toISOString() },
        });
      },

      importData: (data) => {
        try {
          if (!data || typeof data !== "object") return false;
          const base = emptyData();
          set({
            habits: Array.isArray(data.habits) ? data.habits : base.habits,
            completions: Array.isArray(data.completions) ? data.completions : base.completions,
            goals: Array.isArray(data.goals) ? data.goals : base.goals,
            reflections: Array.isArray(data.reflections) ? data.reflections : base.reflections,
            screenTime: Array.isArray(data.screenTime) ? data.screenTime : base.screenTime,
            focusSessions: Array.isArray(data.focusSessions)
              ? data.focusSessions
              : base.focusSessions,
            archives: Array.isArray(data.archives) ? data.archives : base.archives,
            settings: { ...defaultSettings(), ...(data.settings ?? {}), onboardingDone: true },
          });
          return true;
        } catch {
          return false;
        }
      },

      clearAll: () => {
        set({
          ...emptyData(),
          view: get().view,
          hydrated: true,
          settings: { ...defaultSettings(), onboardingDone: true, lastOpen: todayKey() },
        });
      },

      loadSample: () => {
        const seed = buildSeed();
        set({ ...seed, view: get().view, hydrated: true });
      },
    }),
    {
      name: "sprout_v1",
      skipHydration: true,
      partialize: (s) => ({
        habits: s.habits,
        completions: s.completions,
        goals: s.goals,
        reflections: s.reflections,
        screenTime: s.screenTime,
        focusSessions: s.focusSessions,
        archives: s.archives,
        settings: s.settings,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<SproutState>;
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...(p.settings ?? {}) },
          archives: p.archives ?? current.archives,
          screenTime: p.screenTime ?? current.screenTime,
          focusSessions: p.focusSessions ?? current.focusSessions,
        };
      },
    },
  ),
);

let hydrateLock: Promise<void> | null = null;

export function hydrateSproutStore(): Promise<void> {
  if (hydrateLock) return hydrateLock;
  hydrateLock = (async () => {
    await useSproutStore.persist.rehydrate();
    const s = useSproutStore.getState();
    if (!s.settings.onboardingDone) {
      const seed = buildSeed();
      useSproutStore.setState({ ...seed, view: "today", hydrated: true });
    } else {
      useSproutStore.getState().rolloverIfNeeded();
      useSproutStore.setState({ hydrated: true });
    }
  })();
  return hydrateLock;
}

if (typeof window !== "undefined") {
  void hydrateSproutStore();
}
