import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoMitrro from "@/assets/logo-mitrro.webp";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: insertedData, error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email })
        .select();

      if (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
      }

      console.log("Newsletter subscription successful:", insertedData);

      setEmail("");
      
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
      });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      if (error.code === '23505') {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src={logoMitrro} 
                alt="Mitrro Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-background/80 leading-relaxed">
              Providing pharmaceutical products of global quality standard to patients worldwide. 
              Your trusted partner in healthcare solutions.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10" asChild>
                <a href="https://www.facebook.com/mitrroglobal/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10" asChild>
                <a href="https://www.instagram.com/mitrroglobal/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10" asChild>
                <a href="https://www.linkedin.com/company/mitrroglobal/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/about-us" className="text-background/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/categories" className="text-background/80 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="/brands" className="text-background/80 hover:text-primary transition-colors">Brands</a></li>
              <li><a href="/contact" className="text-background/80 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-background/80 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Covid-19 Essentials</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Consumable & Disposable</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Medical Device & Equipment</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Dental</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Surgical Instruments</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Hospital Establishment</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4 mb-6">
              <a href="tel:+919968763181" className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 99687 63181</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@mitrro.com" target="_blank" className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@mitrro.com</span>
              </a>
              <a href="https://maps.google.com/?q=South+Delhi+110001+Delhi+IN" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
                <span>South Delhi 110001 Delhi IN</span>
              </a>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-primary hover:bg-gradient-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Mitrro. All rights reserved. | <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a> | <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
          </p>
          <p className="text-background/60 text-sm mt-4 md:mt-0">
            Built with care for better healthcare solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;