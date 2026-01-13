import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { BestSellersSection } from '@/components/home/BestSellersSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { BrandSection } from '@/components/home/BrandSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BestSellersSection />
      <CategoriesSection />
      <BrandSection />
      <NewArrivalsSection />
    </Layout>
  );
};

export default Index;
