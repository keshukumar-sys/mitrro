import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(2, "Company name is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Connect to MongoDB contact API
      console.log("Contact form data:", data);

      setIsSubmitted(true);
      form.reset();

      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond within 24 hours.",
      });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for contacting Mitrro. Our team will review your message and respond within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-gradient-primary hover:opacity-90">
              Send Another Message
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Mitrro</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have questions about our products or services? We're here to help. Reach out to our team of pharmaceutical experts.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
                        <p className="text-muted-foreground">
                          123 Medical Plaza Drive<br />
                          Healthcare District<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                        <p className="text-muted-foreground">
                          Main: +1-234-567-8900<br />
                          Emergency: +1-234-567-8911<br />
                          Toll-free: 1-800-MITRRO-1
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Email</h3>
                        <p className="text-muted-foreground">
                          General: contact@mitrro.com<br />
                          Sales: sales@mitrro.com<br />
                          Support: support@mitrro.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                          Saturday: 9:00 AM - 2:00 PM EST<br />
                          Sunday: Emergency calls only
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground flex items-center">
                    <MessageSquare className="h-8 w-8 text-primary mr-3" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Organization *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select inquiry type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                                  <SelectItem value="pricing">Pricing Information</SelectItem>
                                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                  <SelectItem value="technical-support">Technical Support</SelectItem>
                                  <SelectItem value="customer-service">Customer Service</SelectItem>
                                  <SelectItem value="billing">Billing Question</SelectItem>
                                  <SelectItem value="complaint">Complaint/Issue</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your inquiry..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center pt-6">
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-gradient-primary hover:opacity-90 px-12"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support */}
      {/* Additional Support */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Need Immediate Assistance?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For urgent inquiries or emergency support, use one of these direct contact methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <Card className="flex flex-col text-center border-0 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardHeader className="pt-8">
                <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Emergency Line</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pb-8">
                <p className="text-muted-foreground mb-8">
                  Available 24/7 for urgent medical supply needs and critical pharmaceutical logistics.
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  Call +1-234-567-8911
                </Button>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col text-center border-0 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardHeader className="pt-8">
                <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pb-8">
                <p className="text-muted-foreground mb-8">
                  Connect instantly with our support team for real-time help with your account or orders.
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col text-center border-0 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardHeader className="pt-8">
                <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Priority Support</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pb-8">
                <p className="text-muted-foreground mb-8">
                  Get fast-tracked responses for technical integration or complex partnership queries.
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  Email Priority Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;