/* Sprout Tracker service worker — notification quick actions (Done / Snooze). */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  const data = event.notification.data || {};
  event.notification.close();
  const payload =
    event.action === "done"
      ? { type: "SPROUT_HABIT_DONE", habitId: data.habitId, date: data.date }
      : event.action === "snooze"
        ? { type: "SPROUT_HABIT_SNOOZE", habitId: data.habitId, date: data.date }
        : { type: "SPROUT_OPEN", habitId: data.habitId, date: data.date };

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => client.postMessage(payload));
      if (clients[0]) return clients[0].focus();
      if (self.clients.openWindow) return self.clients.openWindow("/");
      return undefined;
    }),
  );
});
