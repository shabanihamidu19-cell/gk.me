import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Sheet } from "@/components/ui/sheet";
import { ConsistencyCalendar, HabitGlyph, ICON_MAP } from "@/components/sprout/visuals";
import {
  bestStreak,
  completionRate,
  currentStreak,
  DAY_NAMES,
  FREQ_OPTIONS,
  HABIT_COLOR_IDS,
  HABIT_ICON_IDS,
  MOODS,
  colorVar,
  freqLabel,
  formatMinutes,
  startOfMonth,
  todayKey,
  type FreqType,
  type Goal,
  type Habit,
  type HabitColorId,
  type HabitIconId,
} from "@/lib/sprout/domain";
import { useSproutStore } from "@/lib/sprout/store";
import { download, exportCompletionsCSV, exportHabitsCSV, exportJSON, exportReflectionsCSV, stamp } from "@/lib/sprout/export";
import { cn } from "@/lib/utils";
import type { SheetState } from "./sheet-state";

export function SproutSheets({
  sheet,
  setSheet,
}: {
  sheet: SheetState;
  setSheet: (s: SheetState) => void;
}) {
  const close = () => setSheet(null);
  return (
    <>
      {(sheet?.type === "habit") && (
        <HabitForm existing={sheet.habit} onClose={close} />
      )}
      {sheet?.type === "habit-detail" && (
        <HabitDetail id={sheet.id} onClose={close} onEdit={(h) => setSheet({ type: "habit", habit: h })} />
      )}
      {sheet?.type === "goal" && <GoalForm existing={sheet.goal} onClose={close} />}
      {sheet?.type === "goal-detail" && (
        <GoalDetail id={sheet.id} onClose={close} onEdit={(g) => setSheet({ type: "goal", goal: g })} />
      )}
      {sheet?.type === "reflect" && <ReflectForm onClose={close} />}
      {sheet?.type === "screentime" && <ScreenTimeForm onClose={close} />}
      {sheet?.type === "st-goal" && <ScreenTimeGoalForm onClose={close} />}
      {sheet?.type === "focus-timer" && <FocusTimer onClose={close} />}
      {sheet?.type === "export" && <ExportSheet onClose={close} />}
    </>
  );
}

