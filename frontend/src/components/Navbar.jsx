import { Link } from "react-router-dom";

function Navbar({
  user,
  logout
}) {

  return (

    <nav className="
    flex
    justify-between
    items-center
    px-10
    py-5
    bg-[#111]
    border-b
    border-red-500/20
    ">

      <h1 className="
      text-3xl
      font-bold
      text-red-500
      ">
        AI Reviewer
      </h1>

      <div className="flex gap-4 items-center">

        <Link
          to="/dashboard"
          className="
          bg-cyan-500
          text-black
          px-4
          py-2
          rounded-lg
          "
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          className="
          bg-gray-800
          px-4
          py-2
          rounded-lg
          "
        >
          History
        </Link>

        <span>
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="
          bg-red-600
          px-4
          py-2
          rounded-lg
          "
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;