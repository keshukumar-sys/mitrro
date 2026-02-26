import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Wishlist() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const navigate = useNavigate();

  // 1. Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    getUser();
  }, []);

  // 2. Fetch wishlist items
  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("wishlist")
        .select("id, product_id, products(*)")
        .eq("user_id", userId);

      if (!error) setItems(data || []);
      setLoading(false);
    };

    fetchWishlist();
  }, [userId]);

  // 3. Remove from wishlist
  const handleRemove = async (wishlistId: string) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", wishlistId);

    if (!error) {
      setItems((prev) => prev.filter((item) => item.id !== wishlistId));
    }
  };

  // 4. Fetch recommended products (8 different categories)
  useEffect(() => {
    const fetchRecommended = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        // Get one product per category
        const uniqueCategories: { [key: string]: any } = {};
        for (const product of data) {
          if (
            !uniqueCategories[product.category] &&
            Object.keys(uniqueCategories).length < 8
          ) {
            uniqueCategories[product.category] = product;
          }
        }
        setRecommended(Object.values(uniqueCategories));
      }
    };
    fetchRecommended();
  }, []);

  // Helper for discount
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow px-4 md:px-16 py-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          My Wishlist
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading wishlist...</p>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">
              Your wishlist is empty. Start adding products you love!
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Wishlist Grid */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {items.map((item) => {
              const product = item.products;
              const discount = calculateDiscount(
                product.price,
                product.original_price
              );

              return (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-60 object-cover"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                    >
                      <X size={18} className="text-gray-700" />
                    </button>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        -{discount}%
                      </Badge>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between h-52">
                    <div>
                      <h2 className="font-semibold text-lg line-clamp-2">
                        {product.name}
                      </h2>
                      <p className="font-semibold text-small line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {discount > 0 && (
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.original_price}
                          </span>
                        )}
                        <span className="text-primary font-bold text-lg">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-center hover:bg-primary/90 transition"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recommended Products */}
        {recommended.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-secondary">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recommended.map((product, i) => {
                const discount = calculateDiscount(
                  product.price,
                  product.original_price
                );

                return (
                  <div
                    key={i}
                    className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/categories`)}
                  >
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                      />

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          -{discount}%
                        </Badge>
                      )}

                      {/* Category Badge */}
                      {product.category && (
                        <Badge className="absolute top-3 right-3 bg-primary text-white">
                          {product.category}
                        </Badge>
                      )}
                    </div>

                    <div className="p-4 flex flex-col justify-between h-52">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="font-semibold text-small line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {discount > 0 && (
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.original_price}
                          </span>
                        )}
                        <span className="text-primary font-bold text-lg">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
