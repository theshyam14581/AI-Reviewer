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

      await api.post(
        "/auth/signup",
        formData
      );

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

    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="w-[450px] bg-[#111] p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,.3)]">

        <h1 className="text-center text-4xl font-bold text-cyan-400 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join AI Reviewer
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-cyan-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-cyan-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
          >
            {loading ? "Creating..." : "Signup"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-red-500"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Signup;