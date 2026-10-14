
import jsPDF from "jspdf";

function ReviewResult({ review }) {
  const copyReview = async () => {
    try {
      await navigator.clipboard.writeText(review || "");
      alert("Review copied successfully!");
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Unable to copy review. Please try again.");
    }
  };

  const downloadPDF = () => {
    if (!review?.trim()) {
      alert("No review available to download.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 7;

    // PDF Header
    doc.setFillColor(15, 16, 22);
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(239, 68, 68);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AI Reviewer", margin, 16);

    doc.setTextColor(103, 232, 249);
    doc.setFontSize(10);
    doc.text("GENERATED WEBSITE REVIEW", margin, 25);

    // Review content
    doc.setTextColor(45, 45, 55);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(review, maxWidth);
    let y = 45;

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Page numbers
    const pageCount = doc.internal.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 130);
      doc.text(
        `Page ${page} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 8,
        { align: "right" }
      );
    }

    doc.save("AI-Review.pdf");
  };

  if (!review?.trim()) {
    return null;
  }

  return (
    <section className="mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111218] text-white shadow-xl shadow-black/20">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-cyan-400/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-semibold text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Review Generated
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Generated <span className="text-red-400">Review</span>
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Your AI-generated website analysis is ready.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl text-cyan-300">
          ✦
        </div>
      </div>

      {/* Review Content */}
      <div className="p-5 sm:p-7">
        <div className="max-h-[600px] overflow-y-auto rounded-xl border border-white/10 bg-[#191a22] p-5 sm:p-6">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
            {review}
          </pre>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={copyReview}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3.5 text-sm font-bold text-cyan-300 hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>▣</span>
            Copy Review
          </button>

          <button
            type="button"
            onClick={downloadPDF}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3.5 text-sm font-bold text-white hover:from-red-500 hover:to-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <span>↓</span>
            Download PDF
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Copy your analysis or save it as a PDF for future reference.
        </p>
      </div>
    </section>
  );
}

export default ReviewResult;
