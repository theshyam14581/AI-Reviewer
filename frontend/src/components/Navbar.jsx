
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, logout }) {
  const location = useLocation();

  const linkStyle = (path) =>
    `rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
      location.pathname === path
        ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
        : "border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0c10]/95 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3"
          aria-label="AI Reviewer Dashboard"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
            <span className="text-lg font-black text-red-500">AI</span>
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              AI <span className="text-red-500">Reviewer</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Intelligent Website Analysis
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/history" className={linkStyle("/history")}>
            History
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#15161c] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-sm font-bold text-red-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-28 truncate text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">Account</p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
