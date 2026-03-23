import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendProduct } from "@/types/product";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BigSavings = () => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/products?category=Big Savings`
        );

        let categoryProducts: BackendProduct[] =
          res.data.products || res.data || [];

        // remove products without images
        categoryProducts = categoryProducts.filter(
          (p) => p.images && p.images.length > 0
        );

        // show only first 5
        setProducts(categoryProducts.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch Big Savings products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-8 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            Big
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              Savings
            </span>
          </h2>

          <Link
            to="/products?category=Big Savings"
            className="flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  discountedPrice={product.discountedPrice}   // ✅ FIX ADDED
                  image={product.images?.[0]?.url || "/placeholder.png"}
                  maxQuantity={product.stock}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default BigSavings;