import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const BestSellersSection = () => {
  const { data: products = [], isLoading } = useProducts();
  const bestSellers = products.filter(p => p.is_bestseller);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
            <div>
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) return null;

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
          {bestSellers.slice(0, 3).map((product, index) => (
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
