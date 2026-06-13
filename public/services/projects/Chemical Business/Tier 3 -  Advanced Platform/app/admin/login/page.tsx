"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, CheckCircle, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simple authentication - in production, this would call a Convex action
      // For now, using a hardcoded admin password for demo
      if (email === "admin@chemcorp.com" && password === "admin123") {
        localStorage.setItem("adminToken", "demo-token");
        router.push("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* Left Column - Branding & Features */}
          <div className="hidden lg:flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-32 -mb-32"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Logo & Title */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold">ChemCorp</h1>
                </div>
                <p className="text-blue-200 text-sm font-medium">Admin Portal</p>
              </div>

              {/* Features List */}
              <div className="space-y-6 flex-1">
                <h2 className="text-2xl font-bold mb-8">Secure Access</h2>

                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">End-to-End Encryption</h3>
                    <p className="text-blue-200 text-sm">Military-grade security for all your business data</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Real-time Monitoring</h3>
                    <p className="text-blue-200 text-sm">Track product inquiries and orders instantly</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Advanced Analytics</h3>
                    <p className="text-blue-200 text-sm">Deep insights into business performance metrics</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Secure Data Backup</h3>
                    <p className="text-blue-200 text-sm">Automated daily backups with disaster recovery</p>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-8 border-t border-blue-700">
                <p className="text-blue-300 text-sm">
                  Enterprise-grade admin portal for chemical business management
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-600">Sign in to your admin account to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@chemcorp.com"
                    className="w-full pl-10 pr-4 py-3 border text-black border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 text-black border border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Demo credentials hint */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                <p className="text-amber-900 text-xs font-semibold mb-1">Demo Credentials</p>
                <p className="text-amber-800 text-xs">
                  Email: <span className="font-mono font-semibold">admin@chemcorp.com</span>
                </p>
                <p className="text-amber-800 text-xs">
                  Password: <span className="font-mono font-semibold">admin123</span>
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Not an admin?{" "}
                <Link
                  href="/"
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  Back to home
                </Link>
              </p>
            </div>

            {/* Bottom note */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-xs text-center">
                For production, integrate with your authentication system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
