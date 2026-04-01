export type ProductCategory =
  | 'lingerie'
  | 'acessorios'
  | 'cosmetica'
  | 'prazer'
  | 'kits';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  tags: string[];
  image?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const productCategories: Array<{
  value: ProductCategory;
  label: string;
}> = [
  { value: 'lingerie', label: 'Lingerie' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'cosmetica', label: 'Cosmética' },
  { value: 'prazer', label: 'Prazer' },
  { value: 'kits', label: 'Kits' },
];

export const products: Product[] = [
  {
    id: 'body-rendado-seducao',
    slug: 'body-rendado-seducao',
    name: 'Body Rendado Sensual Premium',
    category: 'lingerie',
    shortDescription: 'Valoriza o corpo e cria um visual irresistível.',
    description:
      'Um body rendado pensado para destacar curvas com elegância e confiança. Ideal para momentos íntimos ou para surpreender com um toque sofisticado e provocador.',
    price: 29.9,
    compareAtPrice: 39.9,
    tags: ['lingerie', 'sensual', 'confiança', 'sedução'],
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
  {
    id: 'conjunto-noite-privada',
    slug: 'conjunto-noite-privada',
    name: 'Conjunto Noite Privada Deluxe',
    category: 'lingerie',
    shortDescription: 'Perfeito para momentos especiais a dois.',
    description:
      'Conjunto delicado e confortável, pensado para elevar a intimidade com elegância. Combina suavidade, estética e um toque de ousadia.',
    price: 39.9,
    compareAtPrice: 49.9,
    tags: ['romântico', 'lingerie', 'casal', 'sedução'],
    image: 'https://images.unsplash.com/photo-1593032465171-8f0b0f92c9c8?q=80&w=1200&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'oleo-massagem-veludo',
    slug: 'oleo-massagem-veludo',
    name: 'Óleo de Massagem Veludo Sensorial',
    category: 'cosmetica',
    shortDescription: 'Desperta os sentidos com toque suave e aroma envolvente.',
    description:
      'Óleo de massagem com textura sedosa que desliza facilmente sobre a pele. Ideal para criar conexão, relaxamento e momentos mais intensos.',
    price: 18.9,
    compareAtPrice: 24.9,
    tags: ['massagem', 'relaxamento', 'casal', 'sensual'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'vela-massagem-ambar',
    slug: 'vela-massagem-ambar',
    name: 'Vela de Massagem Âmbar Quente',
    category: 'cosmetica',
    shortDescription: 'Ambiente íntimo e sensação quente na pele.',
    description:
      'Uma vela que derrete em óleo quente para massagem. Combina aroma envolvente com uma experiência sensorial única.',
    price: 21.9,
    compareAtPrice: 27.9,
    tags: ['vela', 'massagem', 'ambiente', 'intimidade'],
    image: 'https://images.unsplash.com/photo-1603006905393-c0d78e7c1d4d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'algemas-acetinadas',
    slug: 'algemas-acetinadas',
    name: 'Algemas Acetinadas Comfort',
    category: 'acessorios',
    shortDescription: 'Explora novas dinâmicas com conforto e elegância.',
    description:
      'Algemas suaves com acabamento acetinado, ajustáveis e confortáveis. Ideais para quem quer experimentar novas experiências com segurança.',
    price: 16.9,
    compareAtPrice: 22.9,
    tags: ['fantasia', 'jogo', 'explorar', 'casal'],
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'kit-desejo-secreto',
    slug: 'kit-desejo-secreto',
    name: 'Kit Desejo Secreto',
    category: 'kits',
    shortDescription: 'Tudo o que precisas para surpreender.',
    description:
      'Um kit completo com seleção pensada para criar momentos inesquecíveis. Ideal para oferecer ou elevar a intimidade.',
    price: 49.9,
    compareAtPrice: 64.9,
    tags: ['kit', 'presente', 'casal', 'experiência'],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
  {
    id: 'vibrador-mini-discreto',
    slug: 'vibrador-mini-discreto',
    name: 'Vibrador Mini Discreto Pro',
    category: 'prazer',
    shortDescription: 'Pequeno, silencioso e extremamente eficaz.',
    description:
      'Design compacto e discreto com funcionamento silencioso. Perfeito para quem procura prazer com total privacidade.',
    price: 34.9,
    compareAtPrice: 44.9,
    tags: ['discreto', 'silencioso', 'prazer', 'compacto'],
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1f0?q=80&w=1200&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'kit-intimidade-luxo',
    slug: 'kit-intimidade-luxo',
    name: 'Kit Intimidade Luxo Premium',
    category: 'kits',
    shortDescription: 'Experiência completa para momentos intensos.',
    description:
      'Kit premium com seleção exclusiva para criar uma experiência íntima sofisticada, envolvente e memorável.',
    price: 64.9,
    compareAtPrice: 84.9,
    tags: ['luxo', 'premium', 'casal', 'experiência'],
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((product) => product.category === category);
};;
