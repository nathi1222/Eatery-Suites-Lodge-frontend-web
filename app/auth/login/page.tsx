"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Try guest@example.com");
      } else {
        // After successful login, check user role and redirect accordingly
        // The page will reload and the layout will handle the redirect
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-64 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-base sm:text-lg md:text-xl">Sign in to manage your bookings</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-green-900 text-center mb-6">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="guest@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 text-center mb-2">Demo Accounts:</p>
            <p className="text-xs text-gray-600 text-center">
              👤 Regular User: guest@example.com / password
            </p>
            <p className="text-xs text-gray-600 text-center">
              👑 Admin: admin@eaterysuites.co.za / password
            </p>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-amber-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}