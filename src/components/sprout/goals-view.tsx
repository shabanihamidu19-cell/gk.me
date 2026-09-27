import { Button } from "@/components/ui/button";
import { completionRate } from "@/lib/sprout/domain";
import { useSproutStore } from "@/lib/sprout/store";
import type { SheetState } from "./sheet-state";

export function GoalsView({ openSheet }: { openSheet: (s: SheetState) => void }) {
  const goals = useSproutStore((s) => s.goals);
  const habits = useSproutStore((s) => s.habits);
  const completions = useSproutStore((s) => s.completions);

  return (
    <div>
      <header className="sticky top-0 z-40 flex min-h-14 items-center justify-between bg-bg/92 px-5 py-3 backdrop-blur-md">
        <h1 className="font-display text-xl font-semibold tracking-tight">Goals</h1>
      </header>
      <div className="px-5 pb-8 pt-2">
        {goals.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold">No goals yet</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
              Connect habits to a larger purpose. Goals make daily actions meaningful.
            </p>
            <Button className="mt-6" onClick={() => openSheet({ type: "goal" })}>
              Create a goal
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {goals.map((g) => {
              const linked = (g.habitIds ?? [])
                .map((id) => habits.find((h) => h.id === id))
                .filter(Boolean);
              const avg = linked.length
                ? Math.round(
                    linked.reduce((sum, h) => sum + completionRate(h!, completions, 30), 0) /
                      linked.length,
                  )
                : 0;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => openSheet({ type: "goal-detail", id: g.id })}
                  className="rounded-md border border-border bg-surface p-4 text-left hover:bg-surface-hover"
                >
                  <h3 className="font-semibold">{g.title}</h3>
                  {g.description && (
                    <p className="mt-1 mb-3 text-sm text-muted">{g.description}</p>
                  )}
                  {!g.description && <div className="mb-3" />}
                  <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-300"
                      style={{ width: `${avg}%` }}
                    />
                  </div>
                  <p className="text-xs text-subtle tabular-nums">
                    {linked.length} habit{linked.length === 1 ? "" : "s"} · {avg}% avg
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
