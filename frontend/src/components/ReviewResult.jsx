import jsPDF from "jspdf";

function ReviewResult({
  review
}) {

  const copyReview = () => {

    navigator.clipboard.writeText(
      review
    );

    alert(
      "Copied Successfully"
    );

  };

  const downloadPDF = () => {

    const doc =
      new jsPDF();

    doc.text(
      review,
      10,
      10
    );

    doc.save(
      "AI-Review.pdf"
    );

  };

  return (

    <div
      className="
      mt-10
      bg-[#111]
      p-8
      rounded-2xl
      border
      border-green-500/20
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        text-green-400
        mb-5
        "
      >
        Generated Review
      </h2>

      <pre
        className="
        whitespace-pre-wrap
        leading-8
        text-gray-300
        "
      >
        {review}
      </pre>

      <div className="flex gap-4 mt-6">

        <button
          onClick={copyReview}
          className="
          bg-cyan-500
          text-black
          px-5
          py-2
          rounded-lg
          "
        >
          Copy
        </button>

        <button
          onClick={downloadPDF}
          className="
          bg-red-500
          px-5
          py-2
          rounded-lg
          "
        >
          Download PDF
        </button>

      </div>

    </div>

  );
}

export default ReviewResult;