"use client";

import { useEffect } from "react";

export default function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  const bg = type === "error" ? "#ef4444" : type === "warn" ? "#f59e0b" : "#10b981";
  const icon = type === "error" ? "✕" : type === "warn" ? "⚠" : "✓";

  return (
    <div className="toast" style={{ background: bg }}>
      {icon} {msg}
    </div>
  );
}
