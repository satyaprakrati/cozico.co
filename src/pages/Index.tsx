import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedCollections } from '@/components/FeaturedCollections';
import { BestSellers } from '@/components/BestSellers';
import { CategoryGrid } from '@/components/CategoryGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TrendingShoes } from '@/components/TrendingShoes';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-[104px]">
        <Hero />
        <FeaturedCollections />
        <BestSellers />
        <CategoryGrid />
        <TrendingShoes />
        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
