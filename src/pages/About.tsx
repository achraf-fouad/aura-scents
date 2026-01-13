import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80"
            alt="Artisan parfumeur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-noir/70" />
        </div>
        <div className="container-luxe relative z-10 text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Notre Histoire
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
            À Propos
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">
                Depuis 2015
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                L'Art de la Parfumerie d'Exception
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pure Fragrances est né d'une passion profonde pour l'art olfactif. 
                  Notre fondateur, après des années passées à explorer les maisons de 
                  parfumerie les plus prestigieuses, a décidé de créer une collection 
                  qui allie tradition et modernité.
                </p>
                <p>
                  Chaque fragrance de notre collection est le fruit d'un travail 
                  méticuleux, où les matières premières les plus nobles sont 
                  sélectionnées avec soin. De la rose de Grasse au oud du Cambodge, 
                  nous parcourons le monde pour dénicher les essences les plus rares.
                </p>
                <p>
                  Notre mission est simple : vous offrir des parfums d'exception, 
                  accessibles, qui vous accompagnent dans tous les moments de votre vie 
                  et laissent une empreinte inoubliable.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                alt="Flacons de parfum"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">
              Nos Engagements
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              Ce qui nous définit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">01</span>
              </div>
              <h3 className="font-display text-xl mb-4">Authenticité</h3>
              <p className="text-muted-foreground">
                100% de nos parfums sont authentiques et sélectionnés avec le plus grand soin. 
                Nous garantissons la qualité de chaque flacon.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">02</span>
              </div>
              <h3 className="font-display text-xl mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                Chaque fragrance est composée avec les matières premières les plus 
                nobles pour une expérience olfactive incomparable.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">03</span>
              </div>
              <h3 className="font-display text-xl mb-4">Service</h3>
              <p className="text-muted-foreground">
                Nous vous accompagnons dans le choix de votre parfum et assurons 
                une livraison soignée partout au Maroc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-noir text-primary-foreground">
        <div className="container-luxe text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Découvrez notre collection
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Explorez notre sélection de parfums d'exception et trouvez 
            la fragrance qui vous correspond.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/boutique">
              Explorer la boutique
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
