// import { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Search,
//   Star,
//   Award,
//   Globe,
//   Calendar,
//   Mail,
//   Building2,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";

// const Brands = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState<any>(null);
//   const [inquiryBrand, setInquiryBrand] = useState<any>(null);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   /* ---------------- BRANDS DATA ---------------- */

//   const brands = [
//     {
//       id: 1,
//       name: "NIPRO",
//       description:
//         "Global manufacturer of dialysis equipment and disposable medical devices.",
//       country: "Japan",
//       established: "1954",
//       rating: 4.7,
//       featured: true,
//       productCount: 156,
//       categories: ["Dialysis", "Syringes", "IV Sets"],
//       about:
//         "NIPRO Corporation specializes in dialysis and artificial organ technology with strong global presence.",
//       products: ["Dialysis Machines", "Syringes", "Infusion Sets"],
//     },
//     {
//       id: 2,
//       name: "ROMSONS",
//       description:
//         "Leading Indian manufacturer of medical disposables and surgical products.",
//       country: "India",
//       established: "1989",
//       rating: 4.3,
//       featured: true,
//       productCount: 180,
//       categories: ["Respiratory Care", "Surgical", "Disposables"],
//       about:
//         "ROMSONS provides high-quality and affordable medical products across India and international markets.",
//       products: ["Face Masks", "Nebulizers", "Catheters"],
//     },
//     {
//       id: 3,
//       name: "Dr. Morepen",
//       description:
//         "Healthcare brand offering diagnostic and home monitoring solutions.",
//       country: "India",
//       established: "1984",
//       rating: 4.5,
//       featured: false,
//       productCount: 95,
//       categories: ["BP Monitors", "Thermometers"],
//       about:
//         "Dr. Morepen focuses on accessible healthcare through innovative diagnostic devices.",
//       products: ["Glucometers", "Thermometers"],
//     },
//   ];

//   const filteredBrands = brands.filter(
//     (b) =>
//       b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   /* ---------------- INQUIRY ---------------- */

//   const submitInquiry = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Inquiry:", { brand: inquiryBrand?.name, ...form });

//     setForm({ name: "", email: "", phone: "", message: "" });
//     setInquiryBrand(null);

//     toast({
//       title: "Inquiry submitted",
//       description: "Your inquiry has been recorded locally.",
//     });
//   };

//   /* ---------------- BRAND CARD ---------------- */

//   const BrandCard = ({ brand }: any) => (
//     <Card className="border border-gray-200 hover:shadow-md transition duration-200">
//       <CardHeader>
//         <div className="flex items-start justify-between">
//           <div className="flex gap-4">
//             <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
//               <Building2 className="h-6 w-6 text-gray-600" />
//             </div>

//             <div>
//               <CardTitle className="text-lg">{brand.name}</CardTitle>

//               <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                 {brand.rating}
//                 <span>•</span>
//                 {brand.country}
//                 <span>• Est. {brand.established}</span>
//               </div>
//             </div>
//           </div>

//           {brand.featured && (
//             <Badge variant="secondary">
//               <Award className="h-3 w-3 mr-1" />
//               Featured
//             </Badge>
//           )}
//         </div>

//         <p className="text-sm text-muted-foreground mt-3">
//           {brand.description}
//         </p>
//       </CardHeader>

//       <CardContent>
//         <div className="flex flex-wrap gap-2 mb-4">
//           {brand.categories.map((c: string, i: number) => (
//             <Badge key={i} variant="outline">
//               {c}
//             </Badge>
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <Button className="flex-1" onClick={() => setInquiryBrand(brand)}>
//             <Mail className="h-4 w-4 mr-2" />
//             Inquiry
//           </Button>

//           <Button variant="outline" onClick={() => setSelectedBrand(brand)}>
//             Details
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   /* ---------------- PAGE ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="container mx-auto px-4 py-10">

//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-semibold mb-2">
//             Healthcare Brands
//           </h1>
//           <p className="text-muted-foreground max-w-2xl">
//             Explore trusted healthcare and medical brands available on Mitrro.
//           </p>
//         </div>

//         {/* SEARCH */}
//         <div className="mb-8 max-w-md relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search brands"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* GRID */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredBrands.map((brand) => (
//             <BrandCard key={brand.id} brand={brand} />
//           ))}
//         </div>

//         {/* ABOUT SECTION */}
//         <section className="mt-16 bg-white border rounded-xl p-8">
//           <h2 className="text-xl font-semibold mb-3">
//             Why Brands Choose Mitrro
//           </h2>
//           <p className="text-muted-foreground leading-relaxed max-w-3xl">
//             Mitrro connects healthcare brands with hospitals, clinics, and
//             distributors across India. Our platform helps manufacturers expand
//             their reach while ensuring buyers get access to trusted and
//             certified products.
//           </p>
//         </section>
//       </main>

