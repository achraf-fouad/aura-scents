import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Ajouté au panier',
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/produit/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
        {/* Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
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

        {/* Add to cart button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            variant="gold"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="font-display text-lg group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground capitalize">
          {product.size} • {product.intensity}
        </p>
      </div>
    </Link>
  );
};