function HabitForm({ existing, onClose }: { existing?: Habit; onClose: () => void }) {
  const addHabit = useSproutStore((s) => s.addHabit);
  const updateHabit = useSproutStore((s) => s.updateHabit);
  const [name, setName] = useState(existing?.name ?? "");
  const [why, setWhy] = useState(existing?.why ?? "");
  const [min, setMin] = useState(existing?.minimumVersion ?? "");
  const [icon, setIcon] = useState<HabitIconId>(existing?.icon ?? "sprout");
  const [color, setColor] = useState<HabitColorId>(existing?.color ?? "habit-1");
  const [freq, setFreq] = useState<FreqType>(existing?.frequency?.type ?? "daily");
  const [days, setDays] = useState<number[]>(existing?.frequency?.days ?? []);
  const [times, setTimes] = useState(existing?.frequency?.times ?? 3);

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast("Please enter a name");
      return;
    }
    if (freq === "custom" && days.length === 0) {
      toast("Select at least one day");
      return;
    }
    const frequency =
      freq === "custom"
        ? { type: freq, days: [...days].sort((a, b) => a - b) }
        : freq === "xtimes"
          ? { type: freq, times: Math.min(7, Math.max(1, times)) }
          : freq === "weekly"
            ? { type: freq, preferredDay: 0 }
            : { type: freq };
    const payload = {
      name: trimmed,
      icon,
      color,
      why: why.trim(),
      minimumVersion: min.trim(),
      frequency,
    };
    if (existing) {
      updateHabit(existing.id, payload);
      toast("Habit updated");
    } else {
      addHabit(payload);
      toast("Habit created");
    }
    onClose();
  };

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title={existing ? "Edit habit" : "New habit"}>
      <Field label="Name" htmlFor="h-name">
        <Input id="h-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Morning stretch" maxLength={60} autoComplete="off" />
      </Field>
      <Field label="Why? (optional)" htmlFor="h-why">
        <Input id="h-why" value={why} onChange={(e) => setWhy(e.target.value)} placeholder="What this protects" maxLength={120} />
      </Field>
      <Field label="Minimum version (optional)" htmlFor="h-min">
        <Input id="h-min" value={min} onChange={(e) => setMin(e.target.value)} placeholder="Five minutes is enough" maxLength={80} />
      </Field>
      <Field label="Icon">
        <div className="flex flex-wrap gap-2">
          {HABIT_ICON_IDS.map((id) => {
            const Icon = ICON_MAP[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setIcon(id)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-sm bg-surface text-fg",
                  icon === id && "ring-2 ring-fg scale-105",
                )}
                aria-label={id}
              >
                <Icon className="size-4" />
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Color">
        <div className="flex flex-wrap gap-2">
          {HABIT_COLOR_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setColor(id)}
              className={cn("size-9 rounded-sm", color === id && "ring-2 ring-fg scale-105")}
              style={{ background: colorVar(id) }}
              aria-label={id}
            />
          ))}
        </div>
      </Field>
      <Field label="Frequency">
        <div className="flex flex-wrap gap-2">
          {FREQ_OPTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFreq(f.id)}
              className={cn(
                "rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium",
                freq === f.id && "border-accent bg-accent-soft text-accent",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Field>
      {freq === "custom" && (
        <Field label="Days">
          <div className="flex flex-wrap gap-1.5">
            {DAY_NAMES.map((n, i) => (
              <button
                key={n}
                type="button"
                onClick={() =>
                  setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
                }
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold",
                  days.includes(i) && "border-accent bg-accent text-accent-fg",
                )}
              >
                {n.charAt(0)}
              </button>
            ))}
          </div>
        </Field>
      )}
      {freq === "xtimes" && (
        <Field label="Times per week" htmlFor="h-times">
          <Input id="h-times" type="number" min={1} max={7} value={times} onChange={(e) => setTimes(Number(e.target.value))} />
        </Field>
      )}
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={save}>
          {existing ? "Save" : "Create"}
        </Button>
      </div>
    </Sheet>
  );
}

function HabitDetail({
  id,
  onClose,
  onEdit,
}: {
  id: string;
  onClose: () => void;
  onEdit: (h: Habit) => void;
}) {
  const habit = useSproutStore((s) => s.habits.find((h) => h.id === id));
  const completions = useSproutStore((s) => s.completions);
  const archiveHabit = useSproutStore((s) => s.archiveHabit);
  const deleteHabit = useSproutStore((s) => s.deleteHabit);
  const [confirmDel, setConfirmDel] = useState(false);
  if (!habit) return null;
  const rate = completionRate(habit, completions, 30);
  const current = currentStreak(habit, completions);
  const best = bestStreak(habit, completions);
  const total = completions.filter((c) => c.habitId === id && c.status === "done").length;
  const monthKey = startOfMonth(todayKey());

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title={habit.name}>
      <div className="mb-6 flex items-center gap-4">
        <HabitGlyph icon={habit.icon} color={habit.color} size="lg" />
        <div>
          <p className="text-sm text-muted">{habit.why || freqLabel(habit)}</p>
          {habit.minimumVersion && (
            <p className="mt-1 text-xs text-subtle">Min: {habit.minimumVersion}</p>
          )}
        </div>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3">
        <Stat num={current} lbl="Current streak" />
        <Stat num={best} lbl="Best streak" />
        <Stat num={`${rate}%`} lbl="30-day rate" />
        <Stat num={total} lbl="Total" />
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">This month</p>
      <ConsistencyCalendar monthKey={monthKey} habits={[habit]} completions={completions} habit={habit} />
      <div className="mt-6 flex flex-col gap-2">
        <Button variant="secondary" onClick={() => onEdit(habit)}>
          Edit habit
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            archiveHabit(id, !habit.archivedAt);
            toast(habit.archivedAt ? "Habit restored" : "Habit archived");
            onClose();
          }}
        >
          {habit.archivedAt ? "Unarchive" : "Archive"}
        </Button>
        {confirmDel ? (
          <Button
            variant="danger"
            onClick={() => {
              deleteHabit(id);
              toast("Habit deleted");
              onClose();
            }}
          >
            Confirm delete
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setConfirmDel(true)}>
            Delete habit
          </Button>
        )}
      </div>
    </Sheet>
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

