export type ProductCategory =
  | 'acessorios'
  | 'lubrificantes'
  | 'preservativos'
  | 'prazer'
  | 'excitacao';

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
  { value: 'prazer', label: 'Prazer' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'lubrificantes', label: 'Lubrificantes' },
  { value: 'preservativos', label: 'Preservativos' },
  { value: 'excitacao', label: 'Excitação' },
];

export const products: Product[] = [
  {
    id: 'satisfyer',
    slug: 'satisfyer',
    name: 'Satisfyer',
    category: 'prazer',
    shortDescription: 'Estimulação intensa, elegante e discreta para uma experiência premium.',
    description:
      'Um dos modelos mais procurados para prazer feminino, pensado para proporcionar uma experiência sofisticada, confortável e envolvente. Combina um design moderno com uma utilização intuitiva, ideal para quem valoriza discrição, eficácia e uma apresentação cuidada.',
    price: 49.9,
    compareAtPrice: 59.9,
    tags: ['satisfyer', 'prazer feminino', 'premium', 'mais vendido'],
    image: '/produtos/Satisfyer.webp',
    isBestSeller: true,
  },
  {
    id: 'varinha-magica',
    slug: 'varinha-magica',
    name: 'Varinha Mágica',
    category: 'prazer',
    shortDescription: 'Um clássico poderoso para momentos mais intensos e envolventes.',
    description:
      'Uma escolha muito procurada por quem prefere intensidade e presença numa só peça. Foi pensada para proporcionar uma experiência marcante, confortável e simples de integrar na rotina íntima, com um perfil visual apelativo e fácil utilização.',
    price: 39.9,
    compareAtPrice: 49.9,
    tags: ['varinha', 'vibrador', 'intenso', 'clássico'],
    image: '/produtos/VarinhaMagica.webp',
  },
  {
    id: 'varinha-magica-pro',
    slug: 'varinha-magica-pro',
    name: 'Varinha Mágica Pro',
    category: 'prazer',
    shortDescription: 'Versão mais intensa e premium para uma experiência superior.',
    description:
      'Uma evolução da versão clássica para quem procura mais potência, maior presença e uma sensação ainda mais envolvente. Mantém uma proposta premium, confortável e eficaz, orientada para quem não quer comprometer intensidade nem qualidade.',
    price: 59.9,
    compareAtPrice: 69.9,
    tags: ['varinha', 'pro', 'premium', 'prazer feminino'],
    image: '/produtos/VarinhaMagicaPro.webp',
    isBestSeller: true,
  },
  {
    id: 'vibrador-feminino',
    slug: 'vibrador-feminino',
    name: 'Vibrador Feminino',
    category: 'prazer',
    shortDescription: 'Design elegante e estimulação confortável para uso íntimo discreto.',
    description:
      'Um vibrador pensado para unir conforto, discrição e prazer numa proposta versátil. Ideal para quem procura uma peça prática, com uma apresentação cuidada e uma utilização simples, tanto para descoberta como para uso regular.',
    price: 27.9,
    compareAtPrice: 34.9,
    tags: ['vibrador', 'feminino', 'discreto', 'elegante'],
    image: '/produtos/VibradorFeminino.webp',
    isNew: true,
  },
  {
    id: 'vibrador-ohmama',
    slug: 'vibrador-ohmama',
    name: 'Vibrador Ohmama',
    category: 'prazer',
    shortDescription: 'Estimulação ousada com um visual moderno e provocador.',
    description:
      'Uma proposta pensada para quem procura uma experiência mais intensa e irreverente, com um perfil visual forte e uma utilização envolvente. Destaca-se pelo caráter moderno e pela forma como combina estética com prazer.',
    price: 34.9,
    compareAtPrice: 42.9,
    tags: ['ohmama', 'vibrador', 'intenso', 'moderno'],
    image: '/produtos/VibradorOhmama.webp',
  },
  {
    id: 'pocket-pussy',
    slug: 'pocket-pussy',
    name: 'Pocket Pussy',
    category: 'prazer',
    shortDescription: 'Textura envolvente para uma experiência masculina mais intensa.',
    description:
      'Uma peça íntima pensada para proporcionar uma experiência envolvente, prática e discreta, com foco em conforto e estimulação. A proposta é simples: oferecer uma sensação mais intensa com um formato compacto e uma utilização reservada.',
    price: 29.9,
    compareAtPrice: 36.9,
    tags: ['masculino', 'estimulação', 'prazer', 'discreto'],
    image: '/produtos/PocketPussy.webp',
  },
  {
    id: 'peineili',
    slug: 'peineili',
    name: 'Peineili',
    category: 'prazer',
    shortDescription: 'Peça íntima orientada para prazer direto, simples e confortável.',
    description:
      'Um produto pensado para utilização íntima com foco em conforto, simplicidade e prazer. Adequado para quem valoriza discrição, funcionalidade e uma abordagem mais prática, sem abdicar de uma experiência envolvente.',
    price: 24.9,
    compareAtPrice: 31.9,
    tags: ['prazer', 'íntimo', 'discreto', 'estimulação'],
    image: '/produtos/Peineili.webp',
    isNew: true,
  },
  {
    id: 'anel-peniano',
    slug: 'anel-peniano',
    name: 'Anel Peniano',
    category: 'excitacao',
    shortDescription: 'Mais intensidade, controlo e estimulação em momentos a dois.',
    description:
      'Um acessório pensado para reforçar a experiência íntima, promovendo maior intensidade e uma sensação mais envolvente de forma simples e discreta. Uma boa escolha para quem pretende explorar novas dinâmicas com confiança.',
    price: 14.9,
    compareAtPrice: 18.9,
    tags: ['anel', 'peniano', 'estimulação', 'casal'],
    image: '/produtos/AnelPeniano.webp',
  },
  {
    id: 'spray-retardante',
    slug: 'spray-retardante',
    name: 'Spray Retardante',
    category: 'excitacao',
    shortDescription: 'Ajuda a prolongar o momento com maior controlo e confiança.',
    description:
      'Uma solução prática para quem procura gerir melhor o ritmo da experiência íntima, reforçando a confiança e a duração do momento. Fácil de integrar e pensada para um uso mais simples, reservado e confortável.',
    price: 13.9,
    compareAtPrice: 17.9,
    tags: ['retardante', 'controlo', 'masculino', 'prazer'],
    image: '/produtos/SprayRetardante.webp',
  },
  {
    id: 'algemas-bondage',
    slug: 'algemas-bondage',
    name: 'Algemas Bondage',
    category: 'acessorios',
    shortDescription: 'Exploração ousada com conforto, estética e discrição.',
    description:
      'Um acessório pensado para introduzir novas dinâmicas de forma cuidada, elegante e envolvente. Ideal para quem procura variedade, fantasia e exploração com uma apresentação apelativa e maior sensação de confiança.',
    price: 19.9,
    compareAtPrice: 24.9,
    tags: ['bondage', 'algemas', 'fantasia', 'casal'],
    image: '/produtos/AlgemasBondage.webp',
  },
  {
    id: 'petazetas',
    slug: 'petazetas',
    name: 'Petazetas',
    category: 'acessorios',
    shortDescription: 'Um toque divertido e inesperado para apimentar o ambiente.',
    description:
      'Um complemento irreverente para criar momentos mais leves, descontraídos e sensoriais. Ideal para acrescentar surpresa, humor e provocação à experiência, seja a solo ou em casal.',
    price: 4.9,
    compareAtPrice: 6.9,
    tags: ['diversão', 'casal', 'acessório', 'surpresa'],
    image: '/produtos/Petazetas.webp',
    isNew: true,
  },
  {
    id: 'lubrificantes-sabores',
    slug: 'lubrificantes-sabores',
    name: 'Lubrificantes Sabores',
    category: 'lubrificantes',
    shortDescription: 'Mais fluidez, conforto e um lado sensorial mais provocador.',
    description:
      'Uma opção pensada para elevar a experiência íntima com maior conforto, melhor deslizamento e um toque divertido e sedutor. Muito procurado por quem quer juntar praticidade, sensação e um perfil mais sensorial.',
    price: 12.9,
    compareAtPrice: 15.9,
    tags: ['lubrificante', 'sabores', 'sensorial', 'casal'],
    image: '/produtos/LubrificantesSabores.webp',
    isBestSeller: true,
  },
  {
    id: 'preservativos-sensoriais',
    slug: 'preservativos-sensoriais',
    name: 'Preservativos Sensoriais',
    category: 'preservativos',
    shortDescription: 'Proteção com conforto e uma experiência mais estimulante.',
    description:
      'Pensados para unir segurança, conforto e sensorialidade, tornando a experiência mais protegida sem abdicar do prazer. Uma escolha equilibrada para quem procura confiança, conforto e uma utilização mais agradável.',
    price: 8.9,
    compareAtPrice: 11.9,
    tags: ['preservativos', 'proteção', 'sensorial', 'casal'],
    image: '/produtos/PreservativosSensoriais.webp',
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((product) => product.category === category);
};
