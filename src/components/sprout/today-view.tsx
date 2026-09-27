import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HabitGlyph, ProgressRing, WeekStrip } from "@/components/sprout/visuals";
import {
  daysSinceLastActivity,
  greeting,
  formatLong,
  isCompleted,
  overallConsistencyStreak,
  scheduledHabits,
  todayKey,
} from "@/lib/sprout/domain";
import { encourage } from "@/lib/sprout/automation";
import { useSproutStore } from "@/lib/sprout/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SheetState } from "./sheet-state";

export function TodayView({ openSheet }: { openSheet: (s: SheetState) => void }) {
  const habits = useSproutStore((s) => s.habits);
  const completions = useSproutStore((s) => s.completions);
  const toggleCompletion = useSproutStore((s) => s.toggleCompletion);
  const today = todayKey();
  const scheduled = scheduledHabits(habits, today);
  const completed = scheduled.filter((h) => isCompleted(completions, h.id, today));
  const pct = scheduled.length ? Math.round((completed.length / scheduled.length) * 100) : 0;
  const streak = overallConsistencyStreak(habits, completions);
  const daysAway = daysSinceLastActivity(completions);
  const active = habits.filter((h) => !h.archivedAt);

  return (
    <div>
      <header className="sticky top-0 z-40 flex min-h-14 items-center justify-between border-b border-transparent bg-bg/92 px-5 py-3 backdrop-blur-md">
        <h1 className="font-display text-xl font-semibold tracking-tight">Sprout</h1>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Daily reflection"
          onClick={() => openSheet({ type: "reflect" })}
        >
          <MessageCircle className="size-5" />
        </Button>
      </header>

      <div className="px-5 pb-8 pt-4">
        {daysAway != null && daysAway >= 3 && scheduled.length > 0 && (
          <div className="mb-5 rounded-md border border-accent/25 bg-accent-soft px-5 py-5 text-center">
            <p className="font-display text-lg font-semibold">You're back</p>
            <p className="mt-1 text-sm text-muted">You don't need to catch up. Start with one small step.</p>
          </div>
        )}

        <div className="mb-5">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-subtle">
            {formatLong(today)}
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">{greeting()}</h2>
          <p className="mt-1 text-sm text-muted">
            {scheduled.length === 0
              ? "Ready to plant your first habit?"
              : pct === 100
                ? "All done for today. Well done."
                : "Small progress counts."}
          </p>
        </div>

        <WeekStrip habits={habits} completions={completions} />

        {scheduled.length > 0 && (
          <div className="mb-5 flex items-center gap-5 rounded-md border border-border bg-surface p-5">
            <ProgressRing pct={pct} />
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Completed</span>
                <span className="font-semibold tabular-nums">
                  {completed.length} / {scheduled.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Consistency</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent tabular-nums">
                  {streak} day{streak === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
        )}

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">Today's habits</p>

        {scheduled.length === 0 ? (
          active.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold">No habits yet</p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                Start small. One habit is enough to begin.
              </p>
              <Button className="mt-6" onClick={() => openSheet({ type: "habit" })}>
                Add your first habit
              </Button>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold">Nothing scheduled today</p>
              <p className="mt-2 text-sm text-muted">Enjoy the free day, or add a habit for today.</p>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2.5">
            {scheduled.map((h) => {
              const done = isCompleted(completions, h.id, today);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => {
                    const nowDone = toggleCompletion(h.id, today);
                    if (nowDone) toast(encourage());
                  }}
                  className={cn(
                    "flex min-h-16 items-center gap-3.5 rounded-md border border-border bg-surface px-4 py-3.5 text-left transition-colors duration-150 hover:bg-surface-hover active:scale-[0.99]",
                    done && "border-accent/30 bg-accent/5",
                  )}
                  aria-label={`${h.name}, ${done ? "completed" : "not completed"}`}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-border",
                      done && "border-accent bg-accent text-accent-fg",
                    )}
                    aria-hidden
                  >
                    {done && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <HabitGlyph icon={h.icon} color={h.color} />
                  <div className="min-w-0 flex-1">
                    <div className={cn("truncate font-semibold", done && "text-muted")}>{h.name}</div>
                    {h.minimumVersion && (
                      <div className="mt-0.5 text-xs text-subtle">{h.minimumVersion}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
