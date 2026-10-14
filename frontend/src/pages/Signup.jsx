
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/signup", formData);

      alert("Signup Successful");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen
      items-center justify-center overflow-hidden
      bg-[#08090d] px-4 py-10 text-white sm:px-6">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10
        bg-[radial-gradient(ellipse_at_15%_20%,rgba(230,36,41,0.14),transparent_40%),radial-gradient(ellipse_at_85%_85%,rgba(59,130,246,0.10),transparent_38%)]">
      </div>

      {/* Main card */}
      <div className="mx-auto grid w-full max-w-5xl
        overflow-hidden rounded-3xl border border-white/10
        bg-[#101116]/95 shadow-2xl shadow-black/50
        md:grid-cols-2">

        {/* Left branding panel */}
        <section className="relative hidden min-h-[620px]
          flex-col justify-between overflow-hidden
          border-r border-white/10 bg-[#14151b] p-10
          md:flex lg:p-12">

          <div className="absolute inset-0
            bg-[radial-gradient(ellipse_at_30%_25%,rgba(230,36,41,0.18),transparent_55%)]">
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center
                justify-center rounded-xl bg-red-600
                text-xl font-black">
                AI
              </div>

              <span className="text-xl font-extrabold tracking-tight">
                AI <span className="text-red-500">Reviewer</span>
              </span>
            </div>

            <div className="mt-20">
              <p className="text-xs font-bold uppercase
                tracking-[0.25em] text-red-400">
                Start Your Journey
              </p>

              <h1 className="mt-5 text-4xl font-black
                leading-tight lg:text-5xl">
                Create better.
                <span className="mt-2 block text-red-500">
                  Review smarter.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-base
                leading-7 text-gray-400">
                Create your account to generate AI-powered
                reviews, organize your work, and turn
                feedback into actionable insights.
              </p>
            </div>
          </div>

          {/* Feature panel */}
          <div className="relative rounded-2xl border
            border-white/10 bg-white/[0.03] p-5">

            <p className="text-xs font-semibold uppercase
              tracking-widest text-gray-500">
              Your benefits
            </p>

            <div className="mt-4 space-y-4">

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center
                  justify-center rounded-lg bg-red-500/10
                  text-red-400">
                  ✓
                </span>
                <p className="text-sm font-medium text-gray-300">
                  AI-powered review generation
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center
                  justify-center rounded-lg bg-red-500/10
                  text-red-400">
                  ✓
                </span>
                <p className="text-sm font-medium text-gray-300">
                  Organized review history
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center
                  justify-center rounded-lg bg-red-500/10
                  text-red-400">
                  ✓
                </span>
                <p className="text-sm font-medium text-gray-300">
                  Downloadable review reports
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Right signup panel */}
        <section className="flex items-center justify-center
          px-6 py-10 sm:px-10 md:px-9 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile branding */}
            <div className="mb-9 flex items-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center
                justify-center rounded-xl bg-red-600
                text-xl font-black">
                AI
              </div>

              <span className="text-xl font-extrabold">
                AI <span className="text-red-500">Reviewer</span>
              </span>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-red-400">
                GET STARTED
              </p>

              <h2 className="mt-3 text-3xl font-extrabold
                tracking-tight sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your details to join AI Reviewer.
              </p>
            </div>

            {/* Signup form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label htmlFor="name"
                  className="mb-2 block text-sm font-semibold
                    text-gray-200">
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border
                    border-white/10 bg-[#191a21] px-4 py-3.5
                    text-sm text-white placeholder:text-gray-600
                    outline-none focus:border-red-500
                    focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email"
                  className="mb-2 block text-sm font-semibold
                    text-gray-200">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border
                    border-white/10 bg-[#191a21] px-4 py-3.5
                    text-sm text-white placeholder:text-gray-600
                    outline-none focus:border-red-500
                    focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password"
                  className="mb-2 block text-sm font-semibold
                    text-gray-200">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border
                    border-white/10 bg-[#191a21] px-4 py-3.5
                    text-sm text-white placeholder:text-gray-600
                    outline-none focus:border-red-500
                    focus:ring-2 focus:ring-red-500/20"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center
                  rounded-xl bg-red-600 px-5 py-3.5
                  font-bold text-white hover:bg-red-700
                  focus:outline-none focus:ring-2
                  focus:ring-red-400 focus:ring-offset-2
                  focus:ring-offset-[#101116]
                  disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>

            </form>

            {/* Login link */}
            <p className="mt-7 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-bold text-red-400
                  hover:text-red-300"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-9 border-t border-white/10 pt-5">
              <p className="text-center text-xs
                leading-5 text-gray-600">
                AI Reviewer · Intelligent feedback for better results
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Signup;
