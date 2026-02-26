import { Search, User, Menu, Phone, Mail, LogOut, UserCircle, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import logoMitrro from "@/assets/logo-mitrro.webp";
import Cart from "@/components/Cart";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const Header = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ USER FROM LOCAL STORAGE (MongoDB Login)
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(
        "https://mitrro-backend-mongodb.onrender.com/api/users/logout",
        {
          method: "POST",
          credentials: "include"
        }
      );

      localStorage.removeItem("user");
      setUser(null);

      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Error signing out");
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    navigate(`/search?query=${searchTerm}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 text-white">
            <a href="tel:+919968763181" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+91 99687 63181</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@mitrro.com" target="_blank" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="h-4 w-4" />
              <span>contact@mitrro.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white">
            <span>Welcome to Mitrro</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background border-b shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoMitrro} alt="Mitrro Logo" className="h-10 w-auto" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Input
                  placeholder="I'm searching for..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-4 pr-12 py-3 rounded-full border-border focus:ring-2 focus:ring-primary"
                />
                <Button
                  size="icon"
                  onClick={handleSearch}
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-gradient-primary hover:bg-gradient-secondary"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/my-profile" className="flex items-center">
                        <UserCircle className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              <Cart />

              <Link to="/login">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </Link>

            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 pb-4 border-t pt-4">
            <Link to="/"><Button variant="ghost" className="font-medium">Home</Button></Link>
            <Link to="/categories"><Button variant="ghost" className="font-medium">Categories</Button></Link>
            <Link to="/brands"><Button variant="ghost" className="font-medium">Brands</Button></Link>
            <Link to="/about-us"><Button variant="ghost" className="font-medium">About Us</Button></Link>
            <Link to="/contact"><Button variant="ghost" className="font-medium">Contact</Button></Link>
            <Link to="/blog"><Button variant="ghost" className="font-medium">Blog</Button></Link>
            <div className="ml-auto">
              <Button className="bg-gradient-primary hover:opacity-90">
                <Link to={'/special_offer'}>Special Offer</Link>
              </Button>
            </div>
          </nav>

        </div>
      </header>
    </>
  );
};

export default Header;
