import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Nuit Éternelle',
    brand: 'Pure Fragrances',
    price: 890,
    originalPrice: 1100,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    ],
    description: 'Une fragrance mystérieuse et envoûtante qui capture l\'essence des nuits orientales. Un voyage olfactif entre tradition et modernité.',
    category: 'femme',
    intensity: 'intense',
    notes: {
      top: ['Bergamote', 'Poivre rose', 'Safran'],
      heart: ['Rose de Damas', 'Jasmin', 'Iris'],
      base: ['Oud', 'Ambre', 'Musc blanc'],
    },
    size: '100ml',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Gentleman Noir',
    brand: 'Pure Fragrances',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
    ],
    description: 'L\'élégance masculine incarnée. Un parfum boisé et cuiré pour l\'homme moderne qui affirme son caractère avec subtilité.',
    category: 'homme',
    intensity: 'modérée',
    notes: {
      top: ['Cardamome', 'Lavande', 'Citron de Sicile'],
      heart: ['Géranium', 'Violette', 'Orris'],
      base: ['Cèdre', 'Vétiver', 'Cuir'],
    },
    size: '100ml',
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Aurore Dorée',
    brand: 'Pure Fragrances',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    ],
    description: 'La lumière du petit matin capturée dans un flacon. Une fragrance fraîche et lumineuse qui illumine chaque instant.',
    category: 'femme',
    intensity: 'légère',
    notes: {
      top: ['Mandarine', 'Néroli', 'Poire'],
      heart: ['Fleur d\'oranger', 'Pivoine', 'Magnolia'],
      base: ['Muscs blancs', 'Bois de santal', 'Vanille'],
    },
    size: '75ml',
    isNew: true,
  },
  {
    id: '4',
    name: 'Oud Royal',
    brand: 'Pure Fragrances',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    ],
    description: 'Le roi des bois précieux. Un oud rare et majestueux sublimé par des épices orientales pour une signature olfactive inoubliable.',
    category: 'unisexe',
    intensity: 'intense',
    notes: {
      top: ['Safran', 'Cannelle', 'Rose bulgare'],
      heart: ['Oud cambodgien', 'Encens', 'Myrrhe'],
      base: ['Ambre gris', 'Benjoin', 'Bois de gaïac'],
    },
    size: '100ml',
    isBestSeller: true,
  },
  {
    id: '5',
    name: 'Brise Marine',
    brand: 'Pure Fragrances',
    price: 520,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
    ],
    description: 'L\'évasion maritime par excellence. Des notes aquatiques et salines qui évoquent les rivages méditerranéens au petit matin.',
    category: 'homme',
    intensity: 'légère',
    notes: {
      top: ['Citron vert', 'Sel marin', 'Aldéhydes'],
      heart: ['Feuilles de figuier', 'Romarin', 'Géranium'],
      base: ['Bois flotté', 'Musc', 'Ambre gris'],
    },
    size: '100ml',
    isNew: true,
  },
  {
    id: '6',
    name: 'Velours Rose',
    brand: 'Pure Fragrances',
    price: 780,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    ],
    description: 'La rose dans toute sa splendeur. Un bouquet floral velouté et sensuel, hommage à la reine des fleurs.',
    category: 'femme',
    intensity: 'modérée',
    notes: {
      top: ['Rose centifolia', 'Litchi', 'Bergamote'],
      heart: ['Rose de mai', 'Pivoine', 'Framboise'],
      base: ['Patchouli', 'Vanille', 'Cèdre blanc'],
    },
    size: '75ml',
  },
  {
    id: '7',
    name: 'Cuir Sauvage',
    brand: 'Pure Fragrances',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
    ],
    description: 'L\'essence de l\'aventure. Un cuir fumé et épicé pour les esprits libres et audacieux.',
    category: 'homme',
    intensity: 'intense',
    notes: {
      top: ['Poivre noir', 'Baies roses', 'Élemi'],
      heart: ['Cuir', 'Cade', 'Cyprès'],
      base: ['Oud', 'Benjoin', 'Tabac'],
    },
    size: '100ml',
  },
  {
    id: '8',
    name: 'Sérénité Absolue',
    brand: 'Pure Fragrances',
    price: 620,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    ],
    description: 'Un havre de paix olfactif. Des notes méditatives et apaisantes pour retrouver l\'harmonie intérieure.',
    category: 'unisexe',
    intensity: 'légère',
    notes: {
      top: ['Thé blanc', 'Yuzu', 'Menthe douce'],
      heart: ['Iris', 'Lotus', 'Bambou'],
      base: ['Bois de hinoki', 'Musc', 'Cèdre japonais'],
    },
    size: '100ml',
    isNew: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.isBestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};
