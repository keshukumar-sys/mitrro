import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

interface Review {
  id: string;
  name: string;
  review: string;
  created_at: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("custome_reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        // Pick 3 random reviews
        const shuffled = data.sort(() => 0.5 - Math.random());
        setReviews(shuffled.slice(0, 3));
      }

      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow px-4 md:px-16 py-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          Customer Reviews
        </h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {!loading && reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-600">{review.review}</p>
              <p className="mt-2 text-sm text-gray-400">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
