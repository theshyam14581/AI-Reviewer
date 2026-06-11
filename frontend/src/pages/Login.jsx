import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await api.post(
        "/auth/login",
        formData
      );

      login(res.data);

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="w-[420px] bg-[#111] p-8 rounded-2xl border border-red-500/30 shadow-[0_0_25px_rgba(230,36,41,.4)]">

        <h1 className="text-center text-4xl font-bold text-red-500 mb-2">
          AI Reviewer
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login To Continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-red-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-red-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400"
          >
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;