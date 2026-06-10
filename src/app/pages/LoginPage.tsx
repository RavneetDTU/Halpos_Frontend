import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Ear,
  Loader2,
  Building2,
} from "lucide-react";

// ─── Warehouses (match backend) ───────────────────────────────────────────────
const WAREHOUSES = [
  "HEAD OFFICE",
  "BRANCH 1",
  "BRANCH 2",
  "BRANCH 3",
  "BRANCH 4",
];

// ─── Tab ──────────────────────────────────────────────────────────────────────
type Tab = "login" | "register";

// ─── Helper ───────────────────────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const passed = Object.values(checks).filter(Boolean).length;
  const label =
    passed <= 2 ? "Weak" : passed === 3 ? "Fair" : passed === 4 ? "Good" : "Strong";
  const color =
    passed <= 2
      ? "bg-red-500"
      : passed === 3
        ? "bg-yellow-500"
        : passed === 4
          ? "bg-blue-500"
          : "bg-green-500";

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i <= passed ? color : "bg-white/10"
              }`}
          />
        ))}
      </div>
      <p className="text-xs text-white/40">
        Strength: <span className="text-white/70 font-medium">{label}</span>
        <span className="ml-2 text-white/30">(min. 12 characters)</span>
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("login");

  // ── Login form ──
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // ── Register form ──
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regWarehouse, setRegWarehouse] = useState(WAREHOUSES[0]);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // ── Shared state ──
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ── Switch tabs ──
  const switchTab = (t: Tab) => {
    setTab(t);
    setError("");
    setRegSuccess(false);
  };

  // ── Login submit ──────────────────────────────────────────────────────────
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setIsLoading(true);
    const result = await login(loginUsername.trim(), loginPassword);
    setIsLoading(false);

    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error ?? "Login failed");
    }
  };

  // ── Register submit ───────────────────────────────────────────────────────
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!regUsername.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (regPassword.length < 12) {
      setError("Password must be at least 12 characters long.");
      return;
    }

    setIsLoading(true);
    const result = await register({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword,
      warehouse: regWarehouse,
    });
    setIsLoading(false);

    if (result.success) {
      setRegSuccess(true);
      // Pre-fill the login username and switch after short delay
      setLoginUsername(regUsername.trim());
      setTimeout(() => {
        switchTab("login");
        setRegSuccess(false);
      }, 2400);
    } else {
      setError(result.error ?? "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1117] via-[#1a1d29] to-[#0d1526] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl shadow-blue-500/30 mb-4">
            <Ear size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Hearing Aid Labs</h1>
          <p className="text-sm text-white/50 mt-1">HALPOS · Point of Sale System</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-white/10">
            <button
              id="tab-login"
              onClick={() => switchTab("login")}
              className={`flex-1 py-3.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === "login"
                  ? "text-white bg-white/5 border-b-2 border-blue-500"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              <LogIn size={15} />
              Sign In
            </button>
            <button
              id="tab-register"
              onClick={() => switchTab("register")}
              className={`flex-1 py-3.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === "register"
                  ? "text-white bg-white/5 border-b-2 border-blue-500"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              <UserPlus size={15} />
              Register
            </button>
          </div>

          <div className="p-8">

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl mb-5">
                <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Success Alert (register) */}
            {regSuccess && (
              <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl mb-5">
                <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-300">
                  Account created! Redirecting to sign in…
                </p>
              </div>
            )}

            {/* ── LOGIN FORM ── */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-white">Sign in to your account</h2>
                  <p className="text-sm text-white/50 mt-0.5">Enter your credentials to access the system</p>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Username
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    autoComplete="username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="johndoe"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showLoginPwd ? "text" : "password"}
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPwd(!showLoginPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showLoginPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <LogIn size={16} />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-white">Create an account</h2>

                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Username <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="reg-username"
                    type="text"
                    autoComplete="username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="johndoe"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@hearingaidlab.co.za"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showRegPwd ? "text" : "password"}
                      autoComplete="new-password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 12 characters"
                      className="w-full px-4 py-2.5 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPwd(!showRegPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <PasswordStrength password={regPassword} />
                </div>

                {/* Warehouse */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Warehouse <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                    />
                    <select
                      id="reg-warehouse"
                      value={regWarehouse}
                      onChange={(e) => setRegWarehouse(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
                    >
                      {WAREHOUSES.map((w) => (
                        <option key={w} value={w} className="bg-[#1a1d29] text-white">
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="register-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Create Account
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          © 2026 Hearing Aid Lab (PTY) LTD · All rights reserved
        </p>
      </div>
    </div>
  );
}
