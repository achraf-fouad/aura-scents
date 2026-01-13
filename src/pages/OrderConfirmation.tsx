import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxe">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-gold" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              Merci pour votre commande !
            </h1>

            <p className="text-muted-foreground text-lg mb-8">
              Votre commande a été enregistrée avec succès. Notre équipe vous contactera 
              très prochainement pour confirmer les détails de la livraison.
            </p>

            <div className="bg-secondary p-6 md:p-8 mb-8 text-left">
              <h2 className="font-display text-xl mb-4">Prochaines étapes</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold text-accent-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Vous recevrez un appel de confirmation dans les 24 heures
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold text-accent-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Votre commande sera préparée avec soin
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold text-accent-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Livraison à domicile avec paiement à la réception
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild variant="gold" size="lg">
                <Link to="/boutique">
                  Continuer vos achats
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Une question ? Contactez-nous
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+212600000000"
                  className="inline-flex items-center justify-center gap-2 text-sm hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +212 6 00 00 00 00
                </a>
                <a
                  href="mailto:contact@purefragrances.ma"
                  className="inline-flex items-center justify-center gap-2 text-sm hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contact@purefragrances.ma
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderConfirmation;
