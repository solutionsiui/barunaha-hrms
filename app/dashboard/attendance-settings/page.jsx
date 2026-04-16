"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/useToast";
import Loader from "@/components/ui/Loader";

export default function AttendanceSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, toastNode] = useToast();

  useEffect(() => {
    apiFetch("/attendance/settings").then(setSettings).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function save() {
    try {
      await apiFetch("/attendance/settings", { method: "PUT", body: JSON.stringify(settings) });
      showToast("Attendance settings updated!");
    } catch (e) { showToast(e.message, "error"); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <div className="page-header">
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>Attendance Rules</h1>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>Edit shift timings and deduction thresholds without redeploying code.</p>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div className="form-row">
          {["shift_start","late_after","half_day_in_after","absent_in_after","early_leave_before","half_day_out_before","absent_out_before","shift_end","lunch_start","lunch_end"].map((field) => (
            <div className="form-group" key={field}>
              <label className="label">{field.replace(/_/g, " ")}</label>
              <input className="input" value={settings?.[field] || ""} onChange={(e) => setSettings((item) => ({ ...item, [field]: e.target.value }))} />
            </div>
          ))}
          <div className="form-group"><label className="label">Lates Per Half-Day Deduction</label><input className="input" type="number" value={settings?.lates_per_half_day_deduction || 0} onChange={(e) => setSettings((item) => ({ ...item, lates_per_half_day_deduction: +e.target.value }))} /></div>
          <div className="form-group"><label className="label">Early Leaves Per Half-Day</label><input className="input" type="number" value={settings?.early_leaves_per_half_day || 0} onChange={(e) => setSettings((item) => ({ ...item, early_leaves_per_half_day: +e.target.value }))} /></div>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}><input type="checkbox" checked={settings?.allow_web_punch || false} onChange={(e) => setSettings((item) => ({ ...item, allow_web_punch: e.target.checked }))} /> Allow web punch</label>
        <button className="btn-primary" onClick={save}>Save Settings</button>
      </div>
      {toastNode}
    </div>
  );
}
