import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ReviewForm from "../components/ReviewForm";
import ReviewResult from "../components/ReviewResult";

function Dashboard() {

    const { user, logout } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [review, setReview] =
        useState("");

    const [formData, setFormData] =
        useState({
            websiteUrl: "",
            websiteName: "",
            websiteDescription: "",
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    const handleGenerate =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const res =
                    await api.post(
                        "/reviews/generate",
                        formData
                    );

                setReview(
                    res.data.review.generatedReview
                );

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Failed To Generate Review"
                );

            } finally {

                setLoading(false);

            }
        };

    return (

        <div className="min-h-screen bg-black text-white">

            {/* Navbar */}

            <nav className="flex justify-between items-center px-10 py-5 border-b border-red-500/20">

                <h1 className="text-3xl font-bold text-red-500">
                    AI Reviewer
                </h1>

                <div className="flex gap-4 items-center">

                    <span>
                        Welcome {user?.name}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <Navbar
                user={user}
                logout={handleLogout}
            />

            <ReviewForm
                formData={formData}
                handleChange={handleChange}
                handleGenerate={handleGenerate}
                loading={loading}
            />

            {loading && <Loader />}

            {review && (
                <ReviewResult
                    review={review}
                />
            )}

            {/* Main */}

            <div className="max-w-5xl mx-auto mt-10">

                <div className="bg-[#111] p-8 rounded-2xl border border-cyan-500/20">

                    <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                        Generate Website Review
                    </h2>

                    <form
                        onSubmit={handleGenerate}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            name="websiteUrl"
                            placeholder="Website URL"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            className="w-full p-4 bg-[#1b1b1b] rounded-lg border border-gray-700"
                        />

                        <input
                            type="text"
                            name="websiteName"
                            placeholder="Website Name"
                            value={formData.websiteName}
                            onChange={handleChange}
                            className="w-full p-4 bg-[#1b1b1b] rounded-lg border border-gray-700"
                        />

                        <textarea
                            rows="5"
                            name="websiteDescription"
                            placeholder="Website Description"
                            value={formData.websiteDescription}
                            onChange={handleChange}
                            className="w-full p-4 bg-[#1b1b1b] rounded-lg border border-gray-700"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-4 bg-gradient-to-r from-red-600 to-cyan-500 rounded-lg font-bold"
                        >
                            {
                                loading
                                    ? "Generating..."
                                    : "Generate AI Review"
                            }
                        </button>
                        <Link
                            to="/history"
                            className="bg-cyan-500 text-black px-4 py-2 rounded-lg"
                        >
                            History
                        </Link>


                    </form>

                </div>

                {/* Review Result */}

                {
                    review && (

                        <div className="mt-10 bg-[#111] p-8 rounded-2xl border border-green-500/20">

                            <h2 className="text-2xl font-bold text-green-400 mb-5">
                                Generated Review
                            </h2>

                            <pre className="whitespace-pre-wrap text-gray-300 leading-8">
                                {review}
                            </pre>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Dashboard;