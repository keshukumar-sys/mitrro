import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Mitrro's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Mitrro provides professional healthcare solutions including medical equipment, sanitizers, and related products. We strive to provide accurate product information and reliable service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground">
                Users are responsible for providing accurate information during registration and purchase processes. You agree to use our services only for lawful purposes and in accordance with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Product Information</h2>
              <p className="text-muted-foreground">
                We make every effort to ensure product information is accurate. However, we do not warrant that product descriptions, pricing, or other content is error-free, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Orders and Payment</h2>
              <p className="text-muted-foreground">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel orders. Payment must be received before order processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Mitrro shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of our services or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at support@mitrro.com.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;