import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";


interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountedPrice?: number;
    image: string;
  };
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

const AddToCartButton = ({
  product,
  variant = "default",
  size = "default",
}: AddToCartButtonProps) => {
  const { toast } = useToast();
  const { refresh } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async () => {
    const user = localStorage.getItem("user");

    /* ✅ LOGIN CHECK */
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });

      
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      const res = await fetch("https://mitrro-backend-mongodb.onrender.com/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      await refresh();

      toast({
        title: "Added to Cart",
        description: `${product.name} added successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      className="w-full"
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
