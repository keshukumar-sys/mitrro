import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";
const Hero = () => {
  return <section className="relative min-h-[400px] md:min-h-[600px] bg-gradient-hero flex items-center overflow-hidden py-12 md:py-0">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-primary opacity-95">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 75%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)`
      }} />
    </div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Hero Content */}
        <div className="text-white space-y-4 md:space-y-6 animate-fade-in text-center lg:text-left">
          <div className="inline-block">
            <span className="bg-white/20 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
              Reliable Medical & Pharmaceutical Solutions Delivered Across the Globe
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Quality pharmaceutical products. Smart healthcare technologies.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-lg mx-auto lg:mx-0">
            Mitrro specializes in supplying advanced healthcare equipment and medical solutions designed to support efficient clinical operations and improved patient care. With a robust global supply chain and strict quality standards, we ensure reliable, hassle-free access to essential medical equipment.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white hover:bg-white text-orange-600">
                Connect With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image — hidden on small screens, visible from md up */}
        <div className="hidden md:block relative animate-scale-in" style={{
          animationDelay: '0.3s'
        }}>
          <div className="relative">
            <img src={heroImage} alt="Medical professionals and healthcare equipment" className="w-full h-auto rounded-2xl shadow-medical" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>;
};
export default Hero;