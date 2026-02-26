import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Review {
  id: string;
  name: string;
  review: string;
  created_at: string;
}

export default function ReviewDetailPage() {
  const { id } = useParams(); // review id from URL
  console.log(id);
  const navigate = useNavigate();

  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch current review + all other reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("custome_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      console.log(data);

      if (!error && data) {
        const current = data.find((r) => r.id == id) || null;
        const others = data.filter((r) => r.id !== id);
        setCurrentReview(current);
        setOtherReviews(others);
      }

      setLoading(false);
    };

    fetchReviews();
  }, [id]);

  // Handle new review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data, error } = await supabase
      .from("custome_reviews")
      .insert([{ name, review: reviewText }]);

    if (!error && data) {
      setOtherReviews((prev) => [data[0], ...prev]);
      setName("");
      setReviewText("");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow px-4 md:px-16 py-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading review...</p>
        ) : (
          <>
            {/* Current Highlighted Review */}
            {currentReview ? (
              <div className="bg-white shadow-lg rounded-xl p-8 mb-12 border-2 border-primary">
                <h2 className="text-2xl font-bold mb-2">{currentReview.name}</h2>
                <p className="text-gray-700 mb-2">{currentReview.review}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(currentReview.created_at).toLocaleDateString()}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  onClick={() => navigate("/reviews/1")}
                >
                  Back to All Reviews
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500">Review not found.</p>
            )}

            {/* Other Reviews */}
            <section className="mb-16">
              <h3 className="text-xl font-semibold mb-4">Other Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white shadow-md rounded-xl p-4 transition hover:shadow-xl cursor-pointer"
                    onClick={() => navigate(`/reviews/${review.id}`)}
                  >
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-gray-600">{review.review}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit New Review Form */}
            <section className="mb-16">
              <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Your Review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white rounded-lg py-2 hover:bg-primary/90 transition"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
