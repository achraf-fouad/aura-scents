import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getBestSellers } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export const BestSellersSection = () => {
  const bestSellers = getBestSellers();

  return (
    <section className="section-padding">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">
              Les plus aimés
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Best-Sellers
            </h2>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/boutique">
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
