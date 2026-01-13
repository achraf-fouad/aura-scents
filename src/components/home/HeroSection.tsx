import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80"
          alt="Luxury perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-luxe relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <p className="text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-6">
            Collection Exclusive
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-medium leading-tight mb-6 md:mb-8">
            L'Art de la
            <br />
            <span className="italic">Parfumerie</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg">
            Découvrez notre collection de parfums d'exception, 
            créés pour sublimer votre personnalité et marquer les esprits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/boutique">
                Découvrir la collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/a-propos">Notre histoire</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
