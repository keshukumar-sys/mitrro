import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/* ================= TYPES ================= */

interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  images?: { url: string }[];
  category: string;
}

interface ProductsResponse {
  products: BackendProduct[];
}

/* ================= COMPONENT ================= */

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  /* ================= FETCH FROM BACKEND ================= */

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);

        const res = await axios.get<ProductsResponse>(
          `${BACKEND_URL}/api/products`
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

  /* ================= SEARCH FILTER ================= */

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description &&
        product.description.toLowerCase().includes(term))
    );
  });

  /* ================= GROUP BY CATEGORY ================= */

  const productsByCategory = filteredProducts.reduce<
    Record<string, BackendProduct[]>
  >((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  /* ================= HANDLE VIEW CLICK ================= */
  const handleViewProduct = (productId: string) => {
    // Scroll to top before navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",   // Use "instant" so it doesn't animate during navigation
    });

    // Navigate to product page
    navigate(`/products/${productId}`);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Product
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ml-2">
              Categories
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse products organized category-wise from our backend system
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Sections */}
        {loading ? (
          <p className="text-center text-muted-foreground py-12">
            Loading products...
          </p>
        ) : Object.keys(productsByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found.
            </p>
          </div>
        ) : (
          Object.entries(productsByCategory).map(([category, items]) => (
            <section key={category} className="mb-14">
              <h2 className="text-2xl font-semibold mb-6">
                {category}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <Card
                    key={product._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
                  >
                    <img
                      src={product.images?.[0]?.url ?? "/placeholder.png"}
                      alt={product.name}
                      className="h-36 w-full object-cover rounded-t-lg"
                    />

                    <CardContent className="p-4 flex flex-col flex-1">
                      <div className="mb-3">
                        <CardTitle className="text-sm font-semibold mb-1">
                          {product.name}
                        </CardTitle>
                        {product.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {product.discountedPrice ? (
                          <div className="flex flex-col">
                            <span className="text-indigo-600 font-semibold text-sm">
                              ₹{product.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-xs line-through text-muted-foreground">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-indigo-600 font-semibold text-sm">
                            ₹{product.price.toLocaleString()}
                          </span>
                        )}

                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
                          onClick={() => handleViewProduct(product._id)}   // ← Fixed here
                        >
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Categories;