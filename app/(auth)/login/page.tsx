"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle, X, ArrowLeft, CheckCircle2 } from "lucide-react";
import Back2KCLogo from "@/components/Back2KCLogo";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#00AEEF]" />
            <h2 className="text-base font-bold text-[#0D1B2A]">Reset Password</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {!submitted ? (
            <>
              <p className="text-sm text-gray-500 mb-5">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]/20"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00AEEF] hover:bg-[#0096CC] text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-[#0D1B2A] mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 mb-1">
                If <strong>{email}</strong> is authorized, a reset link has been sent.
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Didn't receive it? Contact your administrator at{" "}
                <a href="mailto:admin@socialbalances.com" className="text-[#00AEEF] hover:underline">
                  admin@socialbalances.com
                </a>
              </p>
              <button
                onClick={onClose}
                className="mt-5 flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0D1B2A] mx-auto transition-colors"
              >
                <ArrowLeft size={14} />
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      router.push(from === "/login" ? "/" : from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Header band */}
            <div className="bg-[#0D1B2A] px-8 py-8 text-center">
              <div className="flex justify-center mb-3">
                <Back2KCLogo size="lg" />
              </div>
              <p className="text-[#00AEEF] text-sm font-semibold mt-2 tracking-wide">
                Tax Advisor Dashboard
              </p>
              <p className="text-gray-400 text-xs mt-1">Social Balances · Authorized Users Only</p>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <h1 className="text-xl font-bold text-[#0D1B2A] mb-1">Welcome back</h1>
              <p className="text-sm text-gray-400 mb-6">Sign in to access your tax dashboard</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
                  <AlertCircle size={15} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="you@socialbalances.com"
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-xs text-[#00AEEF] hover:underline font-medium"
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#00AEEF] hover:bg-[#0096CC] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : null}
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-gray-400">
                Access restricted to authorized Social Balances accounts.
                <br />
                Need access?{" "}
                <a href="mailto:admin@socialbalances.com" className="text-[#00AEEF] hover:underline">
                  Contact admin
                </a>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            Back2KC Tax Advisor · {new Date().getFullYear()} · Social Balances
          </p>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FE]" />}>
      <LoginForm />
    </Suspense>
  );
}