//       {/* CTA */}
//       <section className="bg-white border-t py-16 mt-16">
//         <div className="container mx-auto text-center">
//           <h2 className="text-2xl font-semibold mb-3">
//             Partner with Mitrro
//           </h2>
//           <p className="text-muted-foreground mb-6">
//             Expand your brand reach and connect with healthcare buyers across India.
//           </p>
//           <Button onClick={() => navigate("/sale-on-mitrro")}>
//             Become a Partner
//           </Button>
//         </div>
//       </section>

//       {/* INQUIRY DIALOG */}
//       <Dialog open={!!inquiryBrand} onOpenChange={() => setInquiryBrand(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               Product Inquiry — {inquiryBrand?.name}
//             </DialogTitle>
//             <DialogDescription>
//               Submit your inquiry and our team will contact you.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={submitInquiry} className="space-y-4">
//             <div>
//               <Label>Name</Label>
//               <Input
//                 required
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 required
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({ ...form, email: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Phone</Label>
//               <Input
//                 value={form.phone}
//                 onChange={(e) =>
//                   setForm({ ...form, phone: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Message</Label>
//               <Textarea
//                 required
//                 value={form.message}
//                 onChange={(e) =>
//                   setForm({ ...form, message: e.target.value })
//                 }
//               />
//             </div>

//             <Button type="submit" className="w-full">
//               Submit Inquiry
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* BRAND DETAILS DIALOG */}
//       <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{selectedBrand?.name}</DialogTitle>
//             <DialogDescription>
//               {selectedBrand?.description}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6">
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <p className="text-xs text-muted-foreground">Country</p>
//                 <p className="font-medium">{selectedBrand?.country}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-foreground">Established</p>
//                 <p className="font-medium">{selectedBrand?.established}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-foreground">Products</p>
//                 <p className="font-medium">{selectedBrand?.productCount}+</p>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-2">About</h3>
//               <p className="text-sm text-muted-foreground">
//                 {selectedBrand?.about}
//               </p>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-2">Products</h3>
//               <ul className="list-disc list-inside text-sm text-muted-foreground">
//                 {selectedBrand?.products.map((p: string, i: number) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Footer />
//     </div>
//   );
// };

// export default Brands;

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, MapPin, Phone, Building2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3002";

const Brands = () => {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<any[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [inquiryBrand, setInquiryBrand] = useState<any>(null);

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


 
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/users/get-brands`,
          { withCredentials: true }
        );

        if (res.data?.brands) {
          setBrands(res.data.brands);
          setFilteredBrands(res.data.brands);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description:
            error?.response?.data?.message || "Failed to load brands",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

 
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBrands(brands);
      return;
    }

    const term = searchTerm.toLowerCase();

    setFilteredBrands(
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, brands]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent",
      description: `Your inquiry for ${
        inquiryBrand?.name || "the brand"
      } has been noted.`,
    });

    setInquiryForm({ name: "", email: "", phone: "", message: "" });
    setInquiryBrand(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Trusted Healthcare Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover certified medical brands available on Mitrro
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search brands by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg rounded-full shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <Card
              key={brand._id}
              className="overflow-hidden hover:shadow-xl transition-all group"
            >
              <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl font-bold text-blue-600 border">
                    {brand.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  {brand.status && <Badge variant="default">Verified</Badge>}
                </div>

                <CardTitle className="text-2xl mt-4 group-hover:text-blue-600 transition-colors">
                  {brand.name || "Unnamed Brand"}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    {brand.address?.city || "N/A"},{" "}
                    {brand.address?.state || "N/A"},{" "}
                    {brand.address?.country || "India"}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} />
                  <span>{brand.phone || "N/A"}</span>
                </div>

                <div className="pt-4 border-t flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setInquiryBrand(brand)}
                  >
                    Send Inquiry
                  </Button>

                  <Button
                    size="sm"
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBrands.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            No brands available yet
          </div>
        )}

        <div className="mt-20 bg-white rounded-3xl p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Brands Choose Mitrro
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Building2 className="mx-auto text-orange-500 mb-4" size={48} />
              <h3 className="font-semibold text-xl mb-2">
                Nationwide Reach
              </h3>
              <p className="text-gray-600">
                Connect with hospitals & clinics across India
              </p>
            </div>

            <div>
              <Phone className="mx-auto text-orange-500 mb-4" size={48} />
              <h3 className="font-semibold text-xl mb-2">
                Verified Buyers
              </h3>
              <p className="text-gray-600">
                Only licensed medical buyers on the platform
              </p>
            </div>

            <div>
              <Mail className="mx-auto text-orange-500 mb-4" size={48} />
              <h3 className="font-semibold text-xl mb-2">
                Fast Inquiries
              </h3>
              <p className="text-gray-600">
                Get responses within 24 hours
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-3">
            Want to list your brand on Mitrro?
          </h2>
          <p className="text-orange-100 mb-6">
            Join trusted manufacturers today
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10"
              onClick={() => navigate("/sale-on-mitrro")}

          >
            Become a Partner →
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Brands;
