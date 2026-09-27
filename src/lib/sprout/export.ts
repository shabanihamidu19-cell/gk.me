import { todayKey, type SproutData } from "./domain";
import { useSproutStore } from "./store";

function csvEscape(val: unknown): string {
  const s = String(val ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function exportJSON(): string {
  const s = useSproutStore.getState();
  const payload = {
    habits: s.habits,
    completions: s.completions,
    goals: s.goals,
    reflections: s.reflections,
    screenTime: s.screenTime,
    focusSessions: s.focusSessions,
    archives: s.archives,
    settings: s.settings,
    exportedAt: new Date().toISOString(),
    app: "Sprout Tracker",
    version: 1,
  };
  return JSON.stringify(payload, null, 2);
}

export function exportHabitsCSV(): string {
  const habits = useSproutStore.getState().habits;
  const headers = [
    "id",
    "name",
    "icon",
    "color",
    "why",
    "minimumVersion",
    "frequency",
    "createdAt",
    "archivedAt",
  ];
  const rows = habits.map((h) =>
    [
      h.id,
      csvEscape(h.name),
      h.icon,
      h.color,
      csvEscape(h.why),
      csvEscape(h.minimumVersion),
      csvEscape(JSON.stringify(h.frequency)),
      h.createdAt,
      h.archivedAt ?? "",
    ].join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

export function exportCompletionsCSV(): string {
  const { completions, habits } = useSproutStore.getState();
  const names = new Map(habits.map((h) => [h.id, h.name]));
  const headers = ["date", "habitId", "habitName", "status", "completedAt"];
  const rows = completions
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((c) =>
      [c.date, c.habitId, csvEscape(names.get(c.habitId) ?? ""), c.status, c.completedAt].join(
        ",",
      ),
    );
  return [headers.join(","), ...rows].join("\n");
}

export function exportReflectionsCSV(): string {
  const refs = useSproutStore.getState().reflections;
  const headers = ["date", "mood", "wentWell", "proud", "improve"];
  const rows = refs
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) =>
      [
        r.date,
        r.mood ?? "",
        csvEscape(r.wentWell),
        csvEscape(r.proud),
        csvEscape(r.improve),
      ].join(","),
    );
  return [headers.join(","), ...rows].join("\n");
}

export function download(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function stamp(kind: string, ext: string): string {
  return `sprout-${kind}-${todayKey()}.${ext}`;
}

export function parseImport(raw: string): Partial<SproutData> | null {
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== "object") return null;
    const source = (Array.isArray(data.habits) ? data : data.data) as Partial<SproutData>;
    if (!source || typeof source !== "object") return null;
    return source;
  } catch {
    return null;
  }
}
