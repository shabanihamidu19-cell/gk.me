import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ChartColumn, E as Apple, S as ChevronLeft, T as BookOpen, _ as Dumbbell, a as Sprout, b as Clock3, c as Plus, d as Moon, f as MessageCircle, g as Flower2, h as Footprints, i as Sun, l as PenLine, m as Heart, o as Smartphone, p as House, r as Target, s as Settings, t as Wind, u as Music, v as Droplets, w as Brain, x as ChevronRight, y as Coffee } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--K1UJh9r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 transition-transform disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-bg-elevated text-fg border border-border hover:bg-surface-hover",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			default: "min-h-12 px-5 rounded-sm text-[0.95rem]",
			sm: "min-h-9 px-3.5 rounded-sm text-sm",
			icon: "size-10 rounded-full bg-bg-elevated text-muted hover:bg-surface-hover hover:text-fg",
			fab: "size-14 rounded-full bg-accent text-accent-fg shadow-[0_4px_20px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var HABIT_ICON_IDS = [
	"sprout",
	"book",
	"dumbbell",
	"droplet",
	"brain",
	"moon",
	"apple",
	"music",
	"sun",
	"target",
	"wind",
	"heart",
	"coffee",
	"pen",
	"footprints",
	"flower"
];
var HABIT_COLOR_IDS = [
	"habit-1",
	"habit-2",
	"habit-3",
	"habit-4",
	"habit-5",
	"habit-6"
];
var MOODS = [
	{
		label: "Tough",
		hint: "A hard day"
	},
	{
		label: "Low",
		hint: "A bit off"
	},
	{
		label: "Steady",
		hint: "Even keel"
	},
	{
		label: "Good",
		hint: "Feeling well"
	},
	{
		label: "Bright",
		hint: "A great day"
	}
];
var FREQ_OPTIONS = [
	{
		id: "daily",
		label: "Every day"
	},
	{
		id: "weekdays",
		label: "Weekdays"
	},
	{
		id: "custom",
		label: "Selected days"
	},
	{
		id: "xtimes",
		label: "X times / week"
	},
	{
		id: "weekly",
		label: "Once a week"
	}
];
var DAY_NAMES = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function uid() {
	return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fromKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDays(key, n) {
	const d = fromKey(key);
	d.setDate(d.getDate() + n);
	return todayKey(d);
}
function dayOfWeek(key) {
	return fromKey(key).getDay();
}
function startOfWeek(key) {
	const d = fromKey(key);
	d.setDate(d.getDate() - d.getDay());
	return todayKey(d);
}
function startOfMonth(key) {
	const d = fromKey(key);
	return todayKey(new Date(d.getFullYear(), d.getMonth(), 1));
}
function daysInMonth(key) {
	const d = fromKey(key);
	return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}
function daysBetween(a, b) {
	return Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 864e5);
}
function weekKeys(around) {
	const start = startOfWeek(around);
	return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
function monthGrid(monthKey) {
	const start = startOfMonth(monthKey);
	const firstDow = dayOfWeek(start);
	const days = daysInMonth(monthKey);
	const cells = [];
	for (let i = 0; i < firstDow; i++) cells.push({
		key: addDays(start, i - firstDow),
		other: true
	});
	for (let i = 0; i < days; i++) cells.push({
		key: addDays(start, i),
		other: false
	});
	while (cells.length % 7 !== 0) {
		const last = cells[cells.length - 1]?.key ?? start;
		cells.push({
			key: addDays(last, 1),
			other: true
		});
	}
	return cells;
}
function greeting(d = /* @__PURE__ */ new Date()) {
	const h = d.getHours();
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function formatLong(key) {
	return fromKey(key).toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function formatMinutes(m) {
	if (m == null || Number.isNaN(m)) return "—";
	const h = Math.floor(m / 60);
	const mins = Math.round(m % 60);
	if (h <= 0) return `${mins}m`;
	if (mins === 0) return `${h}h`;
	return `${h}h ${mins}m`;
}
function defaultSettings() {
	return {
		onboardingDone: false,
		lastOpen: null,
		screenTimeGoalMin: 180,
		autoTrack: true,
		remindersEnabled: true,
		reminderHour: 8,
		reminderMinute: 0,
		eveningHour: 20,
		lastReminderKey: null,
		lastSyncAt: null,
		snoozedUntil: {},
		notificationsGranted: false
	};
}
function emptyData() {
	return {
		habits: [],
		completions: [],
		goals: [],
		reflections: [],
		screenTime: [],
		focusSessions: [],
		archives: [],
		settings: defaultSettings()
	};
}
function isScheduledOn(habit, dateKey) {
	const freq = habit.frequency ?? { type: "daily" };
	const dow = dayOfWeek(dateKey);
	switch (freq.type) {
		case "daily": return true;
		case "weekdays": return dow >= 1 && dow <= 5;
		case "custom": return Array.isArray(freq.days) && freq.days.includes(dow);
		case "weekly": return dow === (freq.preferredDay ?? 0);
		case "xtimes": return true;
		default: return true;
	}
}
function scheduledHabits(habits, dateKey) {
	return habits.filter((h) => !h.archivedAt && isScheduledOn(h, dateKey));
}
function isCompleted(completions, habitId, date) {
	return completions.some((c) => c.habitId === habitId && c.date === date && c.status === "done");
}
function dayCompletionPct(habits, completions, dateKey) {
	const scheduled = scheduledHabits(habits, dateKey);
	if (scheduled.length === 0) return null;
	const done = scheduled.filter((h) => isCompleted(completions, h.id, dateKey)).length;
	return Math.round(done / scheduled.length * 100);
}
function currentStreak(habit, completions) {
	if (habit.frequency?.type === "xtimes") return xtimesStreak(habit, completions, false);
	const today = todayKey();
	let streak = 0;
	let cursor = today;
	if (isScheduledOn(habit, today) && !isCompleted(completions, habit.id, today)) cursor = addDays(today, -1);
	for (let i = 0; i < 365; i++) {
		if (!isScheduledOn(habit, cursor)) {
			cursor = addDays(cursor, -1);
			continue;
		}
		if (isCompleted(completions, habit.id, cursor)) {
			streak++;
			cursor = addDays(cursor, -1);
		} else break;
	}
	return streak;
}
function bestStreak(habit, completions) {
	if (habit.frequency?.type === "xtimes") return xtimesStreak(habit, completions, true);
	const dates = completions.filter((c) => c.habitId === habit.id && c.status === "done").map((c) => c.date).sort();
	if (dates.length === 0) return 0;
	const set = new Set(dates);
	let best = 0;
	let current = 0;
	let cursor = dates[0] ?? todayKey();
	const end = todayKey();
	while (cursor <= end) {
		if (isScheduledOn(habit, cursor)) {
			if (set.has(cursor)) {
				current++;
				best = Math.max(best, current);
			} else current = 0;
		}
		cursor = addDays(cursor, 1);
	}
	return best;
}
function xtimesStreak(habit, completions, best) {
	const times = habit.frequency?.times ?? 3;
	const today = todayKey();
	let streak = 0;
	let bestStreak = 0;
	let weekStart = startOfWeek(today);
	for (let w = 0; w < 52; w++) {
		const count = weekKeys(weekStart).filter((d) => d <= today).filter((d) => isCompleted(completions, habit.id, d)).length;
		if (count >= times) {
			streak++;
			bestStreak = Math.max(bestStreak, streak);
		} else if (best) streak = 0;
		else if (!(w === 0 && count < times)) return streak;
		weekStart = addDays(weekStart, -7);
	}
	return best ? bestStreak : streak;
}
function completionRate(habit, completions, daysBack = 30) {
	const today = todayKey();
	let scheduled = 0;
	let done = 0;
	for (let i = 0; i < daysBack; i++) {
		const d = addDays(today, -i);
		if (isScheduledOn(habit, d)) {
			scheduled++;
			if (isCompleted(completions, habit.id, d)) done++;
		}
	}
	if (scheduled === 0) return 0;
	return Math.round(done / scheduled * 100);
}
function overallConsistencyStreak(habits, completions) {
	const today = todayKey();
	let streak = 0;
	let cursor = today;
	const todayScheduled = scheduledHabits(habits, today);
	if (todayScheduled.length > 0 && !todayScheduled.some((h) => isCompleted(completions, h.id, today))) cursor = addDays(today, -1);
	for (let i = 0; i < 365; i++) {
		const scheduled = scheduledHabits(habits, cursor);
		if (scheduled.length === 0) {
			cursor = addDays(cursor, -1);
			continue;
		}
		if (scheduled.some((h) => isCompleted(completions, h.id, cursor))) {
			streak++;
			cursor = addDays(cursor, -1);
		} else break;
	}
	return streak;
}
function daysSinceLastActivity(completions) {
	const all = completions.filter((c) => c.status === "done").map((c) => c.date).sort();
	if (all.length === 0) return null;
	return daysBetween(all[all.length - 1], todayKey());
}
function freqLabel(habit) {
	const f = habit.frequency ?? { type: "daily" };
	switch (f.type) {
		case "daily": return "Every day";
		case "weekdays": return "Weekdays";
		case "weekly": return "Once a week";
		case "xtimes": return `${f.times ?? 3}× per week`;
		case "custom":
			if (!f.days?.length) return "Custom";
			return f.days.map((d) => DAY_NAMES[d]).join(", ");
		default: return "Custom";
	}
}
function levelFromPct(pct) {
	if (pct == null || pct === 0) return 0;
	if (pct < 30) return 1;
	if (pct < 60) return 2;
	if (pct < 80) return 3;
	return 4;
}
function colorVar(id) {
	return `var(--color-${id})`;
}
function hashStr(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
	return Math.abs(h);
}
function buildSeed() {
	const today = todayKey();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const habits = [
		{
			id: "h-rise",
			name: "Morning stretch",
			icon: "sun",
			color: "habit-4",
			why: "Start the body before the day starts me",
			minimumVersion: "Five minutes, any stretch",
			frequency: { type: "daily" },
			createdAt: addDays(today, -24) + "T07:00:00.000Z",
			updatedAt: now,
			archivedAt: null
		},
		{
			id: "h-work",
			name: "Deep work",
			icon: "brain",
			color: "habit-2",
			why: "Protect one block of real attention",
			minimumVersion: "A single 25-minute block",
			frequency: { type: "weekdays" },
			createdAt: addDays(today, -24) + "T07:00:00.000Z",
			updatedAt: now,
			archivedAt: null
		},
		{
			id: "h-water",
			name: "Drink water",
			icon: "droplet",
			color: "habit-1",
			why: "Keep the simplest promise",
			minimumVersion: "One full glass",
			frequency: { type: "daily" },
			createdAt: addDays(today, -24) + "T07:00:00.000Z",
			updatedAt: now,
			archivedAt: null
		},
		{
			id: "h-read",
			name: "Read",
			icon: "book",
			color: "habit-3",
			why: "Feed a quieter mind",
			minimumVersion: "Ten pages",
			frequency: {
				type: "xtimes",
				times: 4
			},
			createdAt: addDays(today, -24) + "T07:00:00.000Z",
			updatedAt: now,
			archivedAt: null
		}
	];
	const completions = [];
	for (let i = 1; i <= 18; i++) {
		const d = addDays(today, -i);
		if (i === 5 || i === 6) continue;
		for (const h of habits) {
			if (!isScheduledOn(h, d)) continue;
			if (hashStr(d + h.id) % 10 < 8) completions.push({
				id: `c-${h.id}-${d}`,
				habitId: h.id,
				date: d,
				status: "done",
				completedAt: `${d}T18:12:00.000Z`
			});
		}
	}
	const screenTime = [];
	const pattern = [
		168,
		214,
		142,
		288,
		196,
		231,
		175
	];
	for (let i = 1; i <= 6; i++) {
		const d = addDays(today, -i);
		const mins = pattern[i % pattern.length] ?? 180;
		const hourly = Array.from({ length: 24 }, (_, hr) => {
			if (hr < 8 || hr > 22) return 0;
			return Math.round(mins / 14 * (.6 + hashStr(d + String(hr)) % 80 / 100));
		});
		screenTime.push({
			date: d,
			totalMinutes: mins,
			autoMinutes: 0,
			osMinutes: mins,
			hourly,
			social: Math.round(mins * .35),
			entertainment: Math.round(mins * .22),
			note: "",
			loggedAt: `${d}T21:00:00.000Z`,
			source: "manual"
		});
	}
	const archives = [];
	for (let i = 1; i <= 18; i++) {
		const d = addDays(today, -i);
		const pct = dayCompletionPct(habits, completions, d);
		const scheduled = scheduledHabits(habits, d);
		archives.push({
			date: d,
			completionPct: pct ?? 0,
			doneCount: scheduled.filter((h) => isCompleted(completions, h.id, d)).length,
			scheduledCount: scheduled.length,
			screenMinutes: screenTime.find((s) => s.date === d)?.totalMinutes ?? 0
		});
	}
	return {
		habits,
		completions,
		goals: [{
			id: "g-quiet",
			title: "A quieter mind",
			description: "Show up for attention, rest, and a page a day.",
			habitIds: [
				"h-rise",
				"h-work",
				"h-read"
			],
			createdAt: addDays(today, -20) + "T12:00:00.000Z"
		}],
		reflections: [{
			date: addDays(today, -1),
			mood: 3,
			wentWell: "Kept the deep-work block before noon.",
			proud: "Did not reopen the phone after the stretch.",
			improve: "Read before screens in the evening."
		}],
		screenTime,
		focusSessions: [{
			id: "f-1",
			date: addDays(today, -1),
			minutes: 25,
			plannedMinutes: 25,
			completedAt: addDays(today, -1) + "T10:30:00.000Z"
		}],
		archives,
		settings: {
			...defaultSettings(),
			onboardingDone: true,
			lastOpen: today
		}
	};
}
var ICON_MAP = {
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
	flower: Flower2
};
function HabitGlyph({ icon, color, size = "md" }) {
	const Icon = ICON_MAP[icon] ?? Sprout;
	const dim = size === "lg" ? "size-14 rounded-lg" : size === "sm" ? "size-9 rounded-sm" : "size-10 rounded-md";
	const ic = size === "lg" ? "size-7" : size === "sm" ? "size-4" : "size-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex shrink-0 items-center justify-center", dim),
		style: {
			background: `color-mix(in oklab, ${colorVar(color)} 18%, transparent)`,
			color: colorVar(color)
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: ic,
			strokeWidth: 1.75
		})
	});
}
function ProgressRing({ pct, label }) {
	const r = 34;
	const c = 2 * Math.PI * r;
	const offset = c - pct / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-20 shrink-0",
		"aria-label": label ?? `${pct}% complete`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 80",
			className: "-rotate-90 size-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r,
				fill: "none",
				stroke: "var(--color-border)",
				strokeWidth: "6"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r,
				fill: "none",
				stroke: "var(--color-accent)",
				strokeWidth: "6",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: offset,
				className: "transition-[stroke-dashoffset] duration-500"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums",
			children: [pct, "%"]
		})]
	});
}
function GrowthPlant({ streak }) {
	const stage = streak >= 30 ? 4 : streak >= 14 ? 3 : streak >= 7 ? 2 : streak >= 1 ? 1 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 80 100",
			className: "h-24 w-20 text-accent",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "40",
					cy: "92",
					rx: "18",
					ry: "4",
					fill: "currentColor",
					opacity: "0.15"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M26 78h28l-3.5 12H29.5z",
					fill: "currentColor",
					opacity: "0.28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "24",
					y: "74",
					width: "32",
					height: "5",
					rx: "1.5",
					fill: "currentColor",
					opacity: "0.45"
				}),
				stage >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 74C40 58 40 46 40 34",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.2",
					strokeLinecap: "round"
				}),
				stage >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 58c-8-2-13-9-12-16 8 2 13 9 12 16z",
					fill: "currentColor",
					opacity: "0.9"
				}),
				stage >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 50c8-1 13-7 11-14-7 2-12 8-11 14z",
					fill: "currentColor",
					opacity: "0.75"
				}),
				stage >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 42c-7-3-10-10-8-16 7 2 10 10 8 16z",
					fill: "currentColor",
					opacity: "0.85"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "28",
					r: "3.2",
					fill: "currentColor"
				})] }),
				stage >= 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M40 36c8-3 12-9 10-16-7 2-11 9-10 16z",
						fill: "currentColor",
						opacity: "0.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "32",
						cy: "24",
						r: "2.4",
						fill: "currentColor",
						opacity: "0.85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "48",
						cy: "22",
						r: "2.4",
						fill: "currentColor",
						opacity: "0.85"
					})
				] }),
				stage === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "40",
					cy: "70",
					rx: "6",
					ry: "4",
					fill: "currentColor",
					opacity: "0.7"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				"Ready to grow",
				"Just planted",
				"Sprouting",
				"Taking root",
				"Growing strong"
			][stage]
		})]
	});
}
function WeekStrip({ habits, completions }) {
	const today = todayKey();
	const keys = weekKeys(today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-5 flex gap-1.5",
		role: "list",
		"aria-label": "This week",
		children: keys.map((k) => {
			const d = fromKey(k);
			const pct = dayCompletionPct(habits, completions, k);
			const isToday = k === today;
			const done = pct === 100;
			const partial = pct != null && pct > 0 && pct < 100;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "listitem",
				className: cn("flex min-w-0 flex-1 flex-col items-center rounded-sm bg-surface px-1 py-2.5", isToday && "ring-1 ring-accent"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.65rem] font-semibold uppercase tracking-wide text-subtle",
						children: DAY_NAMES[d.getDay()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "my-1 text-sm font-semibold tabular-nums",
						children: d.getDate()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("size-2 rounded-full bg-border", done && "bg-accent", partial && "bg-warning"),
						title: pct != null ? `${pct}%` : "—"
					})
				]
			}, k);
		})
	});
}
function ConsistencyCalendar({ monthKey, habits, completions, habit }) {
	const cells = monthGrid(monthKey);
	const today = todayKey();
	const levelClass = [
		"bg-surface text-muted",
		"bg-accent/20 text-fg",
		"bg-accent/40 text-fg",
		"bg-accent/65 text-accent-fg",
		"bg-accent text-accent-fg font-semibold"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-7 gap-1",
		role: "grid",
		"aria-label": "Monthly consistency",
		children: [DAY_NAMES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-1 text-center text-[0.7rem] font-semibold text-subtle",
			children: n.charAt(0)
		}, n)), cells.map((cell) => {
			let level = 0;
			if (!cell.other) {
				if (habit) level = isScheduledOn(habit, cell.key) && isCompleted(completions, habit.id, cell.key) ? 4 : 0;
				else level = levelFromPct(dayCompletionPct(habits, completions, cell.key));
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				title: cell.key,
				className: cn("relative flex aspect-square items-center justify-center rounded-xs text-xs font-medium", cell.other ? "opacity-30" : levelClass[level], cell.key === today && "ring-2 ring-accent ring-offset-0"),
				children: fromKey(cell.key).getDate()
			}, cell.key);
		})]
	}), !habit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex items-center justify-end gap-1 text-[0.7rem] text-subtle",
		children: [
			"Less",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-xs bg-surface" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-xs bg-accent/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-xs bg-accent/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-xs bg-accent/65" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-xs bg-accent" }),
			"More"
		]
	})] });
}
function ensureTodayScreenTime(list, date) {
	if (list.some((s) => s.date === date)) return list;
	return [...list, {
		date,
		totalMinutes: 0,
		autoMinutes: 0,
		osMinutes: null,
		hourly: Array.from({ length: 24 }, () => 0),
		social: null,
		entertainment: null,
		note: "",
		loggedAt: (/* @__PURE__ */ new Date()).toISOString(),
		source: "auto"
	}];
}
var useSproutStore = create()(persist((set, get) => ({
	...emptyData(),
	view: "today",
	hydrated: false,
	setView: (view) => set({ view }),
	setHydrated: (hydrated) => set({ hydrated }),
	addHabit: (habit) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			...habit,
			id: uid(),
			createdAt: now,
			updatedAt: now,
			archivedAt: null
		};
		set({ habits: [...get().habits, row] });
	},
	updateHabit: (id, updates) => {
		set({ habits: get().habits.map((h) => h.id === id ? {
			...h,
			...updates,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : h) });
	},
	deleteHabit: (id) => {
		set({
			habits: get().habits.filter((h) => h.id !== id),
			completions: get().completions.filter((c) => c.habitId !== id),
			goals: get().goals.map((g) => ({
				...g,
				habitIds: g.habitIds.filter((hid) => hid !== id)
			}))
		});
	},
	archiveHabit: (id, archived) => {
		set({ habits: get().habits.map((h) => h.id === id ? {
			...h,
			archivedAt: archived ? (/* @__PURE__ */ new Date()).toISOString() : null
		} : h) });
	},
	toggleCompletion: (habitId, date) => {
		const existing = get().completions.find((c) => c.habitId === habitId && c.date === date);
		if (existing) {
			set({ completions: get().completions.filter((c) => c !== existing) });
			return false;
		}
		const row = {
			id: uid(),
			habitId,
			date,
			status: "done",
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ completions: [...get().completions, row] });
		return true;
	},
	markDone: (habitId, date) => {
		if (get().completions.some((c) => c.habitId === habitId && c.date === date)) return;
		set({ completions: [...get().completions, {
			id: uid(),
			habitId,
			date,
			status: "done",
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		}] });
	},
	addGoal: (goal) => {
		set({ goals: [...get().goals, {
			...goal,
			id: uid(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}] });
	},
	updateGoal: (id, updates) => {
		set({ goals: get().goals.map((g) => g.id === id ? {
			...g,
			...updates
		} : g) });
	},
	deleteGoal: (id) => {
		set({ goals: get().goals.filter((g) => g.id !== id) });
	},
	saveReflection: (reflection) => {
		set({ reflections: [...get().reflections.filter((r) => r.date !== reflection.date), reflection] });
	},
	saveScreenTime: (entry) => {
		const date = entry.date;
		set({ screenTime: ensureTodayScreenTime(get().screenTime, date).map((s) => {
			if (s.date !== date) return s;
			const osMinutes = entry.osMinutes ?? s.osMinutes;
			const autoMinutes = s.autoMinutes;
			const total = osMinutes != null ? osMinutes : Math.round(autoMinutes);
			return {
				...s,
				...entry,
				osMinutes,
				autoMinutes,
				totalMinutes: entry.totalMinutes ?? total,
				source: osMinutes != null ? autoMinutes > 0 ? "mixed" : "manual" : "auto",
				loggedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
		}) });
	},
	addFocusSession: (session) => {
		set({ focusSessions: [...get().focusSessions, {
			...session,
			id: uid()
		}] });
	},
	addUsageMinutes: (delta) => {
		if (delta <= 0) return;
		const date = todayKey();
		const hour = (/* @__PURE__ */ new Date()).getHours();
		set({ screenTime: ensureTodayScreenTime(get().screenTime, date).map((s) => {
			if (s.date !== date) return s;
			const hourly = s.hourly.slice();
			hourly[hour] = (hourly[hour] ?? 0) + delta;
			const autoMinutes = s.autoMinutes + delta;
			const totalMinutes = s.osMinutes != null ? s.osMinutes : autoMinutes;
			return {
				...s,
				hourly,
				autoMinutes,
				totalMinutes
			};
		}) });
	},
	setScreenTimeGoal: (min) => {
		const v = Math.max(30, Math.min(1440, Number(min) || 180));
		set({ settings: {
			...get().settings,
			screenTimeGoalMin: v
		} });
	},
	updateSettings: (patch) => {
		set({ settings: {
			...get().settings,
			...patch
		} });
	},
	snoozeHabit: (habitId, ms) => {
		const until = Date.now() + ms;
		set({ settings: {
			...get().settings,
			snoozedUntil: {
				...get().settings.snoozedUntil,
				[habitId]: until
			}
		} });
	},
	rolloverIfNeeded: () => {
		const today = todayKey();
		const last = get().settings.lastOpen;
		if (!last || last === today) {
			if (last !== today) set({ settings: {
				...get().settings,
				lastOpen: today
			} });
			return;
		}
		let cursor = last;
		const archives = get().archives.slice();
		const habits = get().habits;
		const completions = get().completions;
		const screenTime = get().screenTime;
		while (cursor < today) {
			if (!archives.some((a) => a.date === cursor)) {
				const scheduled = scheduledHabits(habits, cursor);
				archives.push({
					date: cursor,
					completionPct: dayCompletionPct(habits, completions, cursor) ?? 0,
					doneCount: scheduled.filter((h) => completions.some((c) => c.habitId === h.id && c.date === cursor)).length,
					scheduledCount: scheduled.length,
					screenMinutes: screenTime.find((s) => s.date === cursor)?.totalMinutes ?? 0
				});
			}
			cursor = addDays(cursor, 1);
		}
		set({
			archives,
			settings: {
				...get().settings,
				lastOpen: today,
				snoozedUntil: {}
			}
		});
	},
	markSynced: () => {
		set({ settings: {
			...get().settings,
			lastSyncAt: (/* @__PURE__ */ new Date()).toISOString()
		} });
	},
	importData: (data) => {
		try {
			if (!data || typeof data !== "object") return false;
			const base = emptyData();
			set({
				habits: Array.isArray(data.habits) ? data.habits : base.habits,
				completions: Array.isArray(data.completions) ? data.completions : base.completions,
				goals: Array.isArray(data.goals) ? data.goals : base.goals,
				reflections: Array.isArray(data.reflections) ? data.reflections : base.reflections,
				screenTime: Array.isArray(data.screenTime) ? data.screenTime : base.screenTime,
				focusSessions: Array.isArray(data.focusSessions) ? data.focusSessions : base.focusSessions,
				archives: Array.isArray(data.archives) ? data.archives : base.archives,
				settings: {
					...defaultSettings(),
					...data.settings ?? {},
					onboardingDone: true
				}
			});
			return true;
		} catch {
			return false;
		}
	},
	clearAll: () => {
		set({
			...emptyData(),
			view: get().view,
			hydrated: true,
			settings: {
				...defaultSettings(),
				onboardingDone: true,
				lastOpen: todayKey()
			}
		});
	},
	loadSample: () => {
		set({
			...buildSeed(),
			view: get().view,
			hydrated: true
		});
	}
}), {
	name: "sprout_v1",
	skipHydration: true,
	partialize: (s) => ({
		habits: s.habits,
		completions: s.completions,
		goals: s.goals,
		reflections: s.reflections,
		screenTime: s.screenTime,
		focusSessions: s.focusSessions,
		archives: s.archives,
		settings: s.settings
	}),
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			settings: {
				...current.settings,
				...p.settings ?? {}
			},
			archives: p.archives ?? current.archives,
			screenTime: p.screenTime ?? current.screenTime,
			focusSessions: p.focusSessions ?? current.focusSessions
		};
	}
}));
var hydrateLock = null;
function hydrateSproutStore() {
	if (hydrateLock) return hydrateLock;
	hydrateLock = (async () => {
		await useSproutStore.persist.rehydrate();
		if (!useSproutStore.getState().settings.onboardingDone) {
			const seed = buildSeed();
			useSproutStore.setState({
				...seed,
				view: "today",
				hydrated: true
			});
		} else {
			useSproutStore.getState().rolloverIfNeeded();
			useSproutStore.setState({ hydrated: true });
		}
	})();
	return hydrateLock;
}
var SW_PATH = "/sprout-sw.js";
var started = false;
var lastTick = 0;
var visible = true;
var ENCOURAGE = [
	"Nice work",
	"One step at a time",
	"Keep going",
	"Small progress counts",
	"You showed up",
	"Well done",
	"That's the way"
];
function encourage() {
	return ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)] ?? "Nice work";
}
function startAutomation() {
	if (started || typeof window === "undefined") return;
	started = true;
	lastTick = Date.now();
	visible = document.visibilityState === "visible";
	registerServiceWorker();
	listenForSwMessages();
	const onVis = () => {
		flushUsage();
		visible = document.visibilityState === "visible";
		lastTick = Date.now();
		useSproutStore.getState().rolloverIfNeeded();
	};
	document.addEventListener("visibilitychange", onVis);
	window.addEventListener("focus", onVis);
	window.setInterval(() => {
		flushUsage();
		useSproutStore.getState().rolloverIfNeeded();
		maybeFireReminders();
		const st = useSproutStore.getState().settings;
		const last = st.lastSyncAt ? new Date(st.lastSyncAt).getTime() : 0;
		if (Date.now() - last > 6e4) useSproutStore.getState().markSynced();
	}, 15e3);
	useSproutStore.getState().markSynced();
	maybeFireReminders();
}
function flushUsage() {
	const now = Date.now();
	const deltaMs = now - lastTick;
	lastTick = now;
	const s = useSproutStore.getState();
	if (!s.settings.autoTrack) return;
	if (!visible || document.hidden) return;
	if (deltaMs <= 0 || deltaMs > 3e5) return;
	s.addUsageMinutes(deltaMs / 6e4);
}
async function registerServiceWorker() {
	if (!("serviceWorker" in navigator)) return;
	try {
		await navigator.serviceWorker.register(SW_PATH, { scope: "/" });
	} catch {}
}
function listenForSwMessages() {
	if (!("serviceWorker" in navigator)) return;
	navigator.serviceWorker.addEventListener("message", (event) => {
		const data = event.data;
		if (!data?.type) return;
		const date = data.date ?? todayKey();
		if (data.type === "SPROUT_HABIT_DONE" && data.habitId) {
			useSproutStore.getState().markDone(data.habitId, date);
			toast.success("Marked done from the notification");
		}
		if (data.type === "SPROUT_HABIT_SNOOZE" && data.habitId) {
			useSproutStore.getState().snoozeHabit(data.habitId, 9e5);
			toast("Snoozed for 15 minutes");
		}
	});
}
async function requestNotificationPermission() {
	if (typeof Notification === "undefined") return false;
	const granted = await Notification.requestPermission() === "granted";
	useSproutStore.getState().updateSettings({ notificationsGranted: granted });
	return granted;
}
function reminderKey(hour) {
	return `${todayKey()}-${String(hour).padStart(2, "0")}`;
}
function maybeFireReminders() {
	const s = useSproutStore.getState();
	if (!s.settings.remindersEnabled) return;
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (![s.settings.reminderHour, s.settings.eveningHour].includes(hour)) return;
	const key = reminderKey(hour);
	if (s.settings.lastReminderKey === key) return;
	const today = todayKey();
	const pending = scheduledHabits(s.habits, today).filter((h) => {
		if (isCompleted(s.completions, h.id, today)) return false;
		return (s.settings.snoozedUntil[h.id] ?? 0) < Date.now();
	});
	if (pending.length === 0) return;
	s.updateSettings({ lastReminderKey: key });
	const first = pending[0];
	showHabitReminder(first, pending.length);
}
function showHabitReminder(habit, remaining = 1) {
	const today = todayKey();
	const title = remaining > 1 ? `${habit.name} · ${remaining} waiting` : habit.name;
	const body = habit.minimumVersion ? `Minimum: ${habit.minimumVersion}` : "Mark it done, or snooze 15 minutes.";
	toast(title, {
		description: body,
		duration: 12e3,
		action: {
			label: "Done",
			onClick: () => {
				useSproutStore.getState().markDone(habit.id, today);
				toast.success("Checked off");
			}
		},
		cancel: {
			label: "Snooze",
			onClick: () => {
				useSproutStore.getState().snoozeHabit(habit.id, 9e5);
				toast("Snoozed 15 minutes");
			}
		}
	});
	showSystemNotification(habit, title, body, today);
}
async function showSystemNotification(habit, title, body, date) {
	if (typeof Notification === "undefined") return;
	if (Notification.permission !== "granted") return;
	const payload = {
		body,
		tag: `sprout-${habit.id}-${date}`,
		data: {
			habitId: habit.id,
			date,
			title: habit.name
		},
		actions: [{
			action: "done",
			title: "Done"
		}, {
			action: "snooze",
			title: "Snooze"
		}]
	};
	try {
		const reg = await navigator.serviceWorker?.ready;
		if (reg?.showNotification) {
			await reg.showNotification(title, payload);
			return;
		}
	} catch {}
	try {
		new Notification(title, {
			body,
			tag: payload.tag
		});
	} catch {}
}
function fireTestReminder() {
	const s = useSproutStore.getState();
	const today = todayKey();
	const pending = scheduledHabits(s.habits, today).filter((h) => !isCompleted(s.completions, h.id, today));
	const habit = pending[0] ?? s.habits.find((h) => !h.archivedAt);
	if (!habit) {
		toast("Add a habit first");
		return;
	}
	showHabitReminder(habit, Math.max(1, pending.length));
}
function TodayView({ openSheet }) {
	const habits = useSproutStore((s) => s.habits);
	const completions = useSproutStore((s) => s.completions);
	const toggleCompletion = useSproutStore((s) => s.toggleCompletion);
	const today = todayKey();
	const scheduled = scheduledHabits(habits, today);
	const completed = scheduled.filter((h) => isCompleted(completions, h.id, today));
	const pct = scheduled.length ? Math.round(completed.length / scheduled.length * 100) : 0;
	const streak = overallConsistencyStreak(habits, completions);
	const daysAway = daysSinceLastActivity(completions);
	const active = habits.filter((h) => !h.archivedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 flex min-h-14 items-center justify-between border-b border-transparent bg-bg/92 px-5 py-3 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Sprout"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Daily reflection",
			onClick: () => openSheet({ type: "reflect" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-4",
		children: [
			daysAway != null && daysAway >= 3 && scheduled.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 rounded-md border border-accent/25 bg-accent-soft px-5 py-5 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "You're back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "You don't need to catch up. Start with one small step."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-xs font-medium uppercase tracking-wider text-subtle",
						children: formatLong(today)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold tracking-tight",
						children: greeting()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: scheduled.length === 0 ? "Ready to plant your first habit?" : pct === 100 ? "All done for today. Well done." : "Small progress counts."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekStrip, {
				habits,
				completions
			}),
			scheduled.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center gap-5 rounded-md border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, { pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Completed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold tabular-nums",
							children: [
								completed.length,
								" / ",
								scheduled.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Consistency"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent tabular-nums",
							children: [
								streak,
								" day",
								streak === 1 ? "" : "s"
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Today's habits"
			}),
			scheduled.length === 0 ? active.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: "No habits yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-xs text-sm text-muted",
						children: "Start small. One habit is enough to begin."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: () => openSheet({ type: "habit" }),
						children: "Add your first habit"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "Nothing scheduled today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Enjoy the free day, or add a habit for today."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2.5",
				children: scheduled.map((h) => {
					const done = isCompleted(completions, h.id, today);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (toggleCompletion(h.id, today)) toast(encourage());
						},
						className: cn("flex min-h-16 items-center gap-3.5 rounded-md border border-border bg-surface px-4 py-3.5 text-left transition-colors duration-150 hover:bg-surface-hover active:scale-[0.99]", done && "border-accent/30 bg-accent/5"),
						"aria-label": `${h.name}, ${done ? "completed" : "not completed"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-border", done && "border-accent bg-accent text-accent-fg"),
								"aria-hidden": true,
								children: done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitGlyph, {
								icon: h.icon,
								color: h.color
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("truncate font-semibold", done && "text-muted"),
									children: h.name
								}), h.minimumVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-subtle",
									children: h.minimumVersion
								})]
							})
						]
					}, h.id);
				})
			})
		]
	})] });
}
function ProgressView({ openSheet }) {
	const habits = useSproutStore((s) => s.habits.filter((h) => !h.archivedAt));
	const allHabits = useSproutStore((s) => s.habits);
	const completions = useSproutStore((s) => s.completions);
	const today = todayKey();
	const [monthKey, setMonthKey] = (0, import_react.useState)(startOfMonth(today));
	const streak = overallConsistencyStreak(allHabits, completions);
	const total = completions.filter((c) => c.status === "done").length;
	let daysWithActivity = 0;
	let daysWithHabits = 0;
	for (let i = 0; i < 30; i++) {
		const d = addDays(today, -i);
		const scheduled = scheduledHabits(allHabits, d);
		if (scheduled.length > 0) {
			daysWithHabits++;
			if (scheduled.some((h) => completions.some((c) => c.habitId === h.id && c.date === d))) daysWithActivity++;
		}
	}
	const monthPct = daysWithHabits ? Math.round(daysWithActivity / daysWithHabits * 100) : 0;
	const monthDate = fromKey(monthKey);
	const shiftMonth = (dir) => {
		const d = fromKey(monthKey);
		d.setMonth(d.getMonth() + dir);
		setMonthKey(startOfMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 flex min-h-14 items-center bg-bg/92 px-5 py-3 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Progress"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthPlant, { streak }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						num: streak,
						lbl: "Day streak"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						num: `${monthPct}%`,
						lbl: "Last 30 days"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						num: total,
						lbl: "Total check-ins"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						num: habits.length,
						lbl: "Active habits"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Consistency map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[1.05rem] font-semibold",
					children: [
						MONTH_NAMES[monthDate.getMonth()],
						" ",
						monthDate.getFullYear()
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Previous month",
						onClick: () => shiftMonth(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Next month",
						onClick: () => shiftMonth(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsistencyCalendar, {
				monthKey,
				habits: allHabits,
				completions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Habits"
			}),
			habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted",
				children: "No habits to show yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2.5",
				children: habits.map((h) => {
					const rate = completionRate(h, completions, 30);
					const cs = currentStreak(h, completions);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openSheet({
							type: "habit-detail",
							id: h.id
						}),
						className: "flex min-h-16 items-center gap-3.5 rounded-md border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitGlyph, {
								icon: h.icon,
								color: h.color
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-semibold",
									children: h.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-subtle tabular-nums",
									children: [
										rate,
										"% · ",
										cs,
										" day streak"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })
						]
					}, h.id);
				})
			})
		]
	})] });
}
function Stat$1({ num, lbl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-semibold tracking-tight tabular-nums",
			children: num
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xs text-subtle",
			children: lbl
		})]
	});
}
function GoalsView({ openSheet }) {
	const goals = useSproutStore((s) => s.goals);
	const habits = useSproutStore((s) => s.habits);
	const completions = useSproutStore((s) => s.completions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 flex min-h-14 items-center justify-between bg-bg/92 px-5 py-3 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Goals"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5 pb-8 pt-2",
		children: goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "No goals yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-xs text-sm text-muted",
					children: "Connect habits to a larger purpose. Goals make daily actions meaningful."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					onClick: () => openSheet({ type: "goal" }),
					children: "Create a goal"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-3",
			children: goals.map((g) => {
				const linked = (g.habitIds ?? []).map((id) => habits.find((h) => h.id === id)).filter(Boolean);
				const avg = linked.length ? Math.round(linked.reduce((sum, h) => sum + completionRate(h, completions, 30), 0) / linked.length) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openSheet({
						type: "goal-detail",
						id: g.id
					}),
					className: "rounded-md border border-border bg-surface p-4 text-left hover:bg-surface-hover",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: g.title
						}),
						g.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 mb-3 text-sm text-muted",
							children: g.description
						}),
						!g.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 h-1.5 overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent transition-[width] duration-300",
								style: { width: `${avg}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle tabular-nums",
							children: [
								linked.length,
								" habit",
								linked.length === 1 ? "" : "s",
								" · ",
								avg,
								"% avg"
							]
						})
					]
				}, g.id);
			})
		})
	})] });
}
function FocusView({ openSheet }) {
	const today = todayKey();
	const goal = useSproutStore((s) => s.settings.screenTimeGoalMin || 180);
	const todayST = useSproutStore((s) => s.screenTime.find((x) => x.date === today));
	const screenTime = useSproutStore((s) => s.screenTime);
	const focusSessions = useSproutStore((s) => s.focusSessions);
	const lastSync = useSproutStore((s) => s.settings.lastSyncAt);
	const habits = useSproutStore((s) => s.habits.filter((h) => !h.archivedAt));
	const completions = useSproutStore((s) => s.completions);
	const autoTrack = useSproutStore((s) => s.settings.autoTrack);
	const todayFocus = focusSessions.filter((s) => s.date === today).reduce((sum, s) => sum + (s.minutes || 0), 0);
	const weekData = weekKeys(today).map((k) => {
		const st = screenTime.find((x) => x.date === k);
		return {
			key: k,
			minutes: st ? st.totalMinutes : null
		};
	});
	const maxBar = Math.max(goal, ...weekData.map((w) => w.minutes || 0), 60);
	const logged = weekData.filter((w) => w.minutes != null && w.minutes > 0);
	const avg = logged.length ? Math.round(logged.reduce((s, w) => s + (w.minutes ?? 0), 0) / logged.length) : null;
	const displayMin = todayST ? todayST.osMinutes != null ? todayST.osMinutes : todayST.totalMinutes : 0;
	const hasLog = todayST != null && (todayST.osMinutes != null || todayST.totalMinutes > .4);
	const pctOfGoal = hasLog ? Math.round(displayMin / goal * 100) : 0;
	const fillClass = pctOfGoal > 100 ? "bg-danger" : pctOfGoal > 85 ? "bg-warning" : "bg-accent";
	const insights = [];
	if (habits.length > 0) {
		const ranked = habits.map((h) => ({
			h,
			rate: completionRate(h, completions, 30)
		})).sort((a, b) => b.rate - a.rate);
		if (ranked[0] && ranked[0].rate > 0) insights.push({
			title: ranked[0].h.name,
			text: `Your strongest habit — ${ranked[0].rate}% over the last 30 days.`
		});
		if (ranked.length > 1 && ranked[ranked.length - 1].rate < ranked[0].rate) {
			const weak = ranked[ranked.length - 1];
			insights.push({
				title: weak.h.name,
				text: `Needs a gentler minimum — ${weak.rate}% lately.`
			});
		}
		const overall = overallConsistencyStreak(habits, completions);
		if (overall >= 7) insights.push({
			title: `${overall}-day consistency`,
			text: "Keep the chain. Quiet days still count."
		});
	}
	const syncLabel = lastSync ? `Synced ${Math.max(0, Math.round((Date.now() - new Date(lastSync).getTime()) / 6e4))}m ago` : "Waiting for first sync";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 flex min-h-14 items-center justify-between bg-bg/92 px-5 py-3 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Focus"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Log screen time",
			onClick: () => openSheet({ type: "screentime" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-5" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-md border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold",
							children: "Screen time today"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 text-xs text-subtle",
							children: [autoTrack ? "Auto-tracking while this app is open · " : "", syncLabel]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => openSheet({ type: "screentime" }),
							children: "Log"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-3xl font-semibold tracking-tight tabular-nums",
						children: [hasLog ? formatMinutes(displayMin) : "—", !hasLog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-base font-medium text-muted",
							children: "not logged"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-3 h-2.5 overflow-hidden rounded-full bg-border",
						role: "progressbar",
						"aria-valuenow": Math.min(pctOfGoal, 100),
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full rounded-full transition-[width] duration-300", fillClass),
							style: { width: `${Math.min(pctOfGoal, 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Goal: ",
							formatMinutes(goal),
							" / day"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: hasLog ? pctOfGoal <= 100 ? `${pctOfGoal}% of goal` : `${pctOfGoal - 100}% over` : "—"
						})]
					}),
					todayST && todayST.osMinutes == null && todayST.autoMinutes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-subtle",
						children: [
							"App-open time ",
							formatMinutes(todayST.autoMinutes),
							". Log phone Screen Time for the full picture."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-surface p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-semibold tabular-nums",
						children: formatMinutes(todayFocus)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-subtle",
						children: "Focus today"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-surface p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-semibold tabular-nums",
						children: avg != null ? formatMinutes(avg) : "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-subtle",
						children: "Week average"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-md border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: "This week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: "Screen time by day"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex h-24 items-end gap-1.5",
						role: "img",
						"aria-label": "Weekly screen time",
						children: weekData.map((w) => {
							const d = fromKey(w.key);
							const has = w.minutes != null && w.minutes > 0;
							const h = has ? Math.max(4, Math.round((w.minutes ?? 0) / maxBar * 88)) : 4;
							const over = has && (w.minutes ?? 0) > goal;
							const warn = has && !over && (w.minutes ?? 0) > goal * .85;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-1 flex-col items-center justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("w-full max-w-7 rounded-t-xs", !has && "bg-border", has && over && "bg-danger", has && warn && "bg-warning", has && !over && !warn && "bg-accent"),
									style: { height: `${h}px` },
									title: has ? formatMinutes(w.minutes) : "No data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("text-[0.65rem] font-semibold text-subtle", w.key === today && "text-accent"),
									children: DAY_NAMES[d.getDay()].charAt(0)
								})]
							}, w.key);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => openSheet({ type: "focus-timer" }),
					children: "Start focus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => openSheet({ type: "st-goal" }),
					children: "Goal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-5 text-xs leading-relaxed text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-muted",
						children: "Android:"
					}),
					" Settings → Digital Wellbeing → Screen time",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-muted",
						children: "iPhone:"
					}),
					" Settings → Screen Time → See All Activity",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Copy the minutes, then tap Log. Browsers cannot read OS Screen Time directly."
				]
			}),
			insights.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Habit insights"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2.5",
				children: insights.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-accent",
						children: i.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted",
						children: i.text
					})]
				}, i.title))
			})] })
		]
	})] });
}
function csvEscape(val) {
	const s = String(val ?? "");
	if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, "\"\"")}"`;
	return s;
}
function exportJSON() {
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
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		app: "Sprout Tracker",
		version: 1
	};
	return JSON.stringify(payload, null, 2);
}
function exportHabitsCSV() {
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
		"archivedAt"
	];
	const rows = habits.map((h) => [
		h.id,
		csvEscape(h.name),
		h.icon,
		h.color,
		csvEscape(h.why),
		csvEscape(h.minimumVersion),
		csvEscape(JSON.stringify(h.frequency)),
		h.createdAt,
		h.archivedAt ?? ""
	].join(","));
	return [headers.join(","), ...rows].join("\n");
}
function exportCompletionsCSV() {
	const { completions, habits } = useSproutStore.getState();
	const names = new Map(habits.map((h) => [h.id, h.name]));
	const headers = [
		"date",
		"habitId",
		"habitName",
		"status",
		"completedAt"
	];
	const rows = completions.slice().sort((a, b) => a.date.localeCompare(b.date)).map((c) => [
		c.date,
		c.habitId,
		csvEscape(names.get(c.habitId) ?? ""),
		c.status,
		c.completedAt
	].join(","));
	return [headers.join(","), ...rows].join("\n");
}
function exportReflectionsCSV() {
	const refs = useSproutStore.getState().reflections;
	const headers = [
		"date",
		"mood",
		"wentWell",
		"proud",
		"improve"
	];
	const rows = refs.slice().sort((a, b) => a.date.localeCompare(b.date)).map((r) => [
		r.date,
		r.mood ?? "",
		csvEscape(r.wentWell),
		csvEscape(r.proud),
		csvEscape(r.improve)
	].join(","));
	return [headers.join(","), ...rows].join("\n");
}
function download(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function stamp(kind, ext) {
	return `sprout-${kind}-${todayKey()}.${ext}`;
}
function parseImport(raw) {
	try {
		const data = JSON.parse(raw);
		if (!data || typeof data !== "object") return null;
		const source = Array.isArray(data.habits) ? data : data.data;
		if (!source || typeof source !== "object") return null;
		return source;
	} catch {
		return null;
	}
}
function SettingsView({ openSheet }) {
	const habits = useSproutStore((s) => s.habits.length);
	const completions = useSproutStore((s) => s.completions.length);
	const reflections = useSproutStore((s) => s.reflections.length);
	const settings = useSproutStore((s) => s.settings);
	const updateSettings = useSproutStore((s) => s.updateSettings);
	const importData = useSproutStore((s) => s.importData);
	const clearAll = useSproutStore((s) => s.clearAll);
	const loadSample = useSproutStore((s) => s.loadSample);
	const fileRef = (0, import_react.useRef)(null);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 flex min-h-14 items-center bg-bg/92 px-5 py-3 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Settings"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Your data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					habits,
					" habit",
					habits === 1 ? "" : "s",
					" · ",
					completions,
					" check-in",
					completions === 1 ? "" : "s",
					" ·",
					" ",
					reflections,
					" reflection",
					reflections === 1 ? "" : "s"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Export data",
						onClick: () => openSheet({ type: "export" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Import backup",
						onClick: () => fileRef.current?.click()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Load sample data",
						onClick: () => {
							loadSample();
							toast("Sample data loaded");
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: confirmClear ? "Tap again to confirm clear" : "Clear all data",
						danger: true,
						onClick: () => {
							if (!confirmClear) {
								setConfirmClear(true);
								return;
							}
							clearAll();
							setConfirmClear(false);
							toast("All data cleared");
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "application/json,.json",
				className: "hidden",
				onChange: (e) => {
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
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Automation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Track time in this app",
						hint: "Adds minutes while Sprout is open. Syncs in the background.",
						on: settings.autoTrack,
						onChange: (v) => updateSettings({ autoTrack: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Daily reminders",
						hint: `Morning ${pad(settings.reminderHour)}:00 · Evening ${pad(settings.eveningHour)}:00`,
						on: settings.remindersEnabled,
						onChange: (v) => updateSettings({ remindersEnabled: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: settings.notificationsGranted ? "System notifications on" : "Enable system notifications",
						onClick: async () => {
							const ok = await requestNotificationPermission();
							toast(ok ? "Notifications enabled" : "Permission declined — in-app reminders still work");
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Send a test reminder",
						onClick: () => fireTestReminder()
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "About"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center text-sm leading-relaxed text-subtle",
				children: [
					"Sprout stores everything locally on this device.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"No accounts. No tracking. Progress over perfection."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-xs text-subtle",
				children: "v1.0 · Offline-first"
			})
		]
	})] });
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function Row({ label, onClick, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-12 items-center justify-between rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover", danger && "text-danger"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
	});
}
function Toggle({ label, hint, on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: "flex min-h-12 items-center justify-between gap-4 rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-subtle",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-accent" : "bg-border"),
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-5 rounded-full bg-fg transition-transform", on ? "translate-x-5" : "translate-x-0.5") })
		})]
	});
}
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-12 w-full rounded-sm border border-border bg-bg px-3.5 text-base text-fg outline-none transition-colors duration-150 placeholder:text-subtle focus:border-accent", className),
	...props
}));
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-20 w-full rounded-sm border border-border bg-bg px-3.5 py-3 text-base text-fg outline-none transition-colors duration-150 placeholder:text-subtle focus:border-accent resize-y", className),
	...props
}));
Textarea.displayName = "Textarea";
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor,
			className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted",
			children: label
		}), children]
	});
}
function Sheet({ open, onOpenChange, title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-black/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: cn("fixed bottom-0 left-1/2 z-50 flex max-h-[92dvh] w-full max-w-[480px] -translate-x-1/2 flex-col rounded-t-lg bg-bg-elevated outline-none", className),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-9 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
					className: "px-5 pb-2 pt-4 font-display text-xl font-semibold tracking-tight text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
					className: "sr-only",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-y-auto px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
					children
				})
			]
		})] })
	});
}
function SproutSheets({ sheet, setSheet }) {
	const close = () => setSheet(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		sheet?.type === "habit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitForm, {
			existing: sheet.habit,
			onClose: close
		}),
		sheet?.type === "habit-detail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitDetail, {
			id: sheet.id,
			onClose: close,
			onEdit: (h) => setSheet({
				type: "habit",
				habit: h
			})
		}),
		sheet?.type === "goal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalForm, {
			existing: sheet.goal,
			onClose: close
		}),
		sheet?.type === "goal-detail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalDetail, {
			id: sheet.id,
			onClose: close,
			onEdit: (g) => setSheet({
				type: "goal",
				goal: g
			})
		}),
		sheet?.type === "reflect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflectForm, { onClose: close }),
		sheet?.type === "screentime" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenTimeForm, { onClose: close }),
		sheet?.type === "st-goal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenTimeGoalForm, { onClose: close }),
		sheet?.type === "focus-timer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTimer, { onClose: close }),
		sheet?.type === "export" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportSheet, { onClose: close })
	] });
}
function HabitForm({ existing, onClose }) {
	const addHabit = useSproutStore((s) => s.addHabit);
	const updateHabit = useSproutStore((s) => s.updateHabit);
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [why, setWhy] = (0, import_react.useState)(existing?.why ?? "");
	const [min, setMin] = (0, import_react.useState)(existing?.minimumVersion ?? "");
	const [icon, setIcon] = (0, import_react.useState)(existing?.icon ?? "sprout");
	const [color, setColor] = (0, import_react.useState)(existing?.color ?? "habit-1");
	const [freq, setFreq] = (0, import_react.useState)(existing?.frequency?.type ?? "daily");
	const [days, setDays] = (0, import_react.useState)(existing?.frequency?.days ?? []);
	const [times, setTimes] = (0, import_react.useState)(existing?.frequency?.times ?? 3);
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
		const frequency = freq === "custom" ? {
			type: freq,
			days: [...days].sort((a, b) => a - b)
		} : freq === "xtimes" ? {
			type: freq,
			times: Math.min(7, Math.max(1, times))
		} : freq === "weekly" ? {
			type: freq,
			preferredDay: 0
		} : { type: freq };
		const payload = {
			name: trimmed,
			icon,
			color,
			why: why.trim(),
			minimumVersion: min.trim(),
			frequency
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: existing ? "Edit habit" : "New habit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				htmlFor: "h-name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "h-name",
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "e.g. Morning stretch",
					maxLength: 60,
					autoComplete: "off"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Why? (optional)",
				htmlFor: "h-why",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "h-why",
					value: why,
					onChange: (e) => setWhy(e.target.value),
					placeholder: "What this protects",
					maxLength: 120
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Minimum version (optional)",
				htmlFor: "h-min",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "h-min",
					value: min,
					onChange: (e) => setMin(e.target.value),
					placeholder: "Five minutes is enough",
					maxLength: 80
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: HABIT_ICON_IDS.map((id) => {
						const Icon = ICON_MAP[id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIcon(id),
							className: cn("flex size-9 items-center justify-center rounded-sm bg-surface text-fg", icon === id && "ring-2 ring-fg scale-105"),
							"aria-label": id,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}, id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Color",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: HABIT_COLOR_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setColor(id),
						className: cn("size-9 rounded-sm", color === id && "ring-2 ring-fg scale-105"),
						style: { background: colorVar(id) },
						"aria-label": id
					}, id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Frequency",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: FREQ_OPTIONS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFreq(f.id),
						className: cn("rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium", freq === f.id && "border-accent bg-accent-soft text-accent"),
						children: f.label
					}, f.id))
				})
			}),
			freq === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Days",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: DAY_NAMES.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDays((d) => d.includes(i) ? d.filter((x) => x !== i) : [...d, i]),
						className: cn("flex size-10 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold", days.includes(i) && "border-accent bg-accent text-accent-fg"),
						children: n.charAt(0)
					}, n))
				})
			}),
			freq === "xtimes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Times per week",
				htmlFor: "h-times",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "h-times",
					type: "number",
					min: 1,
					max: 7,
					value: times,
					onChange: (e) => setTimes(Number(e.target.value))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: save,
					children: existing ? "Save" : "Create"
				})]
			})
		]
	});
}
function HabitDetail({ id, onClose, onEdit }) {
	const habit = useSproutStore((s) => s.habits.find((h) => h.id === id));
	const completions = useSproutStore((s) => s.completions);
	const archiveHabit = useSproutStore((s) => s.archiveHabit);
	const deleteHabit = useSproutStore((s) => s.deleteHabit);
	const [confirmDel, setConfirmDel] = (0, import_react.useState)(false);
	if (!habit) return null;
	const rate = completionRate(habit, completions, 30);
	const current = currentStreak(habit, completions);
	const best = bestStreak(habit, completions);
	const total = completions.filter((c) => c.habitId === id && c.status === "done").length;
	const monthKey = startOfMonth(todayKey());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: habit.name,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitGlyph, {
					icon: habit.icon,
					color: habit.color,
					size: "lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: habit.why || freqLabel(habit)
				}), habit.minimumVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-subtle",
					children: ["Min: ", habit.minimumVersion]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						num: current,
						lbl: "Current streak"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						num: best,
						lbl: "Best streak"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						num: `${rate}%`,
						lbl: "30-day rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						num: total,
						lbl: "Total"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "This month"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsistencyCalendar, {
				monthKey,
				habits: [habit],
				completions,
				habit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => onEdit(habit),
						children: "Edit habit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							archiveHabit(id, !habit.archivedAt);
							toast(habit.archivedAt ? "Habit restored" : "Habit archived");
							onClose();
						},
						children: habit.archivedAt ? "Unarchive" : "Archive"
					}),
					confirmDel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => {
							deleteHabit(id);
							toast("Habit deleted");
							onClose();
						},
						children: "Confirm delete"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => setConfirmDel(true),
						children: "Delete habit"
					})
				]
			})
		]
	});
}
function Stat({ num, lbl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-semibold tracking-tight tabular-nums",
			children: num
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xs text-subtle",
			children: lbl
		})]
	});
}
function GoalForm({ existing, onClose }) {
	const habits = useSproutStore((s) => s.habits.filter((h) => !h.archivedAt));
	const addGoal = useSproutStore((s) => s.addGoal);
	const updateGoal = useSproutStore((s) => s.updateGoal);
	const [title, setTitle] = (0, import_react.useState)(existing?.title ?? "");
	const [desc, setDesc] = (0, import_react.useState)(existing?.description ?? "");
	const [ids, setIds] = (0, import_react.useState)(existing?.habitIds ?? []);
	const save = () => {
		const t = title.trim();
		if (!t) {
			toast("Please enter a title");
			return;
		}
		if (existing) {
			updateGoal(existing.id, {
				title: t,
				description: desc.trim(),
				habitIds: ids
			});
			toast("Goal updated");
		} else {
			addGoal({
				title: t,
				description: desc.trim(),
				habitIds: ids
			});
			toast("Goal created");
		}
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: existing ? "Edit goal" : "New goal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				htmlFor: "g-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "g-title",
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "A quieter mind",
					maxLength: 80
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description (optional)",
				htmlFor: "g-desc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "g-desc",
					value: desc,
					onChange: (e) => setDesc(e.target.value),
					placeholder: "What does success look like?",
					maxLength: 200
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Link habits",
				children: habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: "Create habits first, then link them here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: habits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-3 rounded-sm bg-surface px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: ids.includes(h.id),
								onChange: () => setIds((cur) => cur.includes(h.id) ? cur.filter((x) => x !== h.id) : [...cur, h.id]),
								className: "size-4 accent-accent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitGlyph, {
								icon: h.icon,
								color: h.color,
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: h.name
							})
						]
					}, h.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: save,
					children: existing ? "Save" : "Create"
				})]
			})
		]
	});
}
function GoalDetail({ id, onClose, onEdit }) {
	const goal = useSproutStore((s) => s.goals.find((g) => g.id === id));
	const habits = useSproutStore((s) => s.habits);
	const completions = useSproutStore((s) => s.completions);
	const deleteGoal = useSproutStore((s) => s.deleteGoal);
	const [confirmDel, setConfirmDel] = (0, import_react.useState)(false);
	if (!goal) return null;
	const linked = (goal.habitIds ?? []).map((hid) => habits.find((h) => h.id === hid)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: goal.title,
		children: [
			goal.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: goal.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Linked habits"
			}),
			linked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: "No habits linked yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: linked.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitGlyph, {
						icon: h.icon,
						color: h.color
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: h.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-subtle",
							children: [completionRate(h, completions, 30), "% last 30 days"]
						})]
					})]
				}, h.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => onEdit(goal),
					children: "Edit goal"
				}), confirmDel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => {
						deleteGoal(id);
						toast("Goal deleted");
						onClose();
					},
					children: "Confirm delete"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => setConfirmDel(true),
					children: "Delete goal"
				})]
			})
		]
	});
}
function ReflectForm({ onClose }) {
	const today = todayKey();
	const existing = useSproutStore((s) => s.reflections.find((r) => r.date === today));
	const saveReflection = useSproutStore((s) => s.saveReflection);
	const [mood, setMood] = (0, import_react.useState)(existing?.mood ?? null);
	const [wentWell, setWentWell] = (0, import_react.useState)(existing?.wentWell ?? "");
	const [proud, setProud] = (0, import_react.useState)(existing?.proud ?? "");
	const [improve, setImprove] = (0, import_react.useState)(existing?.improve ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: "How was today?",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex justify-between gap-2",
				role: "group",
				"aria-label": "Mood",
				children: MOODS.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMood(i),
					className: cn("flex aspect-square max-w-14 flex-1 flex-col items-center justify-center rounded-md border-2 border-transparent bg-surface text-[0.65rem] font-medium text-muted", mood === i && "border-accent bg-accent-soft text-accent scale-105"),
					"aria-label": m.label,
					title: m.hint,
					children: m.label
				}, m.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "What went well?",
				htmlFor: "r-well",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "r-well",
					value: wentWell,
					onChange: (e) => setWentWell(e.target.value),
					placeholder: "Optional"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "What am I proud of?",
				htmlFor: "r-proud",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "r-proud",
					value: proud,
					onChange: (e) => setProud(e.target.value),
					placeholder: "Optional"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "What do I want to improve tomorrow?",
				htmlFor: "r-improve",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "r-improve",
					value: improve,
					onChange: (e) => setImprove(e.target.value),
					placeholder: "Optional"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => {
						saveReflection({
							date: today,
							mood,
							wentWell: wentWell.trim(),
							proud: proud.trim(),
							improve: improve.trim()
						});
						toast("Reflection saved");
						onClose();
					},
					children: "Save"
				})]
			})
		]
	});
}
function ScreenTimeForm({ onClose }) {
	const today = todayKey();
	const existing = useSproutStore((s) => s.screenTime.find((x) => x.date === today));
	const saveScreenTime = useSproutStore((s) => s.saveScreenTime);
	const [total, setTotal] = (0, import_react.useState)(existing?.osMinutes != null ? String(existing.osMinutes) : existing?.totalMinutes ? String(Math.round(existing.totalMinutes)) : "");
	const [social, setSocial] = (0, import_react.useState)(existing?.social != null ? String(existing.social) : "");
	const [ent, setEnt] = (0, import_react.useState)(existing?.entertainment != null ? String(existing.entertainment) : "");
	const [note, setNote] = (0, import_react.useState)(existing?.note ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: "Log screen time",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Open Settings → Screen Time / Digital Wellbeing on your phone, then enter the daily total here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Total (minutes)",
				htmlFor: "st-total",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "st-total",
					type: "number",
					min: 0,
					max: 1440,
					placeholder: "e.g. 245",
					value: total,
					onChange: (e) => setTotal(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-subtle",
					children: "Example: 2h 30m = 150 minutes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Social (optional)",
					htmlFor: "st-social",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "st-social",
						type: "number",
						min: 0,
						placeholder: "min",
						value: social,
						onChange: (e) => setSocial(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Entertainment",
					htmlFor: "st-ent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "st-ent",
						type: "number",
						min: 0,
						placeholder: "min",
						value: ent,
						onChange: (e) => setEnt(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Note (optional)",
				htmlFor: "st-note",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "st-note",
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "A work-heavy day",
					maxLength: 80
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => {
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
							note: note.trim()
						});
						toast("Screen time saved");
						onClose();
					},
					children: "Save"
				})]
			})
		]
	});
}
function ScreenTimeGoalForm({ onClose }) {
	const goal = useSproutStore((s) => s.settings.screenTimeGoalMin);
	const setScreenTimeGoal = useSproutStore((s) => s.setScreenTimeGoal);
	const [val, setVal] = (0, import_react.useState)(String(goal));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: "Screen time goal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Daily upper bound for time on screens, in minutes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Minutes / day",
				htmlFor: "st-goal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "st-goal",
					type: "number",
					min: 30,
					max: 1440,
					value: val,
					onChange: (e) => setVal(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1.5 text-xs text-subtle",
					children: [
						"Now: ",
						formatMinutes(goal),
						" · Example: 3h = 180"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => {
						setScreenTimeGoal(Number(val));
						toast("Goal updated");
						onClose();
					},
					children: "Save goal"
				})]
			})
		]
	});
}
function FocusTimer({ onClose }) {
	const addFocusSession = useSproutStore((s) => s.addFocusSession);
	const [chosen, setChosen] = (0, import_react.useState)(25);
	const [remaining, setRemaining] = (0, import_react.useState)(1500);
	const [running, setRunning] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	const remainingRef = (0, import_react.useRef)(remaining);
	remainingRef.current = remaining;
	(0, import_react.useEffect)(() => {
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
		}, 1e3);
	};
	const m = Math.floor(remaining / 60);
	const sec = remaining % 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => {
			if (!o) {
				stop();
				onClose();
			}
		},
		title: "Focus session",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap justify-center gap-2",
				children: [
					15,
					25,
					45,
					60
				].map((mins) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: running,
					onClick: () => {
						setChosen(mins);
						setRemaining(mins * 60);
					},
					className: cn("rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-semibold", chosen === mins && "border-accent bg-accent-soft text-accent"),
					children: [mins, "m"]
				}, mins))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-4 text-center font-display text-5xl font-semibold tracking-tight tabular-nums",
				children: [
					String(m).padStart(2, "0"),
					":",
					String(sec).padStart(2, "0")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: start,
						children: running ? "Pause" : "Start"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							stop();
							const elapsed = Math.round((chosen * 60 - remainingRef.current) / 60);
							if (elapsed >= 1) {
								addFocusSession({
									date: todayKey(),
									minutes: elapsed,
									plannedMinutes: chosen,
									completedAt: (/* @__PURE__ */ new Date()).toISOString()
								});
								toast(`Focus: ${elapsed} minutes`);
							}
							onClose();
						},
						children: "Save and close"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							stop();
							onClose();
						},
						children: "Cancel"
					})
				]
			})
		]
	});
}
function ExportSheet({ onClose }) {
	const habitCount = useSproutStore((s) => s.habits.length);
	const completionCount = useSproutStore((s) => s.completions.length);
	const reflectionCount = useSproutStore((s) => s.reflections.length);
	const Item = ({ label, hint, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "mb-2 flex w-full items-center justify-between rounded-sm border border-border bg-surface px-4 py-3.5 text-left hover:bg-surface-hover",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-subtle",
			children: hint
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: "Export data",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-sm text-muted",
				children: "Download a copy of your progress. Full backups can be imported later on any device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				label: "Full backup (JSON)",
				hint: `${habitCount} habits · ${completionCount} check-ins · ${reflectionCount} reflections`,
				onClick: () => {
					download(stamp("backup", "json"), exportJSON(), "application/json");
					toast("Backup downloaded");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				label: "Habits (CSV)",
				hint: "Open in a spreadsheet",
				onClick: () => {
					download(stamp("habits", "csv"), exportHabitsCSV(), "text/csv;charset=utf-8");
					toast("Habits CSV downloaded");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				label: "Check-ins (CSV)",
				hint: `${completionCount} rows`,
				onClick: () => {
					download(stamp("checkins", "csv"), exportCompletionsCSV(), "text/csv;charset=utf-8");
					toast("Check-ins CSV downloaded");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				label: "Reflections (CSV)",
				hint: `${reflectionCount} rows`,
				onClick: () => {
					download(stamp("reflections", "csv"), exportReflectionsCSV(), "text/csv;charset=utf-8");
					toast("Reflections CSV downloaded");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "mt-4 w-full",
				onClick: onClose,
				children: "Close"
			})
		]
	});
}
var NAV = [
	{
		id: "today",
		label: "Today",
		icon: House
	},
	{
		id: "progress",
		label: "Progress",
		icon: ChartColumn
	},
	{
		id: "goals",
		label: "Goals",
		icon: Target
	},
	{
		id: "focus",
		label: "Focus",
		icon: Clock3
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell() {
	const hydrated = useSproutStore((s) => s.hydrated);
	const view = useSproutStore((s) => s.view);
	const setView = useSproutStore((s) => s.setView);
	const [sheet, setSheet] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		hydrateSproutStore().then(() => startAutomation());
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 80 100",
				className: "h-16 w-12 text-accent",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M40 78C40 58 40 46 40 34",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.2",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M40 58c-8-2-13-9-12-16 8 2 13 9 12 16z",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M40 50c8-1 13-7 11-14-7 2-12 8-11 14z",
						fill: "currentColor",
						opacity: "0.75"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-fg",
				children: "Sprout"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh max-w-[480px] flex-col bg-bg sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]",
					children: [
						view === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, { openSheet: setSheet }),
						view === "progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressView, { openSheet: setSheet }),
						view === "goals" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsView, { openSheet: setSheet }),
						view === "focus" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusView, { openSheet: setSheet }),
						view === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, { openSheet: setSheet })
					]
				}),
				(view === "today" || view === "goals") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "fab",
					className: "fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-[max(1.25rem,calc(50%-240px+1.25rem))] z-40",
					"aria-label": view === "goals" ? "Add goal" : "Add habit",
					onClick: () => setSheet(view === "goals" ? { type: "goal" } : { type: "habit" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-7",
						strokeWidth: 2.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed bottom-0 left-1/2 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-border bg-bg-elevated/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:rounded-b-lg",
					"aria-label": "Main",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = view === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView(item.id),
							className: cn("flex min-w-16 flex-col items-center gap-0.5 rounded-xs px-3 py-2 text-[0.7rem] font-medium text-subtle transition-colors", active && "text-accent"),
							"aria-label": item.label,
							"aria-current": active ? "page" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-[22px]",
								strokeWidth: active ? 2.2 : 1.8
							}), item.label]
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SproutSheets, {
					sheet,
					setSheet
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-center",
			offset: "108px",
			toastOptions: { style: {
				background: "var(--color-surface)",
				color: "var(--color-fg)",
				border: "1px solid var(--color-border)"
			} }
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
