import { useEffect, useState } from "react";
import { BarChart3, Clock3, Home, Plus, Settings, Target } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { TodayView } from "@/components/sprout/today-view";
import { ProgressView } from "@/components/sprout/progress-view";
import { GoalsView } from "@/components/sprout/goals-view";
import { FocusView } from "@/components/sprout/focus-view";
import { SettingsView } from "@/components/sprout/settings-view";
import { SproutSheets } from "@/components/sprout/sheets";
import type { SheetState } from "@/components/sprout/sheet-state";
import { startAutomation } from "@/lib/sprout/automation";
import { hydrateSproutStore, useSproutStore } from "@/lib/sprout/store";
import type { ViewName } from "@/lib/sprout/domain";
import { cn } from "@/lib/utils";

const NAV: { id: ViewName; label: string; icon: typeof Home }[] = [
  { id: "today", label: "Today", icon: Home },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "goals", label: "Goals", icon: Target },
  { id: "focus", label: "Focus", icon: Clock3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const hydrated = useSproutStore((s) => s.hydrated);
  const view = useSproutStore((s) => s.view);
  const setView = useSproutStore((s) => s.setView);
  const [sheet, setSheet] = useState<SheetState>(null);

  useEffect(() => {
    void hydrateSproutStore().then(() => startAutomation());
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-3 text-muted">
          <svg viewBox="0 0 80 100" className="h-16 w-12 text-accent" aria-hidden>
            <path d="M40 78C40 58 40 46 40 34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M40 58c-8-2-13-9-12-16 8 2 13 9 12 16z" fill="currentColor" />
            <path d="M40 50c8-1 13-7 11-14-7 2-12 8-11 14z" fill="currentColor" opacity="0.75" />
          </svg>
          <p className="font-display text-lg text-fg">Sprout</p>
        </div>
      </div>
    );
  }

  const showFab = view === "today" || view === "goals";

  return (
    <div className="min-h-dvh bg-canvas">
      <div className="relative mx-auto flex min-h-dvh max-w-[480px] flex-col bg-bg sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]">
          {view === "today" && <TodayView openSheet={setSheet} />}
          {view === "progress" && <ProgressView openSheet={setSheet} />}
          {view === "goals" && <GoalsView openSheet={setSheet} />}
          {view === "focus" && <FocusView openSheet={setSheet} />}
          {view === "settings" && <SettingsView openSheet={setSheet} />}
        </main>

        {showFab && (
          <Button
            size="fab"
            className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-[max(1.25rem,calc(50%-240px+1.25rem))] z-40"
            aria-label={view === "goals" ? "Add goal" : "Add habit"}
            onClick={() => setSheet(view === "goals" ? { type: "goal" } : { type: "habit" })}
          >
            <Plus className="size-7" strokeWidth={2.5} />
          </Button>
        )}

        <nav
          className="fixed bottom-0 left-1/2 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-border bg-bg-elevated/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:rounded-b-lg"
          aria-label="Main"
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "flex min-w-16 flex-col items-center gap-0.5 rounded-xs px-3 py-2 text-[0.7rem] font-medium text-subtle transition-colors",
                  active && "text-accent",
                )}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <SproutSheets sheet={sheet} setSheet={setSheet} />
      </div>
      <Toaster
        theme="dark"
        position="bottom-center"
        offset="108px"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
          },
        }}
      />
    </div>
  );
}
