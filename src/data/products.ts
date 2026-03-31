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
    name: 'Body Rendado Sedução',
    category: 'lingerie',
    shortDescription: 'Peça sensual e elegante para um visual marcante.',
    description:
      'Um body rendado pensado para valorizar a silhueta com sofisticação, conforto e um toque ousado.',
    price: 29.9,
    compareAtPrice: 36.9,
    tags: ['body', 'renda', 'sensual', 'lingerie'],
  },
  {
    id: 'conjunto-noite-privada',
    slug: 'conjunto-noite-privada',
    name: 'Conjunto Noite Privada',
    category: 'lingerie',
    shortDescription: 'Conjunto delicado para momentos íntimos e especiais.',
    description:
      'Um conjunto feminino de acabamento cuidado, criado para unir conforto, elegância e sedução.',
    price: 39.9,
    compareAtPrice: 47.9,
    tags: ['conjunto', 'lingerie', 'romântico', 'sedução'],
  },
  {
    id: 'oleo-massagem-veludo',
    slug: 'oleo-massagem-veludo',
    name: 'Óleo de Massagem Veludo',
    category: 'cosmetica',
    shortDescription: 'Textura suave e aroma envolvente para uma experiência sensorial.',
    description:
      'Óleo de massagem com toque sedoso e fragrância discreta, ideal para criar um ambiente íntimo e relaxante.',
    price: 18.9,
    tags: ['massagem', 'óleo', 'sensual', 'bem-estar'],
  },
  {
    id: 'vela-massagem-ambar',
    slug: 'vela-massagem-ambar',
    name: 'Vela de Massagem Âmbar',
    category: 'cosmetica',
    shortDescription: 'Ambiente quente e envolvente com um toque luxuoso.',
    description:
      'Uma vela aromática pensada para transformar o momento a dois numa experiência mais intensa e confortável.',
    price: 21.9,
    tags: ['vela', 'massagem', 'aroma', 'casal'],
  },
  {
    id: 'algemas-acetinadas',
    slug: 'algemas-acetinadas',
    name: 'Algemas Acetinadas',
    category: 'acessorios',
    shortDescription: 'Acessório discreto para explorar novas dinâmicas com conforto.',
    description:
      'Algemas de toque suave e ajuste confortável, ideais para quem quer experimentar com elegância e descrição.',
    price: 16.9,
    tags: ['acessório', 'jogo', 'fantasia', 'explorar'],
  },
  {
    id: 'kit-desejo-secreto',
    slug: 'kit-desejo-secreto',
    name: 'Kit Desejo Secreto',
    category: 'kits',
    shortDescription: 'Seleção pensada para oferecer ou surpreender.',
    description:
      'Um kit composto por essenciais sensuais para elevar a intimidade com discrição, estilo e curiosidade.',
    price: 49.9,
    compareAtPrice: 59.9,
    tags: ['kit', 'presente', 'íntimo', 'romântico'],
  },
  {
    id: 'vibrador-mini-discreto',
    slug: 'vibrador-mini-discreto',
    name: 'Vibrador Mini Discreto',
    category: 'prazer',
    shortDescription: 'Compacto, elegante e pensado para máxima discrição.',
    description:
      'Um artigo compacto e silencioso, ideal para quem procura prazer com uma abordagem discreta e sofisticada.',
    price: 34.9,
    compareAtPrice: 41.9,
    tags: ['prazer', 'discreto', 'silencioso', 'compacto'],
  },
  {
    id: 'kit-intimidade-luxo',
    slug: 'kit-intimidade-luxo',
    name: 'Kit Intimidade Luxo',
    category: 'kits',
    shortDescription: 'Experiência premium para momentos mais intensos.',
    description:
      'Uma combinação exclusiva de produtos pensada para criar uma experiência íntima envolvente, elegante e memorável.',
    price: 64.9,
    compareAtPrice: 79.9,
    tags: ['premium', 'kit', 'luxo', 'casal'],
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((product) => product.category === category);
};
