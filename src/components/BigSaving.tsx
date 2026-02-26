import ProductCard from "./ProductCard";
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

        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0, 5);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            Big
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              Savings
            </span>
          </h2>

          <Link
            to="/products"
            className="flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visibleProducts.map(product => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.images?.[0]?.url || "/placeholder.png"}
                maxQuantity={product.stock}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;