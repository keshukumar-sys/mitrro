import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

interface BulkOrderFormProps {
  productId: string;
  productName: string;
  onClose: () => void;
}

const BulkOrderForm = ({
  productId,
  productName,
  onClose,
}: BulkOrderFormProps) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    minQuantity: "",
    maxQuantity: "",
    additionalDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${BACKEND_URL}/api/bulk-quotations/create/${productId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            minQuantity: Number(formData.minQuantity),
            maxQuantity: Number(formData.maxQuantity),
            additionalDetails: formData.additionalDetails,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Bulk Request Submitted",
        description: "Our team will contact you soon.",
      });

      onClose();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-5 mt-4 bg-muted/20">
      <h3 className="text-lg font-semibold mb-4">
        Bulk Order - {productName}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Minimum Quantity</Label>
          <Input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Maximum Quantity</Label>
          <Input
            type="number"
            name="maxQuantity"
            value={formData.maxQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Additional Details</Label>
          <Input
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </div>

       
        <Button
          type="submit"
          className="w-full bg-orange-500 text-white text-lg font-semibold py-4 hover:bg-orange-600"
        >
          {loading ? "Submitting..." : "Submit Bulk Request"}
        </Button>

        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default BulkOrderForm;
