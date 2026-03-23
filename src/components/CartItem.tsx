import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    maxQuantity?: number;
  };
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const { increment, decrement, removeItem } = useCart();
  const isMinusDisabled = item.quantity <= 1;
  const isPlusDisabled = item.maxQuantity ? item.quantity >= item.maxQuantity : false;
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
      {item.originalPrice && item.originalPrice > item.price ? (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-primary">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <span className="text-xs line-through text-muted-foreground">
                    ₹{item.originalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  ₹{item.price.toFixed(2)}
                </p>
              )}

      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => decrement(item.id)}
          disabled={isMinusDisabled}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => increment(item.id)}
          disabled={isPlusDisabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={() => removeItem(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
export default CartItemComponent;