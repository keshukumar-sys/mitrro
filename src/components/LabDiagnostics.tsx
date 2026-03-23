import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendProduct } from "@/types/product";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LabDiagnostics = () => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabProducts = async () => {
      try {

        const categoryRes = await axios.get(
          `${BACKEND_URL}/api/products?category=Lab-Diagnostics`
        );

        let categoryProducts: BackendProduct[] =
          categoryRes.data.products || categoryRes.data || [];

        categoryProducts = categoryProducts.filter(
          (p) => p.images && p.images.length > 0
        );

        setProducts(categoryProducts.slice(0, 5));

      } catch (error) {
        console.error("Failed to fetch Lab & Diagnostics products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabProducts();
  }, []);

  return (
    <section className="py-8 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            Lab &
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              Diagnostics
            </span>
          </h2>

          <Link
            to="/products?category=Lab & Diagnostics"
            className="flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                discountedPrice={product.discountedPrice}
                image={product.images[0].url}
                maxQuantity={product.stock}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default LabDiagnostics;