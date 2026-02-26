import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LogOut,
  Mail,
  MessageSquare,
  ShoppingCart,
  Users,
  Building2,
} from "lucide-react";

interface ProductForm {
  name: string;
  price: string;
  discounted_price: string;
  description: string;
  quantity: string;
  image_url: string;
  category: string;
  isSpecial: boolean; // flag for special offers
}

const AdminDashboard = () => {
  const { user, isAdmin, signOut, loading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [contacts, setContacts] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loginLogs, setLoginLogs] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [brandInquiries, setBrandInquiries] = useState<any[]>([]);
  const [businessRegistrations, setBusinessRegistrations] = useState<any[]>([]);
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    price: "",
    discounted_price: "",
    description: "",
    quantity: "",
    image_url: "",
    category: "",
    isSpecial: false,
  });

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  // Fetch all data when admin loads
  useEffect(() => {
    if (user && isAdmin) fetchAllData();
  }, [user, isAdmin]);

  const fetchAllData = async () => {
    try {
      const [
        contactsRes,
        newslettersRes,
        logsRes,
        ordersRes,
        profilesRes,
        brandInquiriesRes,
        businessRegRes,
      ] = await Promise.all([
        supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscriptions").select("*").order("subscribed_at", { ascending: false }),
        supabase.from("login_logs").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("brand_inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("business_registrations").select("*").order("created_at", { ascending: false }),
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (newslettersRes.error) throw newslettersRes.error;
      if (logsRes.error) throw logsRes.error;
      if (ordersRes.error) throw ordersRes.error;
      if (profilesRes.error) throw profilesRes.error;
      if (brandInquiriesRes.error) throw brandInquiriesRes.error;
      if (businessRegRes.error) throw businessRegRes.error;

      setContacts(contactsRes.data || []);
      setNewsletters(newslettersRes.data || []);
      setLoginLogs(logsRes.data || []);
      setOrders(ordersRes.data || []);
      setProfiles(profilesRes.data || []);
      setBrandInquiries(brandInquiriesRes.data || []);
      setBusinessRegistrations(businessRegRes.data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // Create product or special offer
  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (productForm.isSpecial) {
        const { error } = await supabase.from("special_offer").insert([{
          name: productForm.name,
          price: Number(productForm.price),
          discounted_price: Number(productForm.discounted_price),
          description: productForm.description,
          quantity: Number(productForm.quantity),
          image_url: productForm.image_url,
        }]);
        if (error) throw error;
        toast({ title: "Special Offer Created", description: "Special offer successfully added." });
      } else {
        const { error } = await supabase.from("products").insert([{
          name: productForm.name,
          price: Number(productForm.price),
          description: productForm.description,
          quantity: Number(productForm.quantity),
          image_url: productForm.image_url,
          category: productForm.category,
        }]);
        if (error) throw error;
        toast({ title: "Product Created", description: "Product successfully added." });
      }

      // Reset form
      setProductForm({
        name: "",
        price: "",
        discounted_price: "",
        description: "",
        quantity: "",
        image_url: "",
        category: "",
        isSpecial: false,
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{contacts.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Brand Inquiries</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{brandInquiries.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Business Registrations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{businessRegistrations.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{newsletters.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{orders.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">User Profiles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{profiles.length}</div></CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
            <TabsTrigger value="logs">Login Logs</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="create_product">Create Product</TabsTrigger>
          </TabsList>

          {/* ---------- CONTACTS TAB ---------- */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
                <CardDescription>All user inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map(c => (
                      <TableRow key={c.id}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                        <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- BRANDS TAB ---------- */}
          <TabsContent value="brands">
            <Card>
              <CardHeader>
                <CardTitle>Brand Inquiries</CardTitle>
                <CardDescription>All brand inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandInquiries.map(b => (
                      <TableRow key={b.id}>
                        <TableCell>{b.brand_name}</TableCell>
                        <TableCell>{b.customer_name}</TableCell>
                        <TableCell>{b.customer_email}</TableCell>
                        <TableCell>{b.customer_phone || "N/A"}</TableCell>
                        <TableCell className="max-w-xs truncate">{b.inquiry_message}</TableCell>
                        <TableCell className="capitalize">{b.status}</TableCell>
                        <TableCell>{new Date(b.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- BUSINESS TAB ---------- */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Registrations</CardTitle>
                <CardDescription>All business registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Business Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businessRegistrations.map(br => (
                      <TableRow key={br.id}>
                        <TableCell>{br.company_name}</TableCell>
                        <TableCell>{br.contact_person}</TableCell>
                        <TableCell>{br.email}</TableCell>
                        <TableCell>{br.phone}</TableCell>
                        <TableCell className="capitalize">{br.business_type}</TableCell>
                        <TableCell className="capitalize">{br.status}</TableCell>
                        <TableCell>{new Date(br.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- NEWSLETTERS TAB ---------- */}
          <TabsContent value="newsletters">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>All newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsletters.map(n => (
                      <TableRow key={n.id}>
                        <TableCell>{n.email}</TableCell>
                        <TableCell>{new Date(n.subscribed_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- LOGIN LOGS TAB ---------- */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Login Logs</CardTitle>
                <CardDescription>User login/logout history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginLogs.map(l => (
                      <TableRow key={l.id}>
                        <TableCell>{l.email}</TableCell>
                        <TableCell className="capitalize">{l.action}</TableCell>
                        <TableCell>{new Date(l.created_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- ORDERS TAB ---------- */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>All orders with items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell>{order.customer_email}</TableCell>
                        <TableCell className="max-w-xs">
                          <ul className="list-disc list-inside text-sm">
                            {order.order_items.map((item: any) => (
                              <li key={item.id}>{item.product_name} x {item.quantity} (${item.price})</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>${order.total_amount}</TableCell>
                        <TableCell className="capitalize">{order.status}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <select
                            value={order.status}
                            className="border rounded p-1"
                            onChange={async e => {
                              const newStatus = e.target.value;
                              const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", order.id);
                              if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
                              else {
                                toast({ title: "Success", description: "Order status updated" });
                                setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                              }
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- PROFILES TAB ---------- */}
          <TabsContent value="profiles">
            <Card>
              <CardHeader>
                <CardTitle>User Profiles</CardTitle>
                <CardDescription>All users with their orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Date Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map(p => (
                      <TableRow key={p.id}>
                        <TableCell>{p.full_name}</TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>{p.phone}</TableCell>
                        <TableCell>{p.address}</TableCell>
                        <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- CREATE PRODUCT TAB ---------- */}
          <TabsContent value="create_product">
            <Card>
              <CardHeader>
                <CardTitle>Create Product</CardTitle>
                <CardDescription>Add a new product or special offer</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={createProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="input"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                  {productForm.isSpecial && (
                    <input
                      type="number"
                      placeholder="Discounted Price"
                      className="input"
                      value={productForm.discounted_price}
                      onChange={e => setProductForm({ ...productForm, discounted_price: e.target.value })}
                      required
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Description"
                    className="input"
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="input"
                    value={productForm.quantity}
                    onChange={e => setProductForm({ ...productForm, quantity: e.target.value })}
                    required
                  />
                  {!productForm.isSpecial && (
                    <input
                      type="text"
                      placeholder="Category"
                      className="input"
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                      required
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="input"
                    value={productForm.image_url}
                    onChange={e => setProductForm({ ...productForm, image_url: e.target.value })}
                    required
                  />

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={productForm.isSpecial}
                      onChange={e => setProductForm({ ...productForm, isSpecial: e.target.checked })}
                    />
                    <span>Special Offer</span>
                  </label>

                  <Button type="submit">Create Product</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
