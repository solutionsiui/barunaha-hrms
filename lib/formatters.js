export function fmtDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";
}

export function fmtTime(d) {
  if (!d) return "—";

  if (typeof d === "string") {
    const hhmmss = d.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (hhmmss) {
      const hour = Number(hhmmss[1]);
      const minute = hhmmss[2];
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = ((hour + 11) % 12) + 1;
      return `${String(hour12).padStart(2, "0")}:${minute} ${ampm}`;
    }
  }

  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function fmtINR(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}
