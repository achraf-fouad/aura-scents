import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-luxe text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl mb-4">
                Votre panier est vide
              </h1>
              <p className="text-muted-foreground mb-8">
                Découvrez notre collection de parfums d'exception
              </p>
              <Button asChild variant="gold" size="lg">
                <Link to="/boutique">
                  Découvrir la boutique
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxe">
          <h1 className="font-display text-3xl md:text-4xl text-center mb-12">
            Votre Panier
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="divide-y divide-border">
                {items.map(item => (
                  <div key={item.product.id} className="py-6 first:pt-0">
                    <div className="flex gap-4 md:gap-6">
                      {/* Image */}
                      <Link
                        to={`/produit/${item.product.id}`}
                        className="w-24 h-24 md:w-32 md:h-32 bg-secondary flex-shrink-0"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <Link
                            to={`/produit/${item.product.id}`}
                            className="font-display text-lg hover:text-gold transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.size}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          {/* Quantity */}
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)} / unité
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 md:p-8 sticky top-28">
                <h2 className="font-display text-xl mb-6">Récapitulatif</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-gold">Gratuite</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-display text-lg">Total</span>
                    <span className="font-display text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button asChild variant="gold" size="lg" className="w-full">
                  <Link to="/commande">
                    Passer la commande
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Paiement à la livraison disponible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
