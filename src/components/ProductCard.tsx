import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  category?: string;
  maxQuantity: number;
}

const ProductCard = ({
  id,
  name,
  price,
  discountedPrice,
  image,
  category,
  maxQuantity,
}: ProductCardProps) => {
  const discount =
    discountedPrice && price
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;

  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Get logged-in user
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserId(user.id || null);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
  }, []);

  const handleViewProduct = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Navigate to product page
    navigate(`/products/${id}`);

    // Force scroll to top immediately after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'   // 'instant' prevents any sliding animation from bottom
      });
    }, 10);
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={handleViewProduct}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}

        {category && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {category}
          </Badge>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full hover:scale-110 transition-transform"
            onClick={handleViewProduct}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <h3
          className="font-semibold text-base leading-snug h-[2.75rem] overflow-hidden cursor-pointer group-hover:text-primary transition-colors"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          onClick={handleViewProduct}
          title={name}
        >
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-2 mb-3 text-base font-bold">
          {discountedPrice ? (
            <>
              <span className="text-primary">
                ₹{discountedPrice}
              </span>
              <span className="text-muted-foreground line-through text-xs">
                ₹{price}
              </span>
            </>
          ) : (
            <span className="text-primary">₹{price}</span>
          )}
        </div>

        <div className="mt-auto">
          <AddToCartButton
            product={{
              id,
              name,
              price,
              image,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;