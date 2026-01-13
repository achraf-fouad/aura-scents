import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedIntensities, setSelectedIntensities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['femme', 'homme', 'unisexe'];
  const intensities = ['légère', 'modérée', 'intense'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by intensity
    if (selectedIntensities.length > 0) {
      result = result.filter(p => selectedIntensities.includes(p.intensity));
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCategories, selectedIntensities, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleIntensity = (intensity: string) => {
    setSelectedIntensities(prev =>
      prev.includes(intensity)
        ? prev.filter(i => i !== intensity)
        : [...prev, intensity]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedIntensities([]);
    setPriceRange([0, 2000]);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedIntensities.length > 0;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-display text-lg mb-4">Catégorie</h4>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal capitalize cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Intensity */}
      <div>
        <h4 className="font-display text-lg mb-4">Intensité</h4>
        <div className="space-y-3">
          {intensities.map(intensity => (
            <div key={intensity} className="flex items-center space-x-3">
              <Checkbox
                id={`intensity-${intensity}`}
                checked={selectedIntensities.includes(intensity)}
                onCheckedChange={() => toggleIntensity(intensity)}
              />
              <Label
                htmlFor={`intensity-${intensity}`}
                className="text-sm font-normal capitalize cursor-pointer"
              >
                {intensity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Effacer les filtres
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-luxe text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">
            Nos Créations
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            Boutique
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez notre collection complète de parfums d'exception
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="section-padding">
        <div className="container-luxe">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              {/* Mobile filter button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtres
                    {hasActiveFilters && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-gold text-accent-foreground text-xs flex items-center justify-center">
                        {selectedCategories.length + selectedIntensities.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-display text-xl">Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-12">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <h3 className="font-display text-xl mb-6">Filtres</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    Aucun produit ne correspond à vos critères.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
