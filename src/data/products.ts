export type ProductCategory =
  | 'lingerie'
  | 'acessorios'
  | 'prazer'
  | 'kits'
  | 'cosmetica';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  image: string;
  featured?: boolean;
  inStock: boolean;
  tags: string[];
};

export const productCategories: { value: ProductCategory; label: string }[] = [
  { value: 'lingerie', label: 'Lingerie Sensual' },
  { value: 'acessorios', label: 'Acessórios Íntimos' },
  { value: 'prazer', label: 'Prazer & Intimidade' },
  { value: 'kits', label: 'Kits Especiais' },
  { value: 'cosmetica', label: 'Cosmética Sensual' },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'body-rendado-seducao',
    name: 'Body Rendado Sedução',
    category: 'lingerie',
    price: 29.9,
    compareAtPrice: 39.9,
    shortDescription: 'Uma peça marcante para noites mais ousadas.',
    description:
      'Body rendado com corte elegante e detalhes envolventes, pensado para realçar a silhueta com sofisticação e sensualidade.',
    image: '/images/products/body-rendado-seducao.jpg',
    featured: true,
    inStock: true,
    tags: ['renda', 'sensual', 'elegante'],
  },
  {
    id: 'prod-002',
    slug: 'conjunto-noite-de-cetim',
    name: 'Conjunto Noite de Cetim',
    category: 'lingerie',
    price: 34.9,
    compareAtPrice: 44.9,
    shortDescription: 'Suavidade, brilho e um toque irresistível.',
    description:
      'Conjunto em cetim com acabamento delicado e caimento sedutor, ideal para criar um ambiente íntimo mais especial.',
    image: '/images/products/conjunto-noite-de-cetim.jpg',
    featured: true,
    inStock: true,
    tags: ['cetim', 'luxo', 'noite'],
  },
  {
    id: 'prod-003',
    slug: 'kit-noite-privada',
    name: 'Kit Noite Privada',
    category: 'kits',
    price: 44.9,
    compareAtPrice: 54.9,
    shortDescription: 'Uma combinação pensada para surpreender.',
    description:
      'Kit especial com seleção de artigos para tornar qualquer momento mais íntimo, intenso e memorável.',
    image: '/images/products/kit-noite-privada.jpg',
    featured: true,
    inStock: true,
    tags: ['kit', 'presente', 'casal'],
  },
  {
    id: 'prod-004',
    slug: 'algemas-acolchoadas-deluxe',
    name: 'Algemas Acolchoadas Deluxe',
    category: 'acessorios',
    price: 18.9,
    shortDescription: 'Conforto e provocação no equilíbrio certo.',
    description:
      'Algemas acolchoadas com toque suave e fecho ajustável, ideais para explorar novas dinâmicas com conforto.',
    image: '/images/products/algemas-acolchoadas-deluxe.jpg',
    featured: false,
    inStock: true,
    tags: ['acessório', 'provocação', 'conforto'],
  },
  {
    id: 'prod-005',
    slug: 'oleo-massagem-veludo-quente',
    name: 'Óleo de Massagem Veludo Quente',
    category: 'cosmetica',
    price: 16.9,
    shortDescription: 'Textura suave para um ritual mais íntimo.',
    description:
      'Óleo de massagem com aroma envolvente e toque sedoso, perfeito para criar uma experiência sensorial relaxante e sensual.',
    image: '/images/products/oleo-massagem-veludo-quente.jpg',
    featured: false,
    inStock: true,
    tags: ['massagem', 'aroma', 'sensorial'],
  },
  {
    id: 'prod-006',
    slug: 'vela-sensual-morango',
    name: 'Vela Sensual Morango',
    category: 'cosmetica',
    price: 14.9,
    shortDescription: 'Ambiente, aroma e desejo no mesmo gesto.',
    description:
      'Vela aromática pensada para elevar a atmosfera do momento, com fragrância doce e envolvente.',
    image: '/images/products/vela-sensual-morango.jpg',
    featured: false,
    inStock: true,
    tags: ['vela', 'ambiente', 'romântico'],
  },
  {
    id: 'prod-007',
    slug: 'mini-vibrador-eclipse',
    name: 'Mini Vibrador Eclipse',
    category: 'prazer',
    price: 27.9,
    compareAtPrice: 34.9,
    shortDescription: 'Discreto, elegante e poderoso.',
    description:
      'Design compacto e toque suave para uma experiência discreta, confortável e intensa.',
    image: '/images/products/mini-vibrador-eclipse.jpg',
    featured: true,
    inStock: true,
    tags: ['discreto', 'compacto', 'intenso'],
  },
  {
    id: 'prod-008',
    slug: 'estimulador-lunar-silence',
    name: 'Estimulador Lunar Silence',
    category: 'prazer',
    price: 49.9,
    compareAtPrice: 59.9,
    shortDescription: 'Prazer sofisticado com discrição total.',
    description:
      'Estimulador elegante com acabamento premium e funcionamento silencioso para momentos mais privados.',
    image: '/images/products/estimulador-lunar-silence.jpg',
    featured: true,
    inStock: true,
    tags: ['silencioso', 'premium', 'moderno'],
  },
  {
    id: 'prod-009',
    slug: 'plug-cristal-noir',
    name: 'Plug Cristal Noir',
    category: 'acessorios',
    price: 22.9,
    shortDescription: 'Um detalhe ousado com acabamento sofisticado.',
    description:
      'Peça elegante com base decorativa e design pensado para aliar estética, conforto e provocação.',
    image: '/images/products/plug-cristal-noir.jpg',
    featured: false,
    inStock: true,
    tags: ['luxo', 'ousado', 'elegante'],
  },
  {
    id: 'prod-010',
    slug: 'kit-descoberta-a-dois',
    name: 'Kit Descoberta a Dois',
    category: 'kits',
    price: 59.9,
    compareAtPrice: 69.9,
    shortDescription: 'Para explorar novas sensações em conjunto.',
    description:
      'Seleção pensada para casais que querem experimentar, divertir-se e aprofundar a intimidade com leveza e desejo.',
    image: '/images/products/kit-descoberta-a-dois.jpg',
    featured: true,
    inStock: true,
    tags: ['casal', 'descoberta', 'experiência'],
  },
  {
    id: 'prod-011',
    slug: 'mascara-rendada-midnight',
    name: 'Máscara Rendada Midnight',
    category: 'acessorios',
    price: 12.9,
    shortDescription: 'Mistério, charme e provocação.',
    description:
      'Máscara rendada delicada para criar uma atmosfera de fantasia, sensualidade e jogo visual.',
    image: '/images/products/mascara-rendada-midnight.jpg',
    featured: false,
    inStock: true,
    tags: ['máscara', 'fantasia', 'sedução'],
  },
  {
    id: 'prod-012',
    slug: 'gel-intimo-sensacao-heat',
    name: 'Gel Íntimo Sensação Heat',
    category: 'cosmetica',
    price: 13.9,
    shortDescription: 'Um toque extra para momentos mais intensos.',
    description:
      'Gel íntimo com efeito envolvente, pensado para aumentar a sensibilidade e enriquecer a experiência.',
    image: '/images/products/gel-intimo-sensacao-heat.jpg',
    featured: false,
    inStock: true,
    tags: ['gel', 'intimidade', 'sensações'],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getProductsByCategory = (category: ProductCategory) =>
  products.filter((product) => product.category === category);
