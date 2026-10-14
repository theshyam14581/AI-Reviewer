
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ReviewForm from "../components/ReviewForm";
import ReviewResult from "../components/ReviewResult";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");

  const [formData, setFormData] = useState({
    websiteUrl: "",
    websiteName: "",
    websiteDescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setReview("");

      const res = await api.post(
        "/reviews/generate",
        formData
      );

      setReview(
        res.data.review?.generatedReview ?? ""
      );
    } catch (error) {
      console.error("Review generation error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden
      bg-[#08090d] text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10
        bg-[radial-gradient(ellipse_at_10%_0%,rgba(230,36,41,0.10),transparent_35%),radial-gradient(ellipse_at_90%_40%,rgba(6,182,212,0.08),transparent_35%)]">
      </div>

      {/* Top navigation */}
      <header className="border-b border-white/10 bg-[#101116]/90">
        <div className="mx-auto flex max-w-7xl flex-wrap
          items-center justify-between gap-4 px-5 py-5
          sm:px-8 lg:px-10">

          <Link to="/dashboard"
            className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center
              justify-center rounded-xl bg-red-600
              text-lg font-black">
              AI
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                AI <span className="text-red-500">Reviewer</span>
              </h1>

              <p className="text-xs text-gray-500">
                Intelligent Review Platform
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">

            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-500">
                Signed in as
              </p>
              <p className="max-w-40 truncate text-sm font-semibold">
                {user?.name || "User"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-red-500/30
                bg-red-500/10 px-4 py-2.5 text-sm
                font-semibold text-red-400 hover:bg-red-500/20"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <section className="mx-auto max-w-7xl px-5
        py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* Welcome section */}
        <div className="mb-10 flex flex-col justify-between
          gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-semibold uppercase
              tracking-[0.2em] text-red-400">
              Workspace / Dashboard
            </p>

            <h2 className="mt-3 text-3xl font-black
              tracking-tight sm:text-4xl lg:text-5xl">
              Welcome back,{" "}
              <span className="text-red-500">
                {user?.name || "Explorer"}
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm
              leading-7 text-gray-400 sm:text-base">
              Generate intelligent website reviews,
              analyze your content and get actionable
              insights powered by AI.
            </p>
          </div>

          <Link
            to="/history"
            className="inline-flex w-fit items-center
              justify-center gap-2 rounded-xl border
              border-cyan-400/30 bg-cyan-400/10
              px-5 py-3 text-sm font-bold text-cyan-300
              hover:bg-cyan-400/20"
          >
            <span>◷</span>
            Review History
          </Link>

        </div>

        {/* Feature summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4
          sm:grid-cols-3">

          <article className="rounded-2xl border
            border-white/10 bg-[#111217] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center
                justify-center rounded-xl bg-red-500/10
                text-xl text-red-400">
                ✦
              </div>

              <div>
                <h3 className="font-bold">AI Analysis</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Intelligent feedback
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border
            border-white/10 bg-[#111217] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center
                justify-center rounded-xl bg-cyan-500/10
                text-xl text-cyan-400">
                ◷
              </div>

              <div>
                <h3 className="font-bold">Review History</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Access saved reviews
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border
            border-white/10 bg-[#111217] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center
                justify-center rounded-xl bg-green-500/10
                text-xl text-green-400">
                ✓
              </div>

              <div>
                <h3 className="font-bold">Actionable Insights</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Improve website content
                </p>
              </div>
            </div>
          </article>

        </div>

        {/* Review generator */}
        <section className="overflow-hidden rounded-2xl
          border border-white/10 bg-[#101116]/95
          shadow-2xl shadow-black/20">

          <div className="border-b border-white/10
            px-6 py-6 sm:px-8">

            <p className="text-xs font-bold uppercase
              tracking-[0.2em] text-red-400">
              Review Generator
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Generate Website Review
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Provide your website details to generate an
              AI-powered review.
            </p>
          </div>

          <div className="p-5 sm:p-8">

            <ReviewForm
              formData={formData}
              handleChange={handleChange}
              handleGenerate={handleGenerate}
              loading={loading}
            />

          </div>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 rounded-2xl border
            border-white/10 bg-[#111217] p-8">
            <Loader />
          </div>
        )}

        {/* Review result */}
        {!loading && review && (
          <section className="mt-8 overflow-hidden
            rounded-2xl border border-green-500/20
            bg-[#101116]">

            <div className="border-b border-green-500/10
              px-6 py-5 sm:px-8">
              <p className="text-xs font-bold uppercase
                tracking-[0.2em] text-green-400">
                Analysis Complete
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Generated Review
              </h2>
            </div>

            <div className="p-5 sm:p-8">
              <ReviewResult review={review} />
            </div>

          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10
          pt-6 text-center text-xs text-gray-600">
          AI Reviewer · Intelligent feedback for better results
        </footer>

      </section>
    </main>
  );
}

export default Dashboard;
