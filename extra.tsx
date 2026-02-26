import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BulkOrderForm from "@/components/BulkOrderForm";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://mitrro-backend-mongodb.onrender.com";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, refresh } = useCart();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkProductId, setBulkProductId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    phone: "",
    other: "",
    paymentMethod: "COD",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrderCOD = async () => {
    const user = localStorage.getItem("user");

    /* ✅ BLOCK PLACE ORDER WITHOUT LOGIN */
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login before placing order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      await refresh();

      if (items.length === 0) {
        toast({
          title: "Cart is empty",
          description: "Please add products before placing order",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      console.log(BACKEND_URL);
      const res = await fetch(`https://mitrro-backend-mongodb.onrender.com/api/orders/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          shippingDetails: {
            address1: formData.address1,
            address2: "noorein",
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
            phone: formData.phone,
            other: formData.other,
          },
          paymentMethod: "COD",
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (!data.success)

        throw new Error(data.message || "Failed to place order");

      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully.",
      });

      await refresh();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrderCOD();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Your cart is empty</CardTitle>
              <CardDescription>
                Add products before checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ORDER SUMMARY */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-3 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBulkProductId(item.id)}
                    >
                      Bulk Order
                    </Button>

                    {bulkProductId === item.id && (
                      <BulkOrderForm
                        productId={item.id}
                        productName={item.name}
                        onClose={() => setBulkProductId(null)}
                      />
                    )}
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SHIPPING & PAYMENT */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Payment Information</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Label>Full Name *</Label>
                <Input name="customerName" required onChange={handleInputChange} />

                <Label>Email *</Label>
                <Input name="customerEmail" type="email" required onChange={handleInputChange} />

                <Label>Phone *</Label>
                <Input name="phone" required onChange={handleInputChange} />

                <Label>Address Line 1 *</Label>
                <Input name="address1" required onChange={handleInputChange} />

                <Label>City *</Label>
                <Input name="city" required onChange={handleInputChange} />

                <Label>State *</Label>
                <Input name="state" required onChange={handleInputChange} />

                <Label>Pincode *</Label>
                <Input name="pincode" required onChange={handleInputChange} />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
