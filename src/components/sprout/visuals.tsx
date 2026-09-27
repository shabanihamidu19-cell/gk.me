import type { LucideIcon } from "lucide-react";
import {
  Apple,
  BookOpen,
  Brain,
  Coffee,
  Droplets,
  Dumbbell,
  Flower2,
  Footprints,
  Heart,
  Moon,
  Music,
  PenLine,
  Sprout,
  Sun,
  Target,
  Wind,
} from "lucide-react";
import {
  colorVar,
  DAY_NAMES,
  dayCompletionPct,
  fromKey,
  isCompleted,
  isScheduledOn,
  levelFromPct,
  monthGrid,
  todayKey,
  weekKeys,
  type Habit,
  type HabitColorId,
  type HabitIconId,
  type Completion,
} from "@/lib/sprout/domain";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<HabitIconId, LucideIcon> = {
  sprout: Sprout,
  book: BookOpen,
  dumbbell: Dumbbell,
  droplet: Droplets,
  brain: Brain,
  moon: Moon,
  apple: Apple,
  music: Music,
  sun: Sun,
  target: Target,
  wind: Wind,
  heart: Heart,
  coffee: Coffee,
  pen: PenLine,
  footprints: Footprints,
  flower: Flower2,
};

export function HabitGlyph({
  icon,
  color,
  size = "md",
}: {
  icon: HabitIconId;
  color: HabitColorId;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = ICON_MAP[icon] ?? Sprout;
  const dim = size === "lg" ? "size-14 rounded-lg" : size === "sm" ? "size-9 rounded-sm" : "size-10 rounded-md";
  const ic = size === "lg" ? "size-7" : size === "sm" ? "size-4" : "size-5";
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", dim)}
      style={{ background: `color-mix(in oklab, ${colorVar(color)} 18%, transparent)`, color: colorVar(color) }}
    >
      <Icon className={ic} strokeWidth={1.75} />
    </div>
  );
}

export { ICON_MAP };

export function ProgressRing({ pct, label }: { pct: number; label?: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative size-20 shrink-0" aria-label={label ?? `${pct}% complete`}>
      <svg viewBox="0 0 80 80" className="-rotate-90 size-20">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-border)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums">
        {pct}%
      </div>
    </div>
  );
}

export function GrowthPlant({ streak }: { streak: number }) {
  const stage = streak >= 30 ? 4 : streak >= 14 ? 3 : streak >= 7 ? 2 : streak >= 1 ? 1 : 0;
  const labels = ["Ready to grow", "Just planted", "Sprouting", "Taking root", "Growing strong"];
  return (
    <div className="flex flex-col items-center py-4">
      <svg viewBox="0 0 80 100" className="h-24 w-20 text-accent" aria-hidden>
        <ellipse cx="40" cy="92" rx="18" ry="4" fill="currentColor" opacity="0.15" />
        <path d="M26 78h28l-3.5 12H29.5z" fill="currentColor" opacity="0.28" />
        <rect x="24" y="74" width="32" height="5" rx="1.5" fill="currentColor" opacity="0.45" />
        {stage >= 1 && (
          <path
            d="M40 74C40 58 40 46 40 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        )}
        {stage >= 1 && (
          <path d="M40 58c-8-2-13-9-12-16 8 2 13 9 12 16z" fill="currentColor" opacity="0.9" />
        )}
        {stage >= 2 && (
          <path d="M40 50c8-1 13-7 11-14-7 2-12 8-11 14z" fill="currentColor" opacity="0.75" />
        )}
        {stage >= 3 && (
          <>
            <path d="M40 42c-7-3-10-10-8-16 7 2 10 10 8 16z" fill="currentColor" opacity="0.85" />
            <circle cx="40" cy="28" r="3.2" fill="currentColor" />
          </>
        )}
        {stage >= 4 && (
          <>
            <path d="M40 36c8-3 12-9 10-16-7 2-11 9-10 16z" fill="currentColor" opacity="0.7" />
            <circle cx="32" cy="24" r="2.4" fill="currentColor" opacity="0.85" />
            <circle cx="48" cy="22" r="2.4" fill="currentColor" opacity="0.85" />
          </>
        )}
        {stage === 0 && (
          <ellipse cx="40" cy="70" rx="6" ry="4" fill="currentColor" opacity="0.7" />
        )}
      </svg>
      <p className="mt-1 text-sm text-muted">{labels[stage]}</p>
    </div>
  );
}

export function WeekStrip({
  habits,
  completions,
}: {
  habits: Habit[];
  completions: Completion[];
}) {
  const today = todayKey();
  const keys = weekKeys(today);
  return (
    <div className="mb-5 flex gap-1.5" role="list" aria-label="This week">
      {keys.map((k) => {
        const d = fromKey(k);
        const pct = dayCompletionPct(habits, completions, k);
        const isToday = k === today;
        const done = pct === 100;
        const partial = pct != null && pct > 0 && pct < 100;
        return (
          <div
            key={k}
            role="listitem"
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center rounded-sm bg-surface px-1 py-2.5",
              isToday && "ring-1 ring-accent",
            )}
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-subtle">
              {DAY_NAMES[d.getDay()]}
            </span>
            <span className="my-1 text-sm font-semibold tabular-nums">{d.getDate()}</span>
            <span
              className={cn(
                "size-2 rounded-full bg-border",
                done && "bg-accent",
                partial && "bg-warning",
              )}
              title={pct != null ? `${pct}%` : "—"}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ConsistencyCalendar({
  monthKey,
  habits,
  completions,
  habit,
}: {
  monthKey: string;
  habits: Habit[];
  completions: Completion[];
  habit?: Habit;
}) {
  const cells = monthGrid(monthKey);
  const today = todayKey();
  const levelClass = [
    "bg-surface text-muted",
    "bg-accent/20 text-fg",
    "bg-accent/40 text-fg",
    "bg-accent/65 text-accent-fg",
    "bg-accent text-accent-fg font-semibold",
  ];
  return (
    <div>
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Monthly consistency">
        {DAY_NAMES.map((n) => (
          <div key={n} className="py-1 text-center text-[0.7rem] font-semibold text-subtle">
            {n.charAt(0)}
          </div>
        ))}
        {cells.map((cell) => {
          let level = 0;
          if (!cell.other) {
            if (habit) {
              const scheduled = isScheduledOn(habit, cell.key);
              const done = scheduled && isCompleted(completions, habit.id, cell.key);
              level = done ? 4 : 0;
            } else {
              level = levelFromPct(dayCompletionPct(habits, completions, cell.key));
            }
          }
          return (
            <div
              key={cell.key}
              title={cell.key}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xs text-xs font-medium",
                cell.other ? "opacity-30" : levelClass[level],
                cell.key === today && "ring-2 ring-accent ring-offset-0",
              )}
            >
              {fromKey(cell.key).getDate()}
            </div>
          );
        })}
      </div>
      {!habit && (
        <div className="mt-3 flex items-center justify-end gap-1 text-[0.7rem] text-subtle">
          Less
          <span className="size-3.5 rounded-xs bg-surface" />
          <span className="size-3.5 rounded-xs bg-accent/20" />
          <span className="size-3.5 rounded-xs bg-accent/40" />
          <span className="size-3.5 rounded-xs bg-accent/65" />
          <span className="size-3.5 rounded-xs bg-accent" />
          More
        </div>
      )}
    </div>
  );
}
