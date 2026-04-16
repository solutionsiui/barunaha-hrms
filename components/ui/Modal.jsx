"use client";

import { useEffect } from "react";

export default function Modal({ title, onClose, children, footer, className = "" }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal slide-up ${className}`.trim()}>
        <div className="modal-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "var(--text)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
