import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BulkCheckout = () => {
  const { quotationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quotation, setQuotation] = useState<any>(null);

  const [shipping, setShipping] = useState({
    customerName: "",
    customerEmail: "",
    address1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/bulk-quotations/${quotationId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setQuotation(data.quotation));
  }, [quotationId]);

  const handlePlaceOrder = async () => {
    const res = await fetch(
      `${BACKEND_URL}/api/bulk-orders/checkout/${quotationId}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingDetails: shipping }),
      }
    );

    if (res.ok) {
      toast({ title: "Bulk Order Placed Successfully" });
      navigate("/");
    }
  };

  if (!quotation || quotation.status !== "approved") {
    return <div className="p-10">Quotation not approved</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Bulk Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Product:</strong> {quotation.productId?.name}</p>
              <p><strong>Quantity:</strong> {quotation.maxQuantity}</p>
              <p className="text-xl font-bold">
                ₹{quotation.finalPrice}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label>Full Name</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, customerName: e.target.value })
              } />

              <Label>Email</Label>
              <Input type="email" onChange={(e) =>
                setShipping({ ...shipping, customerEmail: e.target.value })
              } />

              <Label>Phone</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              } />

              <Label>Address</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, address1: e.target.value })
              } />

              <Label>City</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, city: e.target.value })
              } />

              <Label>State</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, state: e.target.value })
              } />

              <Label>Pincode</Label>
              <Input onChange={(e) =>
                setShipping({ ...shipping, pincode: e.target.value })
              } />

              <Button
                className="w-full bg-orange-600 text-white"
                onClick={handlePlaceOrder}
              >
                Place Bulk Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BulkCheckout;