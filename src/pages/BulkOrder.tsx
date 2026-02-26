import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Package } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BulkOrder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [quotations, setQuotations] = useState<any[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [form, setForm] = useState({
    minQuantity: "",
    maxQuantity: "",
    additionalDetails: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchQuotations = () => {
    fetch(`${BACKEND_URL}/api/bulk-quotations/my-quotations`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuotations(data.quotations || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const res = await fetch(
      `${BACKEND_URL}/api/bulk-quotations/${selectedQuotation._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minQuantity: Number(form.minQuantity),
          maxQuantity: Number(form.maxQuantity),
          additionalDetails: form.additionalDetails,
        }),
      }
    );

    if (res.ok) {
      toast({ title: "Updated successfully" });
      setSelectedQuotation(null);
      fetchQuotations();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this request?")) return;

    const res = await fetch(
      `${BACKEND_URL}/api/bulk-quotations/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) {
      toast({ title: "Request deleted" });
      fetchQuotations();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Bulk Requests</h1>
            <p className="text-gray-600">
              Track all your bulk quotation requests
            </p>
          </div>

          <Button
            onClick={() => navigate("/products")}
            className="bg-orange-600"
          >
            + New Bulk Request
          </Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : quotations.length === 0 ? (
          <Card className="p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">
              You haven't placed any bulk requests yet
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotations.map((q) => (
              <Card key={q._id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{q.productId?.name}</CardTitle>
                    <Badge>
                      {q.status?.toUpperCase() || "PENDING"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p>Min Qty: {q.minQuantity}</p>
                  <p>Max Qty: {q.maxQuantity}</p>

                  {q.finalPrice && (
                    <p className="font-bold text-lg">
                      Final Price: ₹{q.finalPrice}
                    </p>
                  )}

                  <div className="flex gap-3 pt-4 border-t flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedQuotation(q);
                        setForm({
                          minQuantity: q.minQuantity,
                          maxQuantity: q.maxQuantity,
                          additionalDetails:
                            q.additionalDetails || "",
                        });
                      }}
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(q._id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>

                    {q.status === "approved" && (
                      <Button
                        size="sm"
                        className="bg-orange-600 text-white"
                        onClick={() =>
                          navigate(`/bulk-checkout/${q._id}`)
                        }
                      >
                        Proceed to Checkout
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Edit Modal */}
      <Dialog
        open={!!selectedQuotation}
        onOpenChange={() => setSelectedQuotation(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bulk Request</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <Label>Min Quantity</Label>
            <Input
              type="number"
              value={form.minQuantity}
              onChange={(e) =>
                setForm({ ...form, minQuantity: e.target.value })
              }
              required
            />

            <Label>Max Quantity</Label>
            <Input
              type="number"
              value={form.maxQuantity}
              onChange={(e) =>
                setForm({ ...form, maxQuantity: e.target.value })
              }
              required
            />

            <Label>Additional Details</Label>
            <Textarea
              value={form.additionalDetails}
              onChange={(e) =>
                setForm({
                  ...form,
                  additionalDetails: e.target.value,
                })
              }
            />

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkOrder;