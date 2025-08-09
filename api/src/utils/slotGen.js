// Generate 30-min slots 09:00–17:00 for [from, to] inclusive, in UTC
export function generateSlotsUTC(fromISO, toISO) {
  const out = [];
  const from = new Date(fromISO);
  const to = new Date(toISO);
  for (let d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
       d <= to; d.setUTCDate(d.getUTCDate() + 1)) {
    for (let h = 9; h < 17; h++) {
      for (let m of [0, 30]) {
        const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m, 0));
        const end = new Date(start.getTime() + 30 * 60 * 1000);
        out.push({ startAt: start.toISOString(), endAt: end.toISOString() });
      }
    }
  }
  return out;
}