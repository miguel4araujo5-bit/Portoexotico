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
    shortDescription: 'Valoriza a silhueta com elegância, conforto e um efeito marcante.',
    description:
      'Um body rendado pensado para realçar a silhueta com sofisticação e confiança. A combinação entre detalhe visual, conforto e sensualidade faz desta peça uma escolha ideal para momentos especiais ou para elevar a autoestima com um toque mais ousado.',
    price: 29.9,
    compareAtPrice: 39.9,
    tags: ['lingerie', 'sensual', 'elegante', 'mais vendido'],
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
  {
    id: 'conjunto-noite-privada',
    slug: 'conjunto-noite-privada',
    name: 'Conjunto Noite Privada Deluxe',
    category: 'lingerie',
    shortDescription: 'Uma escolha delicada e envolvente para momentos a dois.',
    description:
      'Conjunto pensado para unir conforto, suavidade e presença visual. Ideal para quem procura uma peça elegante, feminina e confortável, capaz de transformar um momento íntimo numa experiência mais cuidada e memorável.',
    price: 39.9,
    compareAtPrice: 49.9,
    tags: ['lingerie', 'romântico', 'para casal', 'novo'],
    image: 'https://images.unsplash.com/photo-1593032465171-8f0b0f92c9c8?q=80&w=1200&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'oleo-massagem-veludo',
    slug: 'oleo-massagem-veludo',
    name: 'Óleo de Massagem Veludo Sensorial',
    category: 'cosmetica',
    shortDescription: 'Textura sedosa e aroma envolvente para um ritual mais sensorial.',
    description:
      'Óleo de massagem com textura suave e deslizamento confortável sobre a pele. Foi pensado para criar uma experiência mais relaxante, íntima e envolvente, ideal para momentos de conexão, cuidado e bem-estar a dois.',
    price: 18.9,
    compareAtPrice: 24.9,
    tags: ['massagem', 'sensorial', 'relaxamento', 'para casal'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'vela-massagem-ambar',
    slug: 'vela-massagem-ambar',
    name: 'Vela de Massagem Âmbar Quente',
    category: 'cosmetica',
    shortDescription: 'Cria ambiente, calor e uma sensação envolvente na pele.',
    description:
      'Uma vela de massagem concebida para transformar o ambiente e intensificar a experiência sensorial. Ao derreter, converte-se num óleo quente e agradável ao toque, ideal para massagens mais íntimas, relaxantes e memoráveis.',
    price: 21.9,
    compareAtPrice: 27.9,
    tags: ['vela', 'massagem', 'ambiente', 'bem-estar'],
    image: 'https://images.unsplash.com/photo-1603006905393-c0d78e7c1d4d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'algemas-acetinadas',
    slug: 'algemas-acetinadas',
    name: 'Algemas Acetinadas Comfort',
    category: 'acessorios',
    shortDescription: 'Uma forma elegante e confortável de explorar novas dinâmicas.',
    description:
      'Algemas com acabamento acetinado, ajustáveis e concebidas para maior conforto. São uma opção interessante para quem pretende introduzir variedade, fantasia e novas dinâmicas de forma mais cuidada, estética e segura.',
    price: 16.9,
    compareAtPrice: 22.9,
    tags: ['acessório', 'fantasia', 'para casal', 'exploração'],
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'kit-desejo-secreto',
    slug: 'kit-desejo-secreto',
    name: 'Kit Desejo Secreto',
    category: 'kits',
    shortDescription: 'Uma seleção prática e envolvente para surpreender com discrição.',
    description:
      'Kit pensado para reunir vários elementos numa única escolha, tornando a compra mais simples e completa. É uma opção excelente para oferecer, surpreender ou criar um momento especial com mais variedade, conforto e intenção.',
    price: 49.9,
    compareAtPrice: 64.9,
    tags: ['kit', 'presente', 'para casal', 'mais vendido'],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
  {
    id: 'vibrador-mini-discreto',
    slug: 'vibrador-mini-discreto',
    name: 'Vibrador Mini Discreto Pro',
    category: 'prazer',
    shortDescription: 'Compacto, silencioso e pensado para uma utilização discreta.',
    description:
      'Modelo de dimensões reduzidas, fácil de guardar e concebido para uma experiência mais reservada. O formato compacto e o funcionamento discreto tornam-no uma escolha muito procurada por quem valoriza privacidade, simplicidade e conforto.',
    price: 34.9,
    compareAtPrice: 44.9,
    tags: ['discreto', 'silencioso', 'compacto', 'novo'],
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1f0?q=80&w=1200&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'kit-intimidade-luxo',
    slug: 'kit-intimidade-luxo',
    name: 'Kit Intimidade Luxo Premium',
    category: 'kits',
    shortDescription: 'Uma experiência mais completa para momentos intensos e sofisticados.',
    description:
      'Kit premium criado para proporcionar uma experiência íntima mais envolvente, cuidada e memorável. A seleção foi pensada para quem procura variedade, apresentação elegante e uma solução mais completa numa única compra.',
    price: 64.9,
    compareAtPrice: 84.9,
    tags: ['luxo', 'premium', 'experiência', 'mais vendido'],
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop',
    isBestSeller: true,
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((product) => product.category === category);
};