function GoalForm({ existing, onClose }: { existing?: Goal; onClose: () => void }) {
  const allHabits = useSproutStore((s) => s.habits);
  const addGoal = useSproutStore((s) => s.addGoal);
  const updateGoal = useSproutStore((s) => s.updateGoal);
  const habits = allHabits.filter((h) => !h.archivedAt);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [desc, setDesc] = useState(existing?.description ?? "");
  const [ids, setIds] = useState<string[]>(existing?.habitIds ?? []);

  const save = () => {
    const t = title.trim();
    if (!t) {
      toast("Please enter a title");
      return;
    }
    if (existing) {
      updateGoal(existing.id, { title: t, description: desc.trim(), habitIds: ids });
      toast("Goal updated");
    } else {
      addGoal({ title: t, description: desc.trim(), habitIds: ids });
      toast("Goal created");
    }
    onClose();
  };

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title={existing ? "Edit goal" : "New goal"}>
      <Field label="Title" htmlFor="g-title">
        <Input id="g-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A quieter mind" maxLength={80} />
      </Field>
      <Field label="Description (optional)" htmlFor="g-desc">
        <Textarea id="g-desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does success look like?" maxLength={200} />
      </Field>
      <Field label="Link habits">
        {habits.length === 0 ? (
          <p className="text-sm text-subtle">Create habits first, then link them here.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {habits.map((h) => (
              <label
                key={h.id}
                className="flex cursor-pointer items-center gap-3 rounded-sm bg-surface px-3 py-2.5"
              >
                <input
                  type="checkbox"
                  checked={ids.includes(h.id)}
                  onChange={() =>
                    setIds((cur) => (cur.includes(h.id) ? cur.filter((x) => x !== h.id) : [...cur, h.id]))
                  }
                  className="size-4 accent-accent"
                />
                <HabitGlyph icon={h.icon} color={h.color} size="sm" />
                <span className="text-sm">{h.name}</span>
              </label>
            ))}
          </div>
        )}
      </Field>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={save}>
          {existing ? "Save" : "Create"}
        </Button>
      </div>
    </Sheet>
  );
}

function GoalDetail({
  id,
  onClose,
  onEdit,
}: {
  id: string;
  onClose: () => void;
  onEdit: (g: Goal) => void;
}) {
  const goal = useSproutStore((s) => s.goals.find((g) => g.id === id));
  const habits = useSproutStore((s) => s.habits);
  const completions = useSproutStore((s) => s.completions);
  const deleteGoal = useSproutStore((s) => s.deleteGoal);
  const [confirmDel, setConfirmDel] = useState(false);
  if (!goal) return null;
  const linked = (goal.habitIds ?? []).map((hid) => habits.find((h) => h.id === hid)).filter(Boolean) as Habit[];

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title={goal.title}>
      {goal.description && <p className="mb-4 text-sm text-muted">{goal.description}</p>}
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">Linked habits</p>
      {linked.length === 0 ? (
        <p className="text-sm text-subtle">No habits linked yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {linked.map((h) => (
            <div key={h.id} className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-3">
              <HabitGlyph icon={h.icon} color={h.color} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{h.name}</div>
                <div className="text-xs text-subtle">{completionRate(h, completions, 30)}% last 30 days</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-2">
        <Button variant="secondary" onClick={() => onEdit(goal)}>
          Edit goal
        </Button>
        {confirmDel ? (
          <Button
            variant="danger"
            onClick={() => {
              deleteGoal(id);
              toast("Goal deleted");
              onClose();
            }}
          >
            Confirm delete
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setConfirmDel(true)}>
            Delete goal
          </Button>
        )}
      </div>
    </Sheet>
  );
}

function ReflectForm({ onClose }: { onClose: () => void }) {
  const today = todayKey();
  const existing = useSproutStore((s) => s.reflections.find((r) => r.date === today));
  const saveReflection = useSproutStore((s) => s.saveReflection);
  const [mood, setMood] = useState<number | null>(existing?.mood ?? null);
  const [wentWell, setWentWell] = useState(existing?.wentWell ?? "");
  const [proud, setProud] = useState(existing?.proud ?? "");
  const [improve, setImprove] = useState(existing?.improve ?? "");

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title="How was today?">
      <div className="mb-4 flex justify-between gap-2" role="group" aria-label="Mood">
        {MOODS.map((m, i) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setMood(i)}
            className={cn(
              "flex aspect-square max-w-14 flex-1 flex-col items-center justify-center rounded-md border-2 border-transparent bg-surface text-[0.65rem] font-medium text-muted",
              mood === i && "border-accent bg-accent-soft text-accent scale-105",
            )}
            aria-label={m.label}
            title={m.hint}
          >
            {m.label}
          </button>
        ))}
      </div>
      <Field label="What went well?" htmlFor="r-well">
        <Textarea id="r-well" value={wentWell} onChange={(e) => setWentWell(e.target.value)} placeholder="Optional" />
      </Field>
      <Field label="What am I proud of?" htmlFor="r-proud">
        <Textarea id="r-proud" value={proud} onChange={(e) => setProud(e.target.value)} placeholder="Optional" />
      </Field>
      <Field label="What do I want to improve tomorrow?" htmlFor="r-improve">
        <Textarea id="r-improve" value={improve} onChange={(e) => setImprove(e.target.value)} placeholder="Optional" />
      </Field>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            saveReflection({
              date: today,
              mood,
              wentWell: wentWell.trim(),
              proud: proud.trim(),
              improve: improve.trim(),
            });
            toast("Reflection saved");
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Sheet>
  );
}

