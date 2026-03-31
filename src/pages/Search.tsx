import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search as SearchIcon, PackageSearch } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images?: { url: string }[];
  description?: string;
  stock: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BACKEND_URL}/api/products?search=${encodeURIComponent(query)}`
        );
        const all: BackendProduct[] = res.data.products || res.data || [];
        // Filter to products that actually match the search term (client-side fallback)
        const term = query.toLowerCase();
        const matched = all.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            (p.description && p.description.toLowerCase().includes(term))
        );
        setProducts(matched);
      } catch (err) {
        console.error("Search failed", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <SearchIcon className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">
              {query ? `Search Results for "${query}"` : "Search Products"}
            </h1>
          </div>
          {!loading && query && (
            <p className="text-muted-foreground text-sm ml-10">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          /* ── Professional "No Results" State ── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <PackageSearch className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground max-w-md mb-2">
              {query
                ? `We couldn't find any products matching "${query}". Please try a different search term or browse our categories.`
                : "Enter a product name in the search bar above to find what you're looking for."}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Suggestions:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>Check your spelling and try again</li>
                <li>Use more general keywords</li>
                <li>Browse by category from the navigation menu</li>
              </ul>
            </div>
          </div>
        ) : (
          /* ── Product Grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                  image={product.images?.[0]?.url || "/placeholder.png"}
                  maxQuantity={product.stock}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;