import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/* ================= TYPES ================= */

interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images?: { url: string }[];
  description?: string;
  stock: number;
}

interface ProductsResponse {
  products: BackendProduct[];
}

/* ================= COMPONENT ================= */

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category") || "";

  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  /* ================= FETCH FROM BACKEND ================= */

  useEffect(() => {
    const fetchProductsFromBackend = async (): Promise<void> => {
      try {
        setLoading(true);

        const res = await axios.get<ProductsResponse>(
          `${BACKEND_URL}/api/products`
        );

        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products from backend", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromBackend();
  }, []);

  /* ================= SEARCH FILTER ================= */

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description &&
        product.description.toLowerCase().includes(term))
    );
  });

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            {categoryName || "All Products"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {categoryName
              ? `Browse ${categoryName} products`
              : "Browse all medical products and equipment"}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-muted-foreground py-12">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                {searchTerm
                  ? "No products found matching your search."
                  : "No products available yet."}
              </p>
              {!searchTerm && (
                <p className="text-sm text-muted-foreground">
                  Products will appear once added from backend.
                </p>
              )}
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.discountedPrice ?? product.price}
                  discountedPrice={product.price}

                  image={product.images?.[0]?.url ?? "/placeholder.png"}
                  maxQuantity={product.stock}
                />
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
