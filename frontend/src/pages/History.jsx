
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import jsPDF from "jspdf";

function History() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setError("");

      const res = await api.get("/reviews");

      setReviews(
        Array.isArray(res.data.reviews)
          ? res.data.reviews
          : []
      );
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load review history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/reviews/${id}`);

      setReviews((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Delete review error:", err);

      alert(
        err.response?.data?.message ||
          "Delete failed. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Copy review
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text || "");
      alert("Review copied successfully!");
    } catch (err) {
      console.error("Copy error:", err);
      alert("Unable to copy review.");
    }
  };

  // Download review as PDF
  const handlePDF = (review) => {
    try {
      const doc = new jsPDF();

      const title = review.websiteName || "Website Review";
      const website = review.websiteUrl || "";
      const content = review.generatedReview || "";

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 18;
      const maxWidth = pageWidth - margin * 2;

      let y = 20;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(19);
      doc.text("AI Reviewer", margin, y);

      y += 12;

      doc.setFontSize(15);
      const titleLines = doc.splitTextToSize(title, maxWidth);
      doc.text(titleLines, margin, y);

      y += titleLines.length * 7 + 3;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (website) {
        const urlLines = doc.splitTextToSize(
          website,
          maxWidth
        );

        doc.text(urlLines, margin, y);
        y += urlLines.length * 5 + 5;
      }

      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);

      y += 10;

      doc.setFontSize(11);

      const reviewLines = doc.splitTextToSize(
        content,
        maxWidth
      );

      const lineHeight = 6;

      reviewLines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        doc.text(line, margin, y);
        y += lineHeight;
      });

      const safeName = title
        .replace(/[^a-z0-9-_ ]/gi, "")
        .trim()
        .replace(/\s+/g, "-") || "website-review";

      doc.save(`${safeName}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Unable to generate PDF.");
    }
  };

  return (
    <main className="relative isolate min-h-screen
      overflow-hidden bg-[#08090d] px-4 py-10
      text-white sm:px-6 lg:px-10">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10
        bg-[radial-gradient(ellipse_at_10%_0%,rgba(230,36,41,0.10),transparent_35%),radial-gradient(ellipse_at_90%_40%,rgba(6,182,212,0.08),transparent_35%)]">
      </div>

      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-10 flex flex-col
          justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase
              tracking-[0.25em] text-red-400">
              AI Reviewer / Workspace
            </p>

            <h1 className="mt-3 text-3xl font-black
              tracking-tight sm:text-4xl lg:text-5xl">
              Review <span className="text-red-500">History</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm
              leading-7 text-gray-400 sm:text-base">
              Access your previous AI-generated website
              reviews, copy feedback, download reports
              or remove reviews you no longer need.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center
              justify-center gap-2 rounded-xl border
              border-white/10 bg-[#15161c] px-5 py-3
              text-sm font-semibold text-gray-200
              hover:border-red-500/40 hover:text-white"
          >
            ← Back to Dashboard
          </Link>

        </header>

        {/* Summary card */}
        <div className="mb-8 flex items-center gap-4
          rounded-2xl border border-white/10
          bg-[#111217] p-5 sm:p-6">

          <div className="flex h-14 w-14 shrink-0
            items-center justify-center rounded-xl
            bg-cyan-500/10 text-2xl text-cyan-400">
            ◷
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Saved Reviews
            </p>

            <h2 className="mt-1 text-2xl font-extrabold">
              {reviews.length}
            </h2>
          </div>

          <div className="ml-auto hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-300">
              Your Review Library
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Manage your generated reports
            </p>
          </div>

        </div>

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-white/10
            bg-[#111217] px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14
              items-center justify-center rounded-full
              bg-red-500/10 text-2xl text-red-400">
              ✦
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Loading Reviews
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Retrieving your saved review history...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20
            bg-red-500/5 p-8 text-center">

            <h2 className="text-xl font-bold text-red-400">
              Unable to Load Reviews
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                fetchReviews();
              }}
              className="mt-6 rounded-lg bg-red-600
                px-5 py-3 font-semibold text-white
                hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reviews.length === 0 && (
          <div className="rounded-2xl border border-white/10
            bg-[#111217] px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16
              items-center justify-center rounded-2xl
              bg-cyan-500/10 text-3xl">
              🗂️
            </div>

            <h2 className="mt-5 text-2xl font-extrabold">
              No Reviews Found
            </h2>

            <p className="mx-auto mt-3 max-w-md
              text-sm leading-6 text-gray-400">
              Your review library is empty. Generate your
              first website review to see it here.
            </p>

            <Link
              to="/dashboard"
              className="mt-7 inline-flex rounded-xl
                bg-red-600 px-6 py-3 font-bold
                text-white hover:bg-red-700"
            >
              Generate First Review →
            </Link>
          </div>
        )}

        {/* Review cards */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 gap-6
            lg:grid-cols-2">

            {reviews.map((review) => (
              <article
                key={review._id}
                className="flex min-w-0 flex-col overflow-hidden
                  rounded-2xl border border-white/10
                  bg-[#111217]"
              >

                {/* Card header */}
                <div className="border-b border-white/10
                  p-5 sm:p-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0
                      items-center justify-center rounded-xl
                      bg-red-500/10 text-xl text-red-400">
                      ✦
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-xl
                        font-extrabold text-white">
                        {review.websiteName || "Untitled Website"}
                      </h2>

                      <p className="mt-2 break-all text-sm
                        text-cyan-400">
                        {review.websiteUrl || "No URL provided"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Review content */}
                <div className="flex-1 p-5 sm:p-6">

                  <p className="mb-3 text-xs font-bold
                    uppercase tracking-[0.2em] text-gray-500">
                    Generated Feedback
                  </p>

                  <div className="max-h-72 overflow-y-auto
                    rounded-xl border border-white/5
                    bg-[#0b0c10] p-4">

                    <pre className="whitespace-pre-wrap
                      break-words font-sans text-sm
                      leading-7 text-gray-300">
                      {review.generatedReview ||
                        "No review content available."}
                    </pre>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3
                  border-t border-white/10 p-5 sm:px-6">

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(review.generatedReview)
                    }
                    className="rounded-lg border
                      border-cyan-400/30 bg-cyan-400/10
                      px-4 py-2.5 text-sm font-semibold
                      text-cyan-300 hover:bg-cyan-400/20"
                  >
                    Copy Review
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePDF(review)}
                    className="rounded-lg border
                      border-green-400/30 bg-green-400/10
                      px-4 py-2.5 text-sm font-semibold
                      text-green-300 hover:bg-green-400/20"
                  >
                    Download PDF
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === review._id}
                    onClick={() => handleDelete(review._id)}
                    className="ml-auto rounded-lg border
                      border-red-400/30 bg-red-500/10
                      px-4 py-2.5 text-sm font-semibold
                      text-red-300 hover:bg-red-500/20
                      disabled:cursor-not-allowed
                      disabled:opacity-50"
                  >
                    {deletingId === review._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10
          pt-6 text-center text-xs text-gray-600">
          AI Reviewer · Your feedback, organized.
        </footer>

      </section>
    </main>
  );
}

export default History;
