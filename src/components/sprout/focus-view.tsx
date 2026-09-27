import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  completionRate,
  DAY_NAMES,
  formatMinutes,
  fromKey,
  overallConsistencyStreak,
  todayKey,
  weekKeys,
} from "@/lib/sprout/domain";
import { useSproutStore } from "@/lib/sprout/store";
import { cn } from "@/lib/utils";
import type { SheetState } from "./sheet-state";

export function FocusView({ openSheet }: { openSheet: (s: SheetState) => void }) {
  const today = todayKey();
  const goal = useSproutStore((s) => s.settings.screenTimeGoalMin || 180);
  const todayST = useSproutStore((s) => s.screenTime.find((x) => x.date === today));
  const screenTime = useSproutStore((s) => s.screenTime);
  const focusSessions = useSproutStore((s) => s.focusSessions);
  const lastSync = useSproutStore((s) => s.settings.lastSyncAt);
  const allHabits = useSproutStore((s) => s.habits);
  const completions = useSproutStore((s) => s.completions);
  const autoTrack = useSproutStore((s) => s.settings.autoTrack);
  const habits = allHabits.filter((h) => !h.archivedAt);

  const todayFocus = focusSessions
    .filter((s) => s.date === today)
    .reduce((sum, s) => sum + (s.minutes || 0), 0);

  const keys = weekKeys(today);
  const weekData = keys.map((k) => {
    const st = screenTime.find((x) => x.date === k);
    return { key: k, minutes: st ? st.totalMinutes : null };
  });
  const maxBar = Math.max(goal, ...weekData.map((w) => w.minutes || 0), 60);
  const logged = weekData.filter((w) => w.minutes != null && w.minutes > 0);
  const avg = logged.length
    ? Math.round(logged.reduce((s, w) => s + (w.minutes ?? 0), 0) / logged.length)
    : null;

  const displayMin = todayST
    ? todayST.osMinutes != null
      ? todayST.osMinutes
      : todayST.totalMinutes
    : 0;
  const hasLog = todayST != null && (todayST.osMinutes != null || todayST.totalMinutes > 0.4);
  const pctOfGoal = hasLog ? Math.round((displayMin / goal) * 100) : 0;
  const fillClass = pctOfGoal > 100 ? "bg-danger" : pctOfGoal > 85 ? "bg-warning" : "bg-accent";

  const insights: { title: string; text: string }[] = [];
  if (habits.length > 0) {
    const ranked = habits
      .map((h) => ({ h, rate: completionRate(h, completions, 30) }))
      .sort((a, b) => b.rate - a.rate);
    if (ranked[0] && ranked[0].rate > 0) {
      insights.push({
        title: ranked[0].h.name,
        text: `Your strongest habit — ${ranked[0].rate}% over the last 30 days.`,
      });
    }
    if (ranked.length > 1 && ranked[ranked.length - 1]!.rate < ranked[0]!.rate) {
      const weak = ranked[ranked.length - 1]!;
      insights.push({
        title: weak.h.name,
        text: `Needs a gentler minimum — ${weak.rate}% lately.`,
      });
    }
    const overall = overallConsistencyStreak(habits, completions);
    if (overall >= 7) {
      insights.push({
        title: `${overall}-day consistency`,
        text: "Keep the chain. Quiet days still count.",
      });
    }
  }

  const syncLabel = lastSync
    ? `Synced ${Math.max(0, Math.round((Date.now() - new Date(lastSync).getTime()) / 60000))}m ago`
    : "Waiting for first sync";

  return (
    <div>
      <header className="sticky top-0 z-40 flex min-h-14 items-center justify-between bg-bg/92 px-5 py-3 backdrop-blur-md">
        <h1 className="font-display text-xl font-semibold tracking-tight">Focus</h1>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Log screen time"
          onClick={() => openSheet({ type: "screentime" })}
        >
          <Smartphone className="size-5" />
        </Button>
      </header>

      <div className="px-5 pb-8 pt-2">
            <div className="mb-4 rounded-md border border-border bg-surface p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold">Screen time today</div>
              <div className="mt-0.5 text-xs text-subtle">
                {autoTrack ? "Auto-tracking while this app is open · " : ""}
                {syncLabel}
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => openSheet({ type: "screentime" })}>
              Log
            </Button>
          </div>
          <div className="font-display text-3xl font-semibold tracking-tight tabular-nums">
            {hasLog ? formatMinutes(displayMin) : "—"}
            {!hasLog && <span className="ml-2 text-base font-medium text-muted">not logged</span>}
          </div>
          <div
            className="my-3 h-2.5 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={Math.min(pctOfGoal, 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn("h-full rounded-full transition-[width] duration-300", fillClass)}
              style={{ width: `${Math.min(pctOfGoal, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-subtle">
            <span>Goal: {formatMinutes(goal)} / day</span>
            <span className="tabular-nums">
              {hasLog
                ? pctOfGoal <= 100
                  ? `${pctOfGoal}% of goal`
                  : `${pctOfGoal - 100}% over`
                : "—"}
            </span>
          </div>
          {todayST && todayST.osMinutes == null && todayST.autoMinutes > 0 && (
            <p className="mt-2 text-xs text-subtle">
              App-open time {formatMinutes(todayST.autoMinutes)}. Log phone Screen Time for the full picture.
            </p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border bg-surface p-4 text-center">
            <div className="font-display text-2xl font-semibold tabular-nums">{formatMinutes(todayFocus)}</div>
            <div className="mt-1 text-xs text-subtle">Focus today</div>
          </div>
          <div className="rounded-md border border-border bg-surface p-4 text-center">
            <div className="font-display text-2xl font-semibold tabular-nums">
              {avg != null ? formatMinutes(avg) : "—"}
            </div>
            <div className="mt-1 text-xs text-subtle">Week average</div>
          </div>
        </div>

        <div className="mb-4 rounded-md border border-border bg-surface p-5">
          <div className="font-semibold">This week</div>
          <div className="text-xs text-subtle">Screen time by day</div>
          <div className="mt-3 flex h-24 items-end gap-1.5" role="img" aria-label="Weekly screen time">
            {weekData.map((w) => {
              const d = fromKey(w.key);
              const has = w.minutes != null && w.minutes > 0;
              const h = has ? Math.max(4, Math.round(((w.minutes ?? 0) / maxBar) * 88)) : 4;
              const over = has && (w.minutes ?? 0) > goal;
              const warn = has && !over && (w.minutes ?? 0) > goal * 0.85;
              return (
                <div key={w.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className={cn(
                      "w-full max-w-7 rounded-t-xs",
                      !has && "bg-border",
                      has && over && "bg-danger",
                      has && warn && "bg-warning",
                      has && !over && !warn && "bg-accent",
                    )}
                    style={{ height: `${h}px` }}
                    title={has ? formatMinutes(w.minutes) : "No data"}
                  />
                  <div
                    className={cn(
                      "text-[0.65rem] font-semibold text-subtle",
                      w.key === today && "text-accent",
                    )}
                  >
                    {DAY_NAMES[d.getDay()]!.charAt(0)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-5 flex gap-2.5">
          <Button className="flex-1" onClick={() => openSheet({ type: "focus-timer" })}>
            Start focus
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => openSheet({ type: "st-goal" })}>
            Goal
          </Button>
        </div>

        <p className="mb-5 text-xs leading-relaxed text-subtle">
          <strong className="text-muted">Android:</strong> Settings → Digital Wellbeing → Screen time
          <br />
          <strong className="text-muted">iPhone:</strong> Settings → Screen Time → See All Activity
          <br />
          Copy the minutes, then tap Log. Browsers cannot read OS Screen Time directly.
        </p>

        {insights.length > 0 && (
          <>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">Habit insights</p>
            <div className="flex flex-col gap-2.5">
              {insights.map((i) => (
                <div key={i.title} className="rounded-md border border-border bg-surface p-4">
                  <div className="text-sm font-semibold text-accent">{i.title}</div>
                  <div className="mt-1 text-sm text-muted">{i.text}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
