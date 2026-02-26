import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  maxQuantity: number;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  maxQuantity,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  // Calculate discount
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <Card className="group overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
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
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>

        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-lg font-bold">
          {discount > 0 ? (
            <>
              <span className="text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
              <span className="text-primary">₹{price}</span>
            </>
          ) : (
            <span className="text-primary">₹{price}</span>
          )}
        </div>

        <AddToCartButton
          product={{
            id,
            name,
            price,
            image,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
