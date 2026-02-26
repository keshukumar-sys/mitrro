import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Package, Settings } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3002";

const profileSchema = z.object({
  full_name: z.string().trim().min(2),
  phone: z.string().trim().min(10).max(15).optional()
});

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingDetails: any;
  createdAt: string;
}

const MyProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);


  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);


  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);

      const res = await axios.get(
        `${BACKEND_URL}/api/orders/my-orders`,
        { withCredentials: true }
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoadingOrders(false);
    }
  };


  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    setProfileData({
      full_name: parsedUser.name || "",
      phone: parsedUser.phone || ""
    });

    fetchOrders(); 

    setLoading(false);
  }, [navigate]);

  const handleSaveProfile = async () => {
    try {
      profileSchema.parse(profileData);
      setUpdating(true);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  if (loading)
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-16 text-center">
          Loading...
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account information and view your order history
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">

            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Profile
              </TabsTrigger>

              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" /> Orders
              </TabsTrigger>

              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

         
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                  <div className="space-y-4">

                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={user?.email || ""}
                          className="pl-10"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="full_name"
                          value={profileData.full_name}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex gap-4">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={updating}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          {updating ? "Saving..." : "Save Changes"}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

         
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and track your previous orders
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {loadingOrders ? (
                    <p className="text-center text-muted-foreground">
                      Loading orders...
                    </p>
                  ) : orders.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No orders found
                    </p>
                  ) : (
                    <div className="space-y-6">

                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border rounded-lg p-4 space-y-4"
                        >

                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                              <Badge>{order.orderStatus}</Badge>
                              <Badge variant="outline">
                                {order.paymentStatus}
                              </Badge>
                            </div>
                          </div>

                          <Separator />

                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                              />

                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>

                              <p className="font-semibold">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          ))}

                          <Separator />
                          <div className="text-sm space-y-1">
                            <p className="font-medium">Shipping Address</p>
                            <p>
                              {order.shippingDetails.address1},
                              {order.shippingDetails.address2 && ` ${order.shippingDetails.address2},`}
                              {order.shippingDetails.city},
                              {order.shippingDetails.state} -
                              {order.shippingDetails.pincode}
                            </p>
                            <p>Phone: {order.shippingDetails.phone}</p>
                          </div>

                          <Separator />

                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{order.totalPrice}</span>
                          </div>

                        </div>
                      ))}

                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

         
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProfile;
