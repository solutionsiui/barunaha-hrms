"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/useToast";
import { fmtDate } from "@/lib/formatters";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // FIX 1: Changed form fields to match backend schema (subject/description instead of leave_type/reason)
  const [form, setForm] = useState({ subject: "", description: "", start_date: "", end_date: "", leave_type: "paid" });
  const [submitting, setSubmitting] = useState(false);
  const [showToast, toastNode] = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await apiFetch("/leave/my"); setLeaves(Array.isArray(d) ? d : []); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function applyLeave(e) {
    e.preventDefault(); setSubmitting(true);
    try {
      // FIX 1: Send subject/description to match backend ApplyLeaveRequest schema
      await apiFetch("/leave/apply", {
        method: "POST",
        body: JSON.stringify({
          subject:     form.subject || `${form.leave_type} leave request`,
          description: form.description || "Leave requested",
          start_date:  form.start_date,
          end_date:    form.end_date,
        }),
      });
      showToast("Leave application submitted!");
      setShowModal(false);
      setForm({ subject: "", description: "", start_date: "", end_date: "", leave_type: "paid" });
      load();
    } catch (e) { showToast(e.message, "error"); } finally { setSubmitting(false); }
  }

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>My Leaves</h1>
          <p style={{ color: "var(--muted)", marginTop: 4 }}>Apply and track leave requests</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Apply Leave</button>
      </div>
      <div className="card">
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h2 className="syne" style={{ fontSize: 16, fontWeight: 700 }}>Leave History</h2>
        </div>
        {loading ? <Loader /> : leaves.length === 0 ? <EmptyState icon="📅" title="No leaves yet" sub="Apply for your first leave" /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>From</th><th>To</th><th>Subject</th><th>Description</th><th>Status</th></tr></thead>
              <tbody>
                {leaves.map((l, i) => (
                  <tr key={i}>
                    <td>{fmtDate(l.start_date)}</td><td>{fmtDate(l.end_date)}</td>
                    <td><span className="chip">{l.subject}</span></td>
                    <td style={{ maxWidth: 200 }}>{l.description}</td>
                    <td><StatusBadge status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <Modal title="Apply for Leave" onClose={() => setShowModal(false)}
          footer={<><button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary" onClick={applyLeave} disabled={submitting}>{submitting ? "Submitting…" : "Apply"}</button></>}>
          <div className="form-group"><label className="label">Subject</label><input className="input" placeholder="e.g. Family function, Medical, etc." value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required /></div>
          <div className="form-row">
            <div className="form-group"><label className="label">Start Date</label><input className="input" type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} required /></div>
            <div className="form-group"><label className="label">End Date</label><input className="input" type="date" value={form.end_date} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} required /></div>
          </div>
          <div className="form-group"><label className="label">Description</label><textarea className="input" rows={3} placeholder="Reason for leave…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
        </Modal>
      )}
      {toastNode}
    </div>
  );
}
