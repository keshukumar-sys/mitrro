import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Category {
  _id: string;
  categoryTitle: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: { url: string }[];
  stock: number;
}

export default function CategoryProducts() {
  const [categoryProducts, setCategoryProducts] = useState<
    { category: string; products: Product[] }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // fetch categories
        const categoryRes = await axios.get(
          `${BACKEND_URL}/api/categories/categories`
        );

        const categories = categoryRes.data.categories || [];

        const results = await Promise.all(
          categories.map(async (cat: Category) => {
            const productRes = await axios.get(
              `${BACKEND_URL}/api/products?category=${encodeURIComponent(
                cat.categoryTitle
              )}`
            );

            const products = productRes.data.products || [];

            return {
              category: cat.categoryTitle,
              products: products.slice(0, 5),
            };
          })
        );

        setCategoryProducts(results);
      } catch (error) {
        console.error("Failed to fetch category products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="space-y-16">
      {categoryProducts.map((section) => (
        <section key={section.category} className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{section.category}</h2>

              <Link
                to={`/products?category=${encodeURIComponent(
                  section.category
                )}`}
                className="flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {section.products.map((product) => (
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
          </div>
        </section>
      ))}
    </div>
  );
}