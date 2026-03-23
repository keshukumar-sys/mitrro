import Head from 'next/head';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Categories from '@/components/Categories';
import Reviews from '@/components/Reviews';
import FaqPage from '@/components/Faq';
import BigSaving from '@/components/BigSaving';
import HealthCareEssential from '@/components/HealthCareEssential';
import LabDiagnostics from "@/components/LabDiagnostics";
import AdvancedWoundCare from "@/components/AdvancedWoundCare";
//import CategoryProducts from '@/components/CategoryProducts';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QE6BLPV4K8"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QE6BLPV4K8');
          `}
        </script>
      </Head>
      
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
         <BigSaving/>
        <HealthCareEssential/>
        <LabDiagnostics/>
        <AdvancedWoundCare/>
        {/* <CategoryProducts/> */}
        <Reviews />
        <FaqPage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
