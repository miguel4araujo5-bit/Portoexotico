import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPageView } from './lib/analytics';
import AgeGate from './components/common/AgeGate';
import CookieBanner from './components/common/CookieBanner';
import ChatWidget from './components/chat/ChatWidget';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/Sobre';
import Contactos from './pages/Contactos';
import PoliticaCookies from './pages/PoliticaCookies';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import AdminRoute from './components/admin/AdminRoute';

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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Política de Privacidade</h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75 md:text-[15px]">
          <p>
            A Porto Exótico respeita a sua privacidade e compromete-se a proteger os seus dados
            pessoais. Esta política explica como os seus dados podem ser recolhidos, utilizados e
            protegidos quando navega no nosso website ou realiza uma encomenda.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">1. Responsável pelo tratamento</h2>
            <p className="mt-2">
              A Porto Exótico é a entidade responsável pelo tratamento dos dados pessoais recolhidos
              através deste website.
            </p>
            <p className="mt-2">
              Para questões relacionadas com privacidade e proteção de dados, pode contactar-nos
              através do email: portoexotico@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Dados que podemos recolher</h2>
            <p className="mt-2">
              Podemos recolher dados de identificação, contacto, faturação, envio, histórico de
              encomendas, comunicações enviadas através do website e dados técnicos relacionados com
              a utilização da loja online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Finalidades do tratamento</h2>
            <p className="mt-2">Os seus dados podem ser utilizados para:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>processar encomendas, pagamentos, envios e devoluções;</li>
              <li>prestar apoio ao cliente;</li>
              <li>cumprir obrigações legais, contabilísticas e fiscais;</li>
              <li>prevenir fraude e reforçar a segurança da loja online;</li>
              <li>enviar comunicações de marketing, quando exista consentimento;</li>
              <li>melhorar a experiência de navegação e o desempenho do website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Fundamentos de licitude</h2>
            <p className="mt-2">
              O tratamento dos seus dados é realizado quando necessário para a execução do contrato,
              para o cumprimento de obrigações legais, para efeitos de interesses legítimos
              relacionados com a segurança e funcionamento do website, ou com base no seu
              consentimento quando aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Partilha de dados</h2>
            <p className="mt-2">
              Os seus dados podem ser partilhados com prestadores de serviços estritamente
              necessários ao funcionamento da loja, incluindo parceiros tecnológicos, operadores de
              pagamento, transportadoras, serviços de alojamento, segurança, apoio técnico e outras
              entidades subcontratadas para efeitos operacionais.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Conservação dos dados</h2>
            <p className="mt-2">
              Os dados pessoais são conservados apenas durante o período necessário para as
              finalidades para que foram recolhidos e para o cumprimento das obrigações legais
              aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Direitos dos titulares</h2>
            <p className="mt-2">
              Nos termos da lei, pode solicitar acesso, retificação, apagamento, limitação,
              portabilidade ou oposição ao tratamento dos seus dados, bem como retirar o seu
              consentimento quando esse for o fundamento aplicável.
            </p>
            <p className="mt-2">
              Pode exercer os seus direitos através do email portoexotico@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Segurança</h2>
            <p className="mt-2">
              Adotamos medidas técnicas e organizativas adequadas para proteger os dados pessoais
              contra perda, uso indevido, acesso não autorizado, divulgação indevida ou alteração.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Alterações</h2>
            <p className="mt-2">
              A presente Política de Privacidade pode ser atualizada a qualquer momento. A versão em
              vigor estará sempre disponível neste website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

const TermsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Termos e Condições</h1>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Porto Exótico | Boutique Íntima Online</title>
        <meta
          name="description"
          content="Loja online discreta e elegante para produtos íntimos, com uma experiência premium, navegação simples e pagamentos seguros."
        />
      </Helmet>

      {!isAdminRoute ? <Header /> : null}
      <AgeGate />
      {!isAdminRoute ? <CookieBanner /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Shop />} />
        <Route path="/produto/:slug" element={<Product />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/politica-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/termos-condicoes" element={<TermsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Página não encontrada"
              description="A página que procura não existe ou foi movida."
            />
          }
        />
      </Routes>

      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <ChatWidget /> : null}
    </>
  );
};

export default App;
