import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface SpecialProduct {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  image_url: string;
  description?: string;
  quantity: number;
}

const LIMIT = 8; // products per page

const SpecialOffersPage = () => {
  const [products, setProducts] = useState<SpecialProduct[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setUserLoaded(true);
    };
    fetchUser();
  }, []);

  // Redirect when user is loaded but not logged in
  useEffect(() => {
    if (!userLoaded) return;
    if (!user) navigate("/login");
  }, [userLoaded, user, navigate]);

  // Fetch products from database
  const fetchProducts = async () => {
    setLoading(true);

    const start = page * LIMIT;
    const end = start + LIMIT - 1;

    const { data, error } = await supabase
      .from("special_offer")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);

    if (!error && data) {
      setProducts((prev) => [...prev, ...data]);
      if (data.length < LIMIT) setHasMore(false);
    }

    setLoading(false);
  };

  // Fetch when page updates
  useEffect(() => {
    if (user) fetchProducts();
  }, [page, user]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (bottomReached && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // If user is still loading, don't show page
  if (!userLoaded) return null;

  // If user is not logged in (redirect will handle it)
  if (!user) return null;

  return (
    <>
      <Header />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Special
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
                Offers
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Grab our exclusive special offer products today!
            </p>
          </div>

          {/* Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {products.length === 0 && !loading ? (
              <p className="col-span-full text-center text-muted-foreground">
                No special offers available yet.
              </p>
            ) : (
              products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    originalPrice={product.price}
                    price={product.discounted_price}
                    image={product.image_url}
                    category={product.description || ""}
                    maxQuantity={product.quantity}
                  />

                  {/* View Button */}
                  <div className="mt-2 flex justify-end">
                    <Link to={`/products/${product.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-muted-foreground mb-4">
              Loading...
            </p>
          )}

          {/* No More Products */}
          {!hasMore && !loading && (
            <p className="text-center text-muted-foreground">
              No more products.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SpecialOffersPage;
