import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsistencyCalendar, GrowthPlant, HabitGlyph } from "@/components/sprout/visuals";
import {
  addDays,
  completionRate,
  currentStreak,
  fromKey,
  MONTH_NAMES,
  overallConsistencyStreak,
  scheduledHabits,
  startOfMonth,
  todayKey,
} from "@/lib/sprout/domain";
import { useSproutStore } from "@/lib/sprout/store";
import type { SheetState } from "./sheet-state";

export function ProgressView({ openSheet }: { openSheet: (s: SheetState) => void }) {
  const allHabits = useSproutStore((s) => s.habits);
  const completions = useSproutStore((s) => s.completions);
  const habits = allHabits.filter((h) => !h.archivedAt);
  const today = todayKey();
  const [monthKey, setMonthKey] = useState(startOfMonth(today));
  const streak = overallConsistencyStreak(allHabits, completions);
  const total = completions.filter((c) => c.status === "done").length;

  let daysWithActivity = 0;
  let daysWithHabits = 0;
  for (let i = 0; i < 30; i++) {
    const d = addDays(today, -i);
    const scheduled = scheduledHabits(allHabits, d);
    if (scheduled.length > 0) {
      daysWithHabits++;
      if (scheduled.some((h) => completions.some((c) => c.habitId === h.id && c.date === d))) {
        daysWithActivity++;
      }
    }
  }
  const monthPct = daysWithHabits ? Math.round((daysWithActivity / daysWithHabits) * 100) : 0;
  const monthDate = fromKey(monthKey);

  const shiftMonth = (dir: number) => {
    const d = fromKey(monthKey);
    d.setMonth(d.getMonth() + dir);
    setMonthKey(startOfMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`));
  };

  return (
    <div>
      <header className="sticky top-0 z-40 flex min-h-14 items-center bg-bg/92 px-5 py-3 backdrop-blur-md">
        <h1 className="font-display text-xl font-semibold tracking-tight">Progress</h1>
      </header>
      <div className="px-5 pb-8 pt-2">
        <GrowthPlant streak={streak} />
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Stat num={streak} lbl="Day streak" />
          <Stat num={`${monthPct}%`} lbl="Last 30 days" />
          <Stat num={total} lbl="Total check-ins" />
          <Stat num={habits.length} lbl="Active habits" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">Consistency map</p>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[1.05rem] font-semibold">
            {MONTH_NAMES[monthDate.getMonth()]} {monthDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next month" onClick={() => shiftMonth(1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <ConsistencyCalendar monthKey={monthKey} habits={allHabits} completions={completions} />

        <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-subtle">Habits</p>
        {habits.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No habits to show yet.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {habits.map((h) => {
              const rate = completionRate(h, completions, 30);
              const cs = currentStreak(h, completions);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => openSheet({ type: "habit-detail", id: h.id })}
                  className="flex min-h-16 items-center gap-3.5 rounded-md border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover"
                >
                  <HabitGlyph icon={h.icon} color={h.color} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{h.name}</div>
                    <div className="text-xs text-subtle tabular-nums">
                      {rate}% · {cs} day streak
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-subtle" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ num, lbl }: { num: string | number; lbl: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-4 text-center">
      <div className="font-display text-2xl font-semibold tracking-tight tabular-nums">{num}</div>
      <div className="mt-1 text-xs text-subtle">{lbl}</div>
    </div>
  );
}
