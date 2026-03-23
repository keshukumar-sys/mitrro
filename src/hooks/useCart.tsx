// hooks/useCart.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  increment: (id: string) => Promise<void>;
  decrement: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;          // ← added here
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://mitrro-backend-mongodb.onrender.com";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/cart`, {
        credentials: "include",
      });
      console.log(res);
      if (!res.ok) {
        if (res.status === 401) {
          // optional: user is not logged in → clear local cart
          setItems([]);
          setTotalItems(0);
          setTotalPrice(0);
          return;
        }
        throw new Error(`Cart fetch failed: ${res.status}`);
      }

      const data = await res.json();
      const cart = data.cart;

      if (!cart || !cart.items) {
        setItems([]);
        setTotalItems(0);
        setTotalPrice(0);
        return;
      }

      const mapped: CartItem[] = cart.items.map((i: any) => ({
        id: i.productId?._id || i.productId,
        name: i.productId?.name || "Unknown Product",
        price: i.productId?.discountedPrice || i.productId?.price || 0,
        originalPrice: i.productId?.price ?? 0,
        image: i.productId?.images?.[0]?.url || "",
        quantity: i.quantity || 1,
        maxQuantity: i.productId?.stock,
      }));

      setItems(mapped);
      setTotalItems(mapped.reduce((sum, item) => sum + item.quantity, 0));
      setTotalPrice(
        mapped.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );
    } catch (err) {
      console.error("Failed to load cart:", err);
      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
    }
  };

  // This is the function Checkout is looking for
  const refresh = fetchCart;

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (productId: string, quantity = 1) => {
    try {
      await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      await refresh();
    } catch (err) {
      console.error("Add item failed:", err);
    }
  };

  const increment = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/cart/updateQuantity`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "increment" }),
      });
      await refresh();
    } catch (err) {
      console.error("Increment failed:", err);
    }
  };

  const decrement = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/cart/updateQuantity`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "decrement" }),
      });
      await refresh();
    } catch (err) {
      console.error("Decrement failed:", err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/cart/remove/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await refresh();
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });
      await refresh();
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        increment,
        decrement,
        removeItem,
        clearCart,
        refresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};