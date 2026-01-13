import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || '');
  const { data: allProducts = [] } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="bg-secondary py-4">
          <div className="container-luxe">
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
        <section className="section-padding">
          <div className="container-luxe">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <div className="flex gap-4">
                  <Skeleton className="w-20 h-20" />
                  <Skeleton className="w-20 h-20" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-luxe section-padding text-center">
          <h1 className="font-display text-3xl mb-4">Produit non trouvé</h1>
          <Button asChild>
            <Link to="/boutique">Retour à la boutique</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      images: product.images || [],
      description: product.description || '',
      brand: 'Pure Fragrances',
      intensity: product.intensity || 'modérée',
      size: product.volume || '100ml',
      notes: {
        top: product.top_notes || [],
        heart: product.heart_notes || [],
        base: product.base_notes || [],
      },
      isNew: product.is_new || false,
      isBestSeller: product.is_bestseller || false,
    };
    addToCart(cartProduct, quantity);
    toast({
      title: 'Ajouté au panier',
      description: `${quantity} × ${product.name} ajouté à votre panier.`,
    });
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.is_bestseller)
    .slice(0, 3);

  const images = product.images || [];
  const topNotes = product.top_notes || [];
  const heartNotes = product.heart_notes || [];
  const baseNotes = product.base_notes || [];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-luxe">
          <Link
            to="/boutique"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la boutique
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="section-padding">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary overflow-hidden">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Aucune image
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 bg-secondary overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-gold' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:py-8">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.is_new && (
                  <span className="bg-gold text-accent-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                    Nouveau
                  </span>
                )}
                {product.is_bestseller && (
                  <span className="bg-noir text-primary-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                    Best-seller
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Pure Fragrances
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-2xl">{formatPrice(product.price)}</span>
              </div>

              {/* Size & Intensity */}
              <div className="flex gap-6 mb-6 text-sm">
                {product.volume && (
                  <div>
                    <span className="text-muted-foreground">Contenance:</span>
                    <span className="ml-2 font-medium">{product.volume}</span>
                  </div>
                )}
                {product.intensity && (
                  <div>
                    <span className="text-muted-foreground">Intensité:</span>
                    <span className="ml-2 font-medium capitalize">{product.intensity}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Notes */}
              {(topNotes.length > 0 || heartNotes.length > 0 || baseNotes.length > 0) && (
                <div className="bg-secondary p-6 mb-8">
                  <h3 className="font-display text-lg mb-4">Notes Olfactives</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topNotes.length > 0 && (
                      <div>
                        <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de tête</p>
                        <p className="text-sm">{topNotes.join(', ')}</p>
                      </div>
                    )}
                    {heartNotes.length > 0 && (
                      <div>
                        <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de cœur</p>
                        <p className="text-sm">{heartNotes.join(', ')}</p>
                      </div>
                    )}
                    {baseNotes.length > 0 && (
                      <div>
                        <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de fond</p>
                        <p className="text-sm">{baseNotes.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Ajouter au panier
                </Button>

                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Category */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Catégorie:{' '}
                  <Link
                    to={`/boutique?category=${product.category}`}
                    className="text-foreground hover:text-gold transition-colors capitalize"
                  >
                    {product.category}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-luxe">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-12">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
