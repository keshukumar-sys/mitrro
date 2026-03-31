import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import SaleOnMitrro from "./pages/SaleOnMitrro";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyProfile from "./pages/MyProfile";
import Checkout from "./pages/Checkout";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SpecialOffersPage from "./pages/SpecialOffersPage";
//import Wishlist from "./pages/Wishlist";
import ReviewsPage from "./pages/ReviewsPage";


//Noors
import BigSaving from "./components/BigSaving";
import HealthCareEssential from "./components/HealthCareEssential";
import LabDiagnostics from "./components/LabDiagnostics";
import AdvancedWoundCare from "./components/AdvancedWoundCare";
import BulkOrders from "./pages/BulkOrder";
import BulkCheckout from "./pages/BulkCheckout";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";
import OrderTracking from "./pages/OrderTracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/categories" element={<Categories />} />

                <Route path="/products" element={<Products />} />
                <Route path="/special_offer" element={<SpecialOffersPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/sale-on-mitrro" element={<SaleOnMitrro />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* <Route path="/wishlist" element={<Wishlist />} /> */}
                <Route path="/reviews/:id" element={<ReviewsPage />} />

                <Route path="/big-saving" element={<BigSaving />} />
                <Route path="/health-care" element={<HealthCareEssential />} />
                <Route path="/lab-diagnostics" element={<LabDiagnostics />} />
                <Route path="/Advance-care" element={<AdvancedWoundCare />} />
                <Route path="/bulk-orders" element={<BulkOrders />} />
                <Route path="/bulk-checkout/:quotationId" element={<BulkCheckout />} />
                <Route path="/search" element={<Search />} />
                <Route path="/order/:id" element={<OrderTracking />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
