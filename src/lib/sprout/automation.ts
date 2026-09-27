import { toast } from "sonner";
import {
  isCompleted,
  scheduledHabits,
  todayKey,
  type Habit,
} from "./domain";
import { useSproutStore } from "./store";

const SW_PATH = "/sprout-sw.js";
let started = false;
let usageTimer: number | null = null;
let lastTick = 0;
let visible = true;

const ENCOURAGE = [
  "Nice work",
  "One step at a time",
  "Keep going",
  "Small progress counts",
  "You showed up",
  "Well done",
  "That's the way",
];

export function encourage(): string {
  return ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)] ?? "Nice work";
}

export function startAutomation(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  lastTick = Date.now();
  visible = document.visibilityState === "visible";

  registerServiceWorker();
  listenForSwMessages();

  const onVis = () => {
    flushUsage();
    visible = document.visibilityState === "visible";
    lastTick = Date.now();
    useSproutStore.getState().rolloverIfNeeded();
  };
  document.addEventListener("visibilitychange", onVis);
  window.addEventListener("focus", onVis);

  usageTimer = window.setInterval(() => {
    flushUsage();
    useSproutStore.getState().rolloverIfNeeded();
    maybeFireReminders();
    const st = useSproutStore.getState().settings;
    const last = st.lastSyncAt ? new Date(st.lastSyncAt).getTime() : 0;
    if (Date.now() - last > 60_000) {
      useSproutStore.getState().markSynced();
    }
  }, 15_000);

  useSproutStore.getState().markSynced();
  maybeFireReminders();
}

function flushUsage(): void {
  const now = Date.now();
  const deltaMs = now - lastTick;
  lastTick = now;
  const s = useSproutStore.getState();
  if (!s.settings.autoTrack) return;
  if (!visible || document.hidden) return;
  if (deltaMs <= 0 || deltaMs > 5 * 60_000) return;
  s.addUsageMinutes(deltaMs / 60_000);
}

async function registerServiceWorker(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register(SW_PATH, { scope: "/" });
  } catch {
    // Preview hosts may block SW; in-app toasts still handle actions.
  }
}

function listenForSwMessages(): void {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.addEventListener("message", (event: MessageEvent) => {
    const data = event.data as { type?: string; habitId?: string; date?: string } | undefined;
    if (!data?.type) return;
    const date = data.date ?? todayKey();
    if (data.type === "SPROUT_HABIT_DONE" && data.habitId) {
      useSproutStore.getState().markDone(data.habitId, date);
      toast.success("Marked done from the notification");
    }
    if (data.type === "SPROUT_HABIT_SNOOZE" && data.habitId) {
      useSproutStore.getState().snoozeHabit(data.habitId, 15 * 60_000);
      toast("Snoozed for 15 minutes");
    }
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof Notification === "undefined") return false;
  const result = await Notification.requestPermission();
  const granted = result === "granted";
  useSproutStore.getState().updateSettings({ notificationsGranted: granted });
  return granted;
}

function reminderKey(hour: number): string {
  return `${todayKey()}-${String(hour).padStart(2, "0")}`;
}

function maybeFireReminders(): void {
  const s = useSproutStore.getState();
  if (!s.settings.remindersEnabled) return;
  const now = new Date();
  const hour = now.getHours();
  const targets = [s.settings.reminderHour, s.settings.eveningHour];
  if (!targets.includes(hour)) return;
  const key = reminderKey(hour);
  if (s.settings.lastReminderKey === key) return;
  const today = todayKey();
  const pending = scheduledHabits(s.habits, today).filter((h) => {
    if (isCompleted(s.completions, h.id, today)) return false;
    const until = s.settings.snoozedUntil[h.id] ?? 0;
    return until < Date.now();
  });
  if (pending.length === 0) return;
  s.updateSettings({ lastReminderKey: key });
  const first = pending[0]!;
  showHabitReminder(first, pending.length);
}

export function showHabitReminder(habit: Habit, remaining = 1): void {
  const today = todayKey();
  const title = remaining > 1 ? `${habit.name} · ${remaining} waiting` : habit.name;
  const body = habit.minimumVersion
    ? `Minimum: ${habit.minimumVersion}`
    : "Mark it done, or snooze 15 minutes.";

  toast(title, {
    description: body,
    duration: 12_000,
    action: {
      label: "Done",
      onClick: () => {
        useSproutStore.getState().markDone(habit.id, today);
        toast.success("Checked off");
      },
    },
    cancel: {
      label: "Snooze",
      onClick: () => {
        useSproutStore.getState().snoozeHabit(habit.id, 15 * 60_000);
        toast("Snoozed 15 minutes");
      },
    },
  });

  void showSystemNotification(habit, title, body, today);
}

async function showSystemNotification(
  habit: Habit,
  title: string,
  body: string,
  date: string,
): Promise<void> {
  if (typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  const payload = {
    body,
    tag: `sprout-${habit.id}-${date}`,
    data: { habitId: habit.id, date, title: habit.name },
    actions: [
      { action: "done", title: "Done" },
      { action: "snooze", title: "Snooze" },
    ],
  };
  try {
    const reg = await navigator.serviceWorker?.ready;
    if (reg?.showNotification) {
      await reg.showNotification(title, payload);
      return;
    }
  } catch {
    // fall through
  }
  try {
    new Notification(title, { body, tag: payload.tag });
  } catch {
    // ignore
  }
}

export function fireTestReminder(): void {
  const s = useSproutStore.getState();
  const today = todayKey();
  const pending = scheduledHabits(s.habits, today).filter(
    (h) => !isCompleted(s.completions, h.id, today),
  );
  const habit = pending[0] ?? s.habits.find((h) => !h.archivedAt);
  if (!habit) {
    toast("Add a habit first");
    return;
  }
  showHabitReminder(habit, Math.max(1, pending.length));
}
