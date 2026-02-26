import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    fetch(`${BACKEND_URL}/api/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products found</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id}>
                <CardContent className="p-4 space-y-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded"
                  />

                  <h3 className="font-semibold">{product.name}</h3>

                  <p className="font-bold text-lg">
                    ₹{product.price}
                  </p>

                  <Link to={`/products/${product._id}`}>
                    <Button className="w-full">
                      View Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;