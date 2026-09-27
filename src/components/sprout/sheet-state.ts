import type { Goal, Habit } from "@/lib/sprout/domain";

export type SheetState =
  | { type: "habit"; habit?: Habit }
  | { type: "habit-detail"; id: string }
  | { type: "goal"; goal?: Goal }
  | { type: "goal-detail"; id: string }
  | { type: "reflect" }
  | { type: "screentime" }
  | { type: "st-goal" }
  | { type: "focus-timer" }
  | { type: "export" }
  | null;
