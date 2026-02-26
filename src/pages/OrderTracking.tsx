import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, Calendar, MapPin, ReceiptText } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "https://mitrro-backend-mongodb.onrender.com";

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
    shippingDetails: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
    };
    createdAt: string;
}

const OrderTracking = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/orders/${id}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setOrder(res.data.order);
                } else {
                    toast.error(res.data.message || "Order not found");
                }
            } catch (err: any) {
                console.error("Fetch order error:", err);
                toast.error(err.response?.data?.message || "Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="container mx-auto py-16 text-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <Package className="h-12 w-12 text-muted-foreground" />
                        <p className="text-xl">Loading order details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="container mx-auto py-16 text-center">
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Order Not Found</CardTitle>
                            <CardDescription>We couldn't find the order you're looking for.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <button
                                onClick={() => navigate("/")}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                            >
                                Go Back Home
                            </button>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                Order Tracking <Badge variant="outline" className="text-lg">#{order._id.slice(-8).toUpperCase()}</Badge>
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4" /> Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Badge className="text-base px-4 py-1">{order.orderStatus}</Badge>
                            <Badge variant="secondary" className="text-base px-4 py-1">{order.paymentStatus}</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column: Order Items */}
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" /> Order Items
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                            <div className="h-20 w-20 flex-shrink-0 bg-secondary rounded-md overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">₹{item.price * item.quantity}</p>
                                                <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Truck className="h-5 w-5" /> Shipping Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                                        <div className="relative">
                                            <div className={`absolute -left-8 h-6 w-6 rounded-full border-4 border-background ${order.orderStatus !== 'Cancelled' ? 'bg-primary' : 'bg-muted'}`}></div>
                                            <div>
                                                <p className="font-semibold">Order Placed</p>
                                                <p className="text-sm text-muted-foreground">We have received your order.</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className={`absolute -left-8 h-6 w-6 rounded-full border-4 border-background ${(order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') ? 'bg-primary' : 'bg-muted'}`}></div>
                                            <div>
                                                <p className="font-semibold">Shipped</p>
                                                <p className="text-sm text-muted-foreground">Your order is on the way.</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className={`absolute -left-8 h-6 w-6 rounded-full border-4 border-background ${order.orderStatus === 'Delivered' ? 'bg-primary' : 'bg-muted'}`}></div>
                                            <div>
                                                <p className="font-semibold">Delivered</p>
                                                <p className="text-sm text-muted-foreground">Order has been delivered successfully.</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Summaries */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ReceiptText className="h-5 w-5" /> Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>₹{order.totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₹{order.totalPrice}</span>
                                    </div>
                                    <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1">
                                        <Badge variant="outline" className="text-[10px]">{order.paymentMethod}</Badge>
                                        Payment Method
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" /> Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                    <p className="font-medium text-base">Shipping Details</p>
                                    <p>{order.shippingDetails.address1}</p>
                                    {order.shippingDetails.address2 && <p>{order.shippingDetails.address2}</p>}
                                    <p>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}</p>
                                    <p className="pt-2">Phone: {order.shippingDetails.phone}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderTracking;