function ScreenTimeForm({ onClose }: { onClose: () => void }) {
  const today = todayKey();
  const existing = useSproutStore((s) => s.screenTime.find((x) => x.date === today));
  const saveScreenTime = useSproutStore((s) => s.saveScreenTime);
  const [total, setTotal] = useState(
    existing?.osMinutes != null ? String(existing.osMinutes) : existing?.totalMinutes ? String(Math.round(existing.totalMinutes)) : "",
  );
  const [social, setSocial] = useState(existing?.social != null ? String(existing.social) : "");
  const [ent, setEnt] = useState(existing?.entertainment != null ? String(existing.entertainment) : "");
  const [note, setNote] = useState(existing?.note ?? "");

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title="Log screen time">
      <p className="mb-4 text-sm text-muted">
        Open Settings → Screen Time / Digital Wellbeing on your phone, then enter the daily total here.
      </p>
      <Field label="Total (minutes)" htmlFor="st-total">
        <Input id="st-total" type="number" min={0} max={1440} placeholder="e.g. 245" value={total} onChange={(e) => setTotal(e.target.value)} />
        <p className="mt-1.5 text-xs text-subtle">Example: 2h 30m = 150 minutes</p>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Social (optional)" htmlFor="st-social">
          <Input id="st-social" type="number" min={0} placeholder="min" value={social} onChange={(e) => setSocial(e.target.value)} />
        </Field>
        <Field label="Entertainment" htmlFor="st-ent">
          <Input id="st-ent" type="number" min={0} placeholder="min" value={ent} onChange={(e) => setEnt(e.target.value)} />
        </Field>
      </div>
      <Field label="Note (optional)" htmlFor="st-note">
        <Input id="st-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="A work-heavy day" maxLength={80} />
      </Field>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            const n = Number(total);
            if (Number.isNaN(n) || n < 0) {
              toast("Enter a valid number of minutes");
              return;
            }
            saveScreenTime({
              date: today,
              osMinutes: Math.round(n),
              totalMinutes: Math.round(n),
              social: Number(social) || null,
              entertainment: Number(ent) || null,
              note: note.trim(),
            });
            toast("Screen time saved");
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Sheet>
  );
}

