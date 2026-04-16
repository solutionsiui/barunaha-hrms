export default function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 13 }}>{sub}</div>}
    </div>
  );
}
