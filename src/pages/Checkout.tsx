import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Check, Truck, Banknote } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: 'Panier vide',
        description: 'Veuillez ajouter des produits à votre panier.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would normally send the order to Supabase
    const order = {
      customer: formData,
      items: items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: totalPrice,
      paymentMethod,
      status: 'pending',
    };

    console.log('Order submitted:', order);

    clearCart();
    
    toast({
      title: 'Commande confirmée !',
      description: 'Nous vous contacterons bientôt pour confirmer votre commande.',
    });

    navigate('/confirmation');
    setIsSubmitting(false);
  };

  if (items.length === 0) {
    navigate('/panier');
    return null;
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxe">
          <h1 className="font-display text-3xl md:text-4xl text-center mb-12">
            Finaliser la commande
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">Informations de contact</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+212 6XX XXX XXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">Adresse de livraison</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse complète *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">Mode de paiement</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <label
                        className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                          paymentMethod === 'cod'
                            ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-gold/50'
                        }`}
                      >
                        <RadioGroupItem value="cod" id="cod" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Banknote className="h-5 w-5 text-gold" />
                            <span className="font-medium">Paiement à la livraison</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Payez en espèces lors de la réception de votre commande
                          </p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Notes */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">Notes (optionnel)</h2>
                  <Textarea
                    name="notes"
                    rows={3}
                    placeholder="Instructions spéciales pour la livraison..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 md:p-8 sticky top-28">
                  <h2 className="font-display text-xl mb-6">Votre commande</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-background flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qté: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 mb-6">
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
                      <span className="font-display text-xl">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                    <Truck className="h-4 w-4" />
                    <span>Livraison gratuite sur tout le Maroc</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