function ScreenTimeGoalForm({ onClose }: { onClose: () => void }) {
  const goal = useSproutStore((s) => s.settings.screenTimeGoalMin);
  const setScreenTimeGoal = useSproutStore((s) => s.setScreenTimeGoal);
  const [val, setVal] = useState(String(goal));
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title="Screen time goal">
      <p className="mb-4 text-sm text-muted">Daily upper bound for time on screens, in minutes.</p>
      <Field label="Minutes / day" htmlFor="st-goal">
        <Input id="st-goal" type="number" min={30} max={1440} value={val} onChange={(e) => setVal(e.target.value)} />
        <p className="mt-1.5 text-xs text-subtle">Now: {formatMinutes(goal)} · Example: 3h = 180</p>
      </Field>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            setScreenTimeGoal(Number(val));
            toast("Goal updated");
            onClose();
          }}
        >
          Save goal
        </Button>
      </div>
    </Sheet>
  );
}

function FocusTimer({ onClose }: { onClose: () => void }) {
  const addFocusSession = useSproutStore((s) => s.addFocusSession);
  const [chosen, setChosen] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
  };

  const start = () => {
    if (running) {
      stop();
      return;
    }
    setRunning(true);
    timer.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          stop();
          toast.success("Focus session finished");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const m = Math.floor(remaining / 60);
  const sec = remaining % 60;

  return (
    <Sheet open onOpenChange={(o) => { if (!o) { stop(); onClose(); } }} title="Focus session">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {[15, 25, 45, 60].map((mins) => (
          <button
            key={mins}
            type="button"
            disabled={running}
            onClick={() => {
              setChosen(mins);
              setRemaining(mins * 60);
            }}
            className={cn(
              "rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-semibold",
              chosen === mins && "border-accent bg-accent-soft text-accent",
            )}
          >
            {mins}m
          </button>
        ))}
      </div>
      <div className="my-4 text-center font-display text-5xl font-semibold tracking-tight tabular-nums">
        {String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")}
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={start}>{running ? "Pause" : "Start"}</Button>
        <Button
          variant="secondary"
          onClick={() => {
            stop();
            const elapsed = Math.round((chosen * 60 - remainingRef.current) / 60);
            if (elapsed >= 1) {
              addFocusSession({
                date: todayKey(),
                minutes: elapsed,
                plannedMinutes: chosen,
                completedAt: new Date().toISOString(),
              });
              toast(`Focus: ${elapsed} minutes`);
            }
            onClose();
          }}
        >
          Save and close
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            stop();
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </Sheet>
  );
}

function ExportSheet({ onClose }: { onClose: () => void }) {
  const habitCount = useSproutStore((s) => s.habits.length);
  const completionCount = useSproutStore((s) => s.completions.length);
  const reflectionCount = useSproutStore((s) => s.reflections.length);
  const Item = ({
    label,
    hint,
    onClick,
  }: {
    label: string;
    hint: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="mb-2 flex w-full items-center justify-between rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover"
    >
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-subtle">{hint}</div>
      </div>
    </button>
  );
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title="Export data">
      <p className="mb-5 text-sm text-muted">
        Download a copy of your progress. Full backups can be imported later on any device.
      </p>
      <Item
        label="Full backup (JSON)"
        hint={`${habitCount} habits · ${completionCount} check-ins · ${reflectionCount} reflections`}
        onClick={() => {
          download(stamp("backup", "json"), exportJSON(), "application/json");
          toast("Backup downloaded");
        }}
      />
      <Item
        label="Habits (CSV)"
        hint="Open in a spreadsheet"
        onClick={() => {
          download(stamp("habits", "csv"), exportHabitsCSV(), "text/csv;charset=utf-8");
          toast("Habits CSV downloaded");
        }}
      />
      <Item
        label="Check-ins (CSV)"
        hint={`${completionCount} rows`}
        onClick={() => {
          download(stamp("checkins", "csv"), exportCompletionsCSV(), "text/csv;charset=utf-8");
          toast("Check-ins CSV downloaded");
        }}
      />
      <Item
        label="Reflections (CSV)"
        hint={`${reflectionCount} rows`}
        onClick={() => {
          download(stamp("reflections", "csv"), exportReflectionsCSV(), "text/csv;charset=utf-8");
          toast("Reflections CSV downloaded");
        }}
      />
      <Button variant="secondary" className="mt-4 w-full" onClick={onClose}>
        Close
      </Button>
    </Sheet>
  );
}
