import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const BrandSection = () => {
  return (
    <section className="section-padding bg-noir text-primary-foreground overflow-hidden">
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square relative">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                alt="Artisan parfumeur"
                className="w-full h-full object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">
              Notre Philosophie
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              L'Excellence
              <br />
              <span className="italic">à chaque instant</span>
            </h2>
            <div className="space-y-4 text-primary-foreground/80 mb-8">
              <p>
                Chez Pure Fragrances, nous croyons que chaque parfum raconte une histoire. 
                Nos créations sont le fruit d'un savoir-faire artisanal hérité des grandes 
                maisons de parfumerie.
              </p>
              <p>
                Nous sélectionnons les matières premières les plus nobles des quatre 
                coins du monde pour créer des fragrances uniques qui vous accompagnent 
                dans tous les moments de votre vie.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <p className="font-display text-3xl text-gold">100%</p>
                <p className="text-sm text-primary-foreground/60">Authentique</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">50+</p>
                <p className="text-sm text-primary-foreground/60">Fragrances</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">5000+</p>
                <p className="text-sm text-primary-foreground/60">Clients satisfaits</p>
              </div>
            </div>
            <Button asChild variant="gold-outline" size="lg">
              <Link to="/a-propos">Découvrir notre histoire</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
