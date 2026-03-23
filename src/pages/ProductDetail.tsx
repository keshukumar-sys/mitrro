import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;



interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description?: string;
  images?: { url: string }[];
  stock: number;
  isSpecial?: boolean;
}

interface ProductResponse {
  product: BackendProduct;
}


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProductFromBackend = async (): Promise<void> => {
      try {
        if (!id) return;

        setLoading(true);

        const res = await axios.get<ProductResponse>(
          `${BACKEND_URL}/api/products/${id}`
        );

        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductFromBackend();
  }, [id]);



  const handleAddToCart = (): void => {
    if (!product) return;
     const finalPrice = product.discountedPrice ?? product.price;

    addItem(product._id, selectedQuantity);
    toast({
      title: "Added to Cart",
      description: `${selectedQuantity} × ${product.name} added to your cart.`,
    });
  };
  const discount =
    product?.discountedPrice && product?.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images?.[0]?.url ?? "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {product.isSpecial && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Special Offer
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              {product.discountedPrice ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="line-through text-muted-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
            )}

            <Badge
              className="w-fit mb-6"
              variant={product.stock > 0 ? "default" : "destructive"}
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </Badge>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                }
              >
                -
              </Button>

              <span className="font-semibold w-8 text-center">
                {selectedQuantity}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedQuantity(
                    Math.min(product.stock, selectedQuantity + 1)
                  )
                }
                disabled={selectedQuantity >= product.stock}
              >
                +
              </Button>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
