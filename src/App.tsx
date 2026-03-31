import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 md:px-10">
        <div className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            Porto Exótico
          </span>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Sensualidade com discrição, elegância e confiança.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Uma experiência de compra pensada para quem procura produtos íntimos
            com entrega discreta, navegação simples e um ambiente sofisticado.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]">
              Explorar produtos
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              Saber mais
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 text-sm text-white/70 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Envio discreto
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Pagamento seguro
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Seleção premium
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const PlaceholderPage: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-white/70">{description}</p>
        ) : null}
      </div>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Porto Exótico | Boutique Íntima Online</title>
        <meta
          name="description"
          content="Loja online discreta e elegante para produtos íntimos, com uma experiência premium, navegação simples e pagamentos seguros."
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/loja"
          element={
            <PlaceholderPage
              title="Loja"
              description="Aqui vais apresentar as categorias, filtros, produtos em destaque e acesso rápido ao carrinho."
            />
          }
        />
        <Route
          path="/produto/:slug"
          element={
            <PlaceholderPage
              title="Produto"
              description="Página individual do produto com imagens, descrição, preço, variantes e botão de adicionar ao carrinho."
            />
          }
        />
        <Route
          path="/carrinho"
          element={
            <PlaceholderPage
              title="Carrinho"
              description="Resumo da encomenda, quantidades, subtotal e ligação para checkout."
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <PlaceholderPage
              title="Checkout"
              description="Entrega, faturação e pagamento com uma experiência simples e segura."
            />
          }
        />
        <Route
          path="/sobre"
          element={
            <PlaceholderPage
              title="Sobre"
              description="História da marca, posicionamento, confiança e promessa de discrição."
            />
          }
        />
        <Route
          path="/contactos"
          element={
            <PlaceholderPage
              title="Contactos"
              description="Página com email, telefone, formulário e informação de apoio ao cliente."
            />
          }
        />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Página não encontrada"
              description="A página que procuras não existe ou foi movida."
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
