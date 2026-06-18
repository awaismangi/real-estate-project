import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signIn, signUp, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setForm({ name: "", email: "", password: "" });
    clearError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok =
      mode === "signin"
        ? signIn({ email: form.email, password: form.password })
        : signUp(form);

    if (ok) {
      navigate(redirectTo, { replace: true });
    }
  };

  const fillAdminDemo = () => {
    setMode("signin");
    setForm({ name: "", email: "admin", password: "admin" });
    clearError();
  };

  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center bg-panel py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-bold text-sm">
                NH
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-ink">
                Nex<span className="text-gradient">Home</span>
              </span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-ink mb-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sub text-sm">
              {mode === "signin"
                ? "Sign in to manage listings and saved properties."
                : "Sign up to start saving properties and listing your own."}
            </p>
          </div>

          <div className="glow-ring bg-white rounded-2xl shadow-lift p-6 sm:p-8">
            {/* Mode toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-panel rounded-full">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-smooth ${
                  mode === "signin"
                    ? "bg-white text-ink shadow-soft"
                    : "text-sub hover:text-ink"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-smooth ${
                  mode === "signup"
                    ? "bg-white text-ink shadow-soft"
                    : "text-sub hover:text-ink"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-medium text-sub mb-1.5 block">
                    Full name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ali Raza"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-sub mb-1.5 block">
                  {mode === "signin" ? "Email or username" : "Email address"}
                </label>
                <input
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={mode === "signin" ? "admin or you@example.com" : "you@example.com"}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-sub mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 pr-11 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sub hover:text-ink transition-smooth"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg animate-fadeIn">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-accent to-cyan text-white text-sm font-semibold hover:opacity-90 transition-smooth shadow-soft"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-border">
              <button
                type="button"
                onClick={fillAdminDemo}
                className="w-full text-center text-xs text-sub hover:text-accent transition-smooth"
              >
                Use demo admin account &nbsp;
                <span className="font-mono text-ink">admin / admin</span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-sub mt-6">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  className="text-accent font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("signin")}
                  className="text-accent font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" />
    </svg>
  );
}
