import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendProduct } from "@/types/product";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FeaturedProducts = () => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/products/total_products`
        );

        // Safe fallback for backend response shape
        setProducts(res.data.products || res.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* ===== Section Header ===== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              Products
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore state-of-the-art medical devices loved worldwide.
          </p>
        </div>

        {/* ===== Products Grid ===== */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No products available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                  image={product.images?.[0]?.url || "/placeholder.png"}
                  maxQuantity={product.stock}
                />
              </div>
            ))}
          </div>
        )}

        {/* ===== View All Button ===== */}
        <div className="text-center mt-10">
          <Link to="/products">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
