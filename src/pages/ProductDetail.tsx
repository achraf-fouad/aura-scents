import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { getProductById, getBestSellers } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

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
    addToCart(product, quantity);
    toast({
      title: 'Ajouté au panier',
      description: `${quantity} × ${product.name} ajouté à votre panier.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const relatedProducts = getBestSellers()
    .filter(p => p.id !== product.id)
    .slice(0, 3);

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
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
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
                {product.isNew && (
                  <span className="bg-gold text-accent-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                    Nouveau
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-noir text-primary-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                    Best-seller
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-2xl">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Size & Intensity */}
              <div className="flex gap-6 mb-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Contenance:</span>
                  <span className="ml-2 font-medium">{product.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Intensité:</span>
                  <span className="ml-2 font-medium capitalize">{product.intensity}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Notes */}
              <div className="bg-secondary p-6 mb-8">
                <h3 className="font-display text-lg mb-4">Notes Olfactives</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de tête</p>
                    <p className="text-sm">{product.notes.top.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de cœur</p>
                    <p className="text-sm">{product.notes.heart.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider mb-2">Notes de fond</p>
                    <p className="text-sm">{product.notes.base.join(', ')}</p>
                  </div>
                </div>
              </div>

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
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
