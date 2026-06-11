import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";

function History() {

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchReviews =
    async () => {

    try {

      const res =
        await api.get(
          "/reviews"
        );

      setReviews(
        res.data.reviews
      );

    } catch (error) {

      console.log(
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchReviews();

  }, []);

  const handleDelete =
    async (id) => {

    try {

      await api.delete(
        `/reviews/${id}`
      );

      setReviews(
        reviews.filter(
          (item) =>
          item._id !== id
        )
      );

    } catch (error) {

      alert(
        "Delete Failed"
      );

    }
  };

  const handleCopy =
    (text) => {

    navigator.clipboard.writeText(
      text
    );

    alert(
      "Review Copied"
    );

  };

  const handlePDF =
    (review) => {

    const doc =
      new jsPDF();

    doc.text(
      review.generatedReview,
      10,
      10
    );

    doc.save(
      `${review.websiteName}.pdf`
    );
  };

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex justify-center items-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">

        Review History

      </h1>

      {

        reviews.length === 0 ?

        (

          <h2>
            No Reviews Found
          </h2>

        )

        :

        (

          <div className="space-y-8">

            {

              reviews.map(
                (review) => (

                <div
                  key={review._id}
                  className="bg-[#111] p-6 rounded-2xl border border-cyan-500/20"
                >

                  <h2 className="text-2xl font-bold text-red-400">

                    {
                      review.websiteName
                    }

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      review.websiteUrl
                    }

                  </p>

                  <pre className="whitespace-pre-wrap mt-5 text-gray-300">

                    {
                      review.generatedReview
                    }

                  </pre>

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        handleCopy(
                          review.generatedReview
                        )
                      }
                      className="bg-cyan-500 text-black px-5 py-2 rounded-lg"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        handlePDF(
                          review
                        )
                      }
                      className="bg-green-500 text-black px-5 py-2 rounded-lg"
                    >
                      PDF
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          review._id
                        )
                      }
                      className="bg-red-500 px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default History;