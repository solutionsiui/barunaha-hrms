"use client";

import { useTheme } from "@/lib/theme-context";

const options = [
  { value: "light", icon: "☀️", label: "Light" },
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "system", icon: "💻", label: "System" },
];

export default function ThemeToggle() {
  const { preference, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`theme-toggle-btn ${preference === opt.value ? "active" : ""}`}
          onClick={() => setTheme(opt.value)}
          title={opt.label}
        >
          <span style={{ fontSize: 14 }}>{opt.icon}</span>
          <span style={{ fontSize: 11 }}>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
