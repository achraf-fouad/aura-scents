import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Femme',
    slug: 'femme',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
    description: 'Élégance et sensualité',
  },
  {
    name: 'Homme',
    slug: 'homme',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    description: 'Force et raffinement',
  },
  {
    name: 'Unisexe',
    slug: 'unisexe',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
    description: 'Au-delà des genres',
  },
];

export const CategoriesSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-luxe">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">
            Collections
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            Explorez nos univers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des créations olfactives uniques pour chaque personnalité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/boutique?category=${category.slug}`}
              className="group relative overflow-hidden aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-gold-light text-sm uppercase tracking-wider mb-2">
                  {category.description}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-4">
                  {category.name}
                </h3>
                <span className="inline-flex items-center text-primary-foreground text-sm uppercase tracking-wider group-hover:text-gold transition-colors">
                  Découvrir
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
