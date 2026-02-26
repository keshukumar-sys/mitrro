import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Building2, Users, TrendingUp, CheckCircle } from "lucide-react";

const businessFormSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  licenseNumber: z.string().min(3, "License / registration number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.object({
    street: z.string().min(2, "Street is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postalCode: z.string().min(4, "Postal code / PIN is required"),
    country: z.string().default("India"),
  }),
});

type BusinessFormData = z.infer<typeof businessFormSchema>;

const SaleOnMitrro = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      licenseNumber: "",
      password: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    setSubmitError(null);
    
    try {
      const response = await axios.post(
        "https://mitrro-backend-mongodb.onrender.com/api/users/create-brand",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (err: any) {
      console.error("Brand registration failed:", err);
      const message =
        err.response?.data?.message ||
        "Registration failed. Please check your input and try again.";
      setSubmitError(message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">
              Registration Submitted Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your brand registration has been sent successfully.<br />
              It will be reviewed by the admin team shortly.
            </p>

            <Button onClick={() => setIsSubmitted(false)}>
              Register Another Brand
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
          <h1 className="text-5xl font-bold mb-6">
            Become Our Partner Mitrro
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join thousands of healthcare businesses that trust Mitrro for their pharmaceutical and medical supply needs. Register your business today and unlock exclusive wholesale pricing and benefits.
          </p>
        </div>
      </section>

      {/* Benefits Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <Card className="relative text-center rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="w-18 h-18 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 shadow-md group-hover:scale-110 transition">
                    <Building2 className="h-9 w-9 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Wholesale Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Access exclusive wholesale rates and bulk discounts for all pharmaceutical products.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <Card className="relative text-center rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="w-18 h-18 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 shadow-md group-hover:scale-110 transition">
                    <Users className="h-9 w-9 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Dedicated Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Get assigned a dedicated account manager for personalized service and support.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <Card className="relative text-center rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="w-18 h-18 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-md group-hover:scale-110 transition">
                    <TrendingUp className="h-9 w-9 text-green-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Business Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Access marketing materials and business development resources to grow your practice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="max-w-6xl mx-auto shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">
                Business Registration Form
              </CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below to start your partnership with Mitrro
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter brand / company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="business@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License / Registration Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Drug License / GST / Registration No" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Minimum 8 characters"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <fieldset className="border rounded-lg p-6 bg-muted/40 space-y-6">
                    <legend className="text-lg font-medium px-2">Business Address</legend>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Street / Building *</FormLabel>
                            <FormControl>
                              <Input placeholder="123, Main Road, Sector 45" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Hyderabad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="Telangana" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code / PIN *</FormLabel>
                            <FormControl>
                              <Input placeholder="500081" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} readOnly className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>

                  {submitError && (
                    <div className="p-4 bg-destructive/15 text-destructive rounded-md text-center">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      className="min-w-[220px]"
                    >
                      {form.formState.isSubmitting ? "Submitting..." : "Register Brand"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaleOnMitrro;