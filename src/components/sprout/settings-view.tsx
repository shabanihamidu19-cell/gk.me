import { useRef, useState } from "react";
import { toast } from "sonner";
import { fireTestReminder, requestNotificationPermission } from "@/lib/sprout/automation";
import { parseImport } from "@/lib/sprout/export";
import { useSproutStore } from "@/lib/sprout/store";
import { cn } from "@/lib/utils";
import type { SheetState } from "./sheet-state";

export function SettingsView({ openSheet }: { openSheet: (s: SheetState) => void }) {
  const habits = useSproutStore((s) => s.habits.length);
  const completions = useSproutStore((s) => s.completions.length);
  const reflections = useSproutStore((s) => s.reflections.length);
  const settings = useSproutStore((s) => s.settings);
  const updateSettings = useSproutStore((s) => s.updateSettings);
  const importData = useSproutStore((s) => s.importData);
  const clearAll = useSproutStore((s) => s.clearAll);
  const loadSample = useSproutStore((s) => s.loadSample);
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-40 flex min-h-14 items-center bg-bg/92 px-5 py-3 backdrop-blur-md">
        <h1 className="font-display text-xl font-semibold tracking-tight">Settings</h1>
      </header>
      <div className="px-5 pb-8 pt-2">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">Your data</p>
        <p className="mb-4 text-sm text-muted">
          {habits} habit{habits === 1 ? "" : "s"} · {completions} check-in{completions === 1 ? "" : "s"} ·{" "}
          {reflections} reflection{reflections === 1 ? "" : "s"}
        </p>

        <div className="mb-6 flex flex-col gap-1">
          <Row label="Export data" onClick={() => openSheet({ type: "export" })} />
          <Row label="Import backup" onClick={() => fileRef.current?.click()} />
          <Row
            label="Load sample data"
            onClick={() => {
              loadSample();
              toast("Sample data loaded");
            }}
          />
          <Row
            label={confirmClear ? "Tap again to confirm clear" : "Clear all data"}
            danger
            onClick={() => {
              if (!confirmClear) {
                setConfirmClear(true);
                return;
              }
              clearAll();
              setConfirmClear(false);
              toast("All data cleared");
            }}
          />
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const parsed = parseImport(String(reader.result));
              if (parsed && importData(parsed)) toast("Backup restored");
              else toast("Invalid backup file");
            };
            reader.readAsText(file);
          }}
        />

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">Automation</p>
        <div className="mb-6 flex flex-col gap-1">
          <Toggle
            label="Track time in this app"
            hint="Adds minutes while Sprout is open. Syncs in the background."
            on={settings.autoTrack}
            onChange={(v) => updateSettings({ autoTrack: v })}
          />
          <Toggle
            label="Daily reminders"
            hint={`Morning ${pad(settings.reminderHour)}:00 · Evening ${pad(settings.eveningHour)}:00`}
            on={settings.remindersEnabled}
            onChange={(v) => updateSettings({ remindersEnabled: v })}
          />
          <Row
            label={settings.notificationsGranted ? "System notifications on" : "Enable system notifications"}
            onClick={async () => {
              const ok = await requestNotificationPermission();
              toast(ok ? "Notifications enabled" : "Permission declined — in-app reminders still work");
            }}
          />
          <Row label="Send a test reminder" onClick={() => fireTestReminder()} />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">About</p>
        <p className="mt-2 text-center text-sm leading-relaxed text-subtle">
          Sprout stores everything locally on this device.
          <br />
          No accounts. No tracking. Progress over perfection.
        </p>
        <p className="mt-3 text-center text-xs text-subtle">v1.0 · Offline-first</p>
      </div>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Row({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-12 items-center justify-between rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover",
        danger && "text-danger",
      )}
    >
      <span>{label}</span>
    </button>
  );
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex min-h-12 items-center justify-between gap-4 rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover"
    >
      <span>
        <span className="block">{label}</span>
        <span className="block text-xs text-subtle">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-accent" : "bg-border",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-fg transition-transform",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
