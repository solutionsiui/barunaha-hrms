"use client";

import Image from "next/image";
import appIcon from "@/lib/app icon.png";

export default function AppLogo({ size = 44, showText = true, compact = false, subtitle }) {
  const imageSize = compact ? Math.round(size * 0.82) : size;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 10 : 14, minWidth: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.max(12, Math.round(size * 0.28)),
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(15,23,42,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 24px rgba(15,23,42,0.14)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image src={appIcon} alt="Barunaha Entertainment logo" width={imageSize} height={imageSize} style={{ width: imageSize, height: imageSize, objectFit: "contain" }} priority />
      </div>
      {showText ? (
        <div style={{ minWidth: 0 }}>
          <div className="syne" style={{ fontSize: compact ? 15 : 18, fontWeight: 800, color: "var(--text)", letterSpacing: "0.02em", lineHeight: 1.1 }}>
            Barunaha Entertainment
          </div>
          <div style={{ fontSize: compact ? 11 : 12, color: "var(--muted)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {subtitle || "HRMS & Payroll Portal"}
          </div>
        </div>
      ) : null}
    </div>
  );
}
