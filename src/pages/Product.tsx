import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, CreditCard, Lock, PackageCheck } from 'lucide-react';
import { getProductBySlug, productCategories } from '../data/products';
import { useCart } from '../context/CartContext';

const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart, isInCart, getItemQuantity } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fcf8fa] px-6 py-16 text-neutral-900 md:px-10">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full border border-[#8f355d]/10 bg-white px-4 py-1 text-xs uppercase tracking-[0.3em] text-[#9b5a79]">
            Produto
          </span>

          <h1 className="mt-6 text-3xl font-semibold text-[#6f2947] md:text-5xl">
            Produto não encontrado
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700">
            O artigo que procura não está disponível ou foi removido da loja.
          </p>

          <Link
            to="/loja"
            className="mt-8 inline-flex items-center rounded-full bg-[#8f355d] px-6 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:bg-[#7d2f52]"
          >
            Voltar à loja
          </Link>
        </div>
      </main>
    );
  }

  const categoryLabel =
    productCategories.find((category) => category.value === product.category)?.label ??
    product.category;

  const quantityInCart = getItemQuantity(product.id);
  const alreadyInCart = isInCart(product.id);

  return (
    <main className="min-h-screen bg-[#fcf8fa] px-6 py-16 text-neutral-900 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="overflow-hidden rounded-[2rem] border border-[#8f355d]/10 bg-white shadow-[0_20px_60px_rgba(143,53,93,0.08)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f7edf2]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,10,18,0.02),rgba(44,12,28,0.34))]" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7a2f4f] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                {categoryLabel}
              </span>

              {product.isNew ? (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f2947] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                  Novo
                </span>
              ) : null}

              {product.isBestSeller ? (
                <span className="rounded-full bg-[#8f355d] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(143,53,93,0.24)]">
                  Best Seller
                </span>
              ) : null}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="max-w-lg rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/80">
                  Porto Exótico
                </span>

                <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                  {product.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/80">
                  Seleção cuidada para quem valoriza discrição, conforto e uma experiência de compra
                  mais segura.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center">
          <span className="inline-block w-fit rounded-full border border-[#8f355d]/10 bg-white px-4 py-1 text-xs uppercase tracking-[0.3em] text-[#9b5a79]">
            {categoryLabel}
          </span>

          <h1 className="mt-6 text-3xl font-semibold text-[#6f2947] md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-semibold text-[#6f2947] md:text-3xl">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>

            {product.compareAtPrice ? (
              <span className="text-base text-neutral-400 line-through">
                {product.compareAtPrice.toFixed(2).replace('.', ',')} €
              </span>
            ) : null}
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-800">
            {product.shortDescription}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
            {product.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="text-sm font-medium text-[#6f2947]">Escolha confiante</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Um artigo pensado para uma experiência mais confortável, simples e discreta.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="text-sm font-medium text-[#6f2947]">Privacidade em primeiro lugar</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    A compra é apresentada com discrição, reserva e foco total no seu conforto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#9b5a79] shadow-[0_8px_24px_rgba(143,53,93,0.05)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex items-center justify-center rounded-full bg-[#8f355d] px-6 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
            >
              {alreadyInCart ? 'Adicionar mais ao carrinho' : 'Adicionar ao carrinho'}
            </button>

            <Link
              to="/loja"
              className="inline-flex items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-6 py-3 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-[#fff7fb]"
            >
              Continuar a explorar
            </Link>
          </div>

          {quantityInCart > 0 ? (
            <p className="mt-4 text-sm text-neutral-600">
              Já tem {quantityInCart} unidade{quantityInCart > 1 ? 's' : ''} deste artigo no
              carrinho.
            </p>
          ) : null}

          <div className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-[#8f355d]/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="font-medium text-[#6f2947]">Envio discreto</p>
                  <p className="mt-1 leading-6 text-neutral-600">
                    Embalagem neutra e maior privacidade em cada encomenda.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#8f355d]/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="font-medium text-[#6f2947]">Compra segura</p>
                  <p className="mt-1 leading-6 text-neutral-600">
                    Um processo de compra simples, claro e pensado para gerar confiança.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#8f355d]/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="font-medium text-[#6f2947]">Privacidade garantida</p>
                  <p className="mt-1 leading-6 text-neutral-600">
                    Uma experiência reservada, elegante e discreta do início ao fim.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-[#8f355d]/10 bg-white px-6 py-6 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#a55b7d]">
              Porque escolher este artigo
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#6f2947]">
              Uma escolha pensada para comprar com mais segurança e menos hesitação.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Esta seleção foi pensada para quem procura qualidade, discrição e uma apresentação
              cuidada. A informação essencial está organizada para facilitar a decisão e tornar a
              compra mais simples, confortável e confiante.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition hover:text-[#8f355d]"
            >
              Ir para checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Product;
