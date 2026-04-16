"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/useToast";
import { fmtDate } from "@/lib/formatters";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workModal, setWorkModal] = useState(null);
  const [workNote, setWorkNote] = useState("");
  const [workForm, setWorkForm] = useState(null);
  const [showToast, toastNode] = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await apiFetch("/tasks/my"); setTasks(Array.isArray(d) ? d : []); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function submitWork(taskId) {
    const formData = new FormData();
    formData.append("notes", workNote);
    if (workForm?.file) {
      formData.append("attached_file", workForm.file);
    }
    
    try {
      // Note: Backend endpoint was updated to /{task_id}/revert to match HOD review flow
      await apiFetch(`/tasks/${taskId}/revert`, {
        method: "POST",
        body: formData,
        headers: {},
      });
      showToast("Work submitted for review!");
      setWorkModal(null);
      setWorkNote("");
      setWorkForm(null);
      load();
    } catch (e) {
      showToast(e.message, "error");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>My Tasks</h1>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>Track and manage your assigned tasks</p>
      </div>
      <div className="card">
        {loading ? <Loader /> : tasks.length === 0 ? <EmptyState icon="✓" title="No tasks" sub="Tasks will appear here" /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Task</th><th>Description</th><th>Deadline</th><th>Status</th><th>HOD Attachment</th><th>My Submission</th><th>Actions</th></tr></thead>
              <tbody>
                {tasks.map((t, i) => (
                  <tr key={i}>
                    <td><b>{t.title}</b></td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</td>
                    <td>{fmtDate(t.deadline)}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>
                      {t.attached_file ? (
                        <a href={t.attached_file} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>📎 View HOD File</a>
                      ) : <span style={{ color: "var(--muted)", fontSize: 11 }}>None</span>}
                    </td>
                    <td>
                      {t.revert?.attached_file ? (
                        <a href={t.revert.attached_file} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>📎 View My File</a>
                      ) : <span style={{ color: "var(--muted)", fontSize: 11 }}>—</span>}
                    </td>
                    <td>{t.status === "pending" && <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => setWorkModal(t)}>Submit Work</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {workModal && (
        <Modal title={`Submit Work: ${workModal.title}`} onClose={() => setWorkModal(null)}
          footer={<><button className="btn-ghost" onClick={() => setWorkModal(null)}>Cancel</button><button className="btn-primary" onClick={() => submitWork(workModal.id)}>Submit</button></>}>
          <div className="form-group"><label className="label">Work Notes</label><textarea className="input" rows={4} placeholder="Describe what you completed…" value={workNote} onChange={(e) => setWorkNote(e.target.value)} /></div>
          
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="label">Attachment (Images, Docs - Max 50MB)</label>
            <input type="file" className="input" onChange={(e) => setWorkForm({ file: e.target.files[0] })} />
          </div>
        </Modal>
      )}
      {toastNode}
    </div>
  );
}
