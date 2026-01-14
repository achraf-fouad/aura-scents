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
import { supabase } from '@/integrations/supabase/client';

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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);

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

    try {
      setIsSubmitting(true);

      /* 1️⃣ CREATE ORDER */
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
          total: totalPrice,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      /* 2️⃣ CREATE ORDER ITEMS */
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      /* 3️⃣ SUCCESS */
      clearCart();

      toast({
        title: 'Commande confirmée ✅',
        description:
          'Nous vous contacterons bientôt pour confirmer votre commande.',
      });

      navigate('/confirmation');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur ❌',
        description: "Impossible d'envoyer la commande.",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-8">

                {/* CONTACT */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">
                    Informations de contact
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Prénom *</Label>
                      <Input name="firstName" required value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label>Nom *</Label>
                      <Input name="lastName" required value={formData.lastName} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label>Téléphone *</Label>
                      <Input name="phone" required value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">
                    Adresse de livraison
                  </h2>
                  <Textarea name="address" required value={formData.address} onChange={handleInputChange} />
                  <Input name="city" required className="mt-4" value={formData.city} onChange={handleInputChange} />
                </div>

                {/* PAYMENT */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">
                    Mode de paiement
                  </h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <label className="flex gap-3 p-4 border cursor-pointer">
                      <RadioGroupItem value="cod" />
                      <Banknote className="text-gold" />
                      Paiement à la livraison
                    </label>
                  </RadioGroup>
                </div>

                {/* NOTES */}
                <div className="bg-card border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl mb-6">Notes</h2>
                  <Textarea name="notes" value={formData.notes} onChange={handleInputChange} />
                </div>
              </div>

              {/* RIGHT */}
              <div className="bg-secondary p-6 md:p-8 sticky top-28">
                <h2 className="font-display text-xl mb-6">Votre commande</h2>

                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm mb-3">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}

                <hr className="my-4" />

                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi...' : 'Confirmer la commande'}
                </Button>

                <div className="flex gap-2 text-xs text-muted-foreground mt-4">
                  <Truck className="h-4 w-4" />
                  Livraison gratuite au Maroc
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
