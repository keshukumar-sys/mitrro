import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users, Shield, Award, Target, Globe, Stethoscope, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Mitrro</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Leading the way in pharmaceutical excellence since 2010. We're committed to improving healthcare outcomes through innovative medical solutions and reliable supply chain management.
          </p>
          <Badge variant="secondary" className="text-lg px-6 py-2">
            Trusted by 10,000+ Healthcare Professionals
          </Badge>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                <Target className="h-10 w-10 text-primary mr-4" />
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To bridge the gap between healthcare providers and pharmaceutical solutions by delivering high-quality medical products, innovative technologies, and exceptional service that ultimately improves patient care worldwide.
              </p>
            </div>
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Globe className="h-8 w-8 text-primary mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the world's most trusted pharmaceutical partner, setting new standards in healthcare supply chain excellence and making quality medical care accessible to every community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These fundamental principles guide every decision we make and every relationship we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

  {/* Card 1 */}
  <Card className="group text-center border-0 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-background">
    <CardHeader>
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
        <Heart className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl transition-colors duration-300 group-hover:text-primary">
        Patient First
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-lg">
        Every product we supply is chosen with patient safety and outcomes as our top priority.
      </p>
    </CardContent>
  </Card>

  {/* Card 2 */}
  <Card className="group text-center border-0 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-background">
    <CardHeader>
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
        <Shield className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
        Quality Assurance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-lg">
        Rigorous quality controls and certifications ensure only the highest standards reach our customers.
      </p>
    </CardContent>
  </Card>

  {/* Card 3 */}
  <Card className="group text-center border-0 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-background">
    <CardHeader>
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
        Partnership
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-lg">
        We build lasting relationships based on trust, transparency, and mutual success.
      </p>
    </CardContent>
  </Card>

  {/* Card 4 */}
  <Card className="group text-center border-0 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-background">
    <CardHeader>
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
        <Award className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
        Excellence
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-lg">
        Continuous improvement and innovation drive us to exceed expectations in everything we do.
      </p>
    </CardContent>
  </Card>

</div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Our Story</h2>
            
            <div className="space-y-8">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">The Beginning (2010)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Mitrro was founded with a simple yet powerful vision: to revolutionize the pharmaceutical supply chain. Starting as a small distributor serving local clinics, we recognized the critical need for reliable, high-quality medical products delivered with exceptional service.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Growth & Innovation (2015-2020)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Through strategic partnerships and continuous innovation, we expanded our product portfolio to include advanced medical devices, specialized pharmaceuticals, and cutting-edge healthcare technologies. Our customer base grew from dozens to thousands of healthcare providers nationwide.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Global Reach (2020-Present)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, Mitrro serves over 10,000 healthcare professionals across multiple countries. We've become a trusted partner in the global fight against diseases, providing essential supplies during critical times while maintaining our commitment to quality and innovation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals driving Mitrro's mission forward.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

  {/* Member 1 */}
  <Card className="group text-center border-0 shadow-card bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
    <CardHeader>
      <div className="relative mx-auto mb-5">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110">
          <Stethoscope className="h-12 w-12 text-white" />
        </div>
      </div>

      <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
        Dr. Sarah Johnson
      </CardTitle>

      <CardDescription className="text-base">
        Chief Executive Officer
      </CardDescription>
    </CardHeader>

    <CardContent>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Former healthcare executive with 20+ years of experience in pharmaceutical operations and strategic partnerships.
      </p>
    </CardContent>
  </Card>

  {/* Member 2 */}
  <Card className="group text-center border-0 shadow-card bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
    <CardHeader>
      <div className="relative mx-auto mb-5">
        <div className="absolute inset-0 rounded-full bg-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative w-24 h-24 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110">
          <Microscope className="h-12 w-12 text-white" />
        </div>
      </div>

      <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
        Dr. Michael Chen
      </CardTitle>

      <CardDescription className="text-base">
        Chief Technology Officer
      </CardDescription>
    </CardHeader>

    <CardContent>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Leading pharmaceutical technologist specializing in supply chain optimization and digital health solutions.
      </p>
    </CardContent>
  </Card>

  {/* Member 3 */}
  <Card className="group text-center border-0 shadow-card bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
    <CardHeader>
      <div className="relative mx-auto mb-5">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110">
          <Users className="h-12 w-12 text-white" />
        </div>
      </div>

      <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
        Lisa Rodriguez
      </CardTitle>

      <CardDescription className="text-base">
        Chief Operations Officer
      </CardDescription>
    </CardHeader>

    <CardContent>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Operations expert with extensive background in healthcare logistics and quality management systems.
      </p>
    </CardContent>
  </Card>

</div>

        </div>
      </section>

      {/* Statistics */}
      <section className="pt-14 pb-24">
      <div className="grid md:grid-cols-4 gap-8">
  <div className="text-center">
    <CountUp end={10000} suffix="+" />
    <p className="text-muted-foreground">Healthcare Partners</p>
  </div>

  <div className="text-center">
    <CountUp end={50} suffix="+" />
    <p className="text-muted-foreground">Countries Served</p>
  </div>

  <div className="text-center">
    <CountUp end={1000000} suffix="+" />
    <p className="text-muted-foreground">Patients Helped</p>
  </div>

  <div className="text-center">
    <CountUp end={99.8} suffix="%" />
    <p className="text-muted-foreground">Customer Satisfaction</p>
  </div>
</div>
</section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust Mitrro for their pharmaceutical needs.
          </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">

  <Link to="/contact">
    <Button
      size="lg"
      className="bg-white text-primary border-white
                 hover:bg-white hover:text-primary hover:border-white
                 focus:bg-white focus:text-primary"
    >
      Contact Our Team
    </Button>
  </Link>

  <Link to="/products">
    <Button
      size="lg"
      variant="outline"
      className="border-white text-white bg-transparent
                 hover:bg-transparent hover:text-white hover:border-white
                 focus:bg-transparent focus:text-white"
    >
      View Our Products
    </Button>
  </Link>

</div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;