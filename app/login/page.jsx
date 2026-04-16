"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AppLogo from "@/components/AppLogo";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await login(form);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--login-bg)", padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div
          className="card slide-up"
          style={{ padding: "48px 40px", background: "var(--login-card)", borderColor: "var(--border)" }}
        >
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
              <AppLogo size={62} showText={false} />
            </div>
            <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--text)" }}>Barunaha Entertainment</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>Enterprise HR & Payroll Portal</p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label className="label">Username or Email</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}><UserRound size={16} /></span>
                <input
                  className="input" placeholder="Enter username or email" value={form.identifier}
                  onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
                  autoComplete="off"
                  name="login_identifier_no_autofill"
                  style={{ paddingLeft: 40 }}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none", zIndex: "var(--z-layer-base)" }}><LockKeyhole size={16} /></span>
                <PasswordInput
                  placeholder="••••••••" value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  autoComplete="off"
                  name="login_password_no_autofill"
                  inputStyle={{ paddingLeft: 40 }}
                  required
                />
              </div>
              <div style={{ marginTop: 8, textAlign: "right" }}>
                <Link
                  href="/reset-password"
                  style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {err && (
              <div
                style={{
                  background: "#ef444422", border: "1px solid #ef444444", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: "#ef4444", marginBottom: 16,
                }}
              >
                ✕ {err}
              </div>
            )}

            <button
              className="btn-primary" type="submit" disabled={loading}
              style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: 15, marginTop: 4 }}
            >
              {loading ? "Signing in…" : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
