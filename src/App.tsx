import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPageView } from './lib/analytics';
import AgeGate from './components/common/AgeGate';
import CookieBanner from './components/common/CookieBanner';
import ScrollToTop from './components/common/ScrollToTop';
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
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import PoliticaCookies from './pages/PoliticaCookies';
import TermosCondicoes from './pages/TermosCondicoes';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import AdminRoute from './components/admin/AdminRoute';

const siteUrl = 'https://www.portoexotico.pt';
const defaultTitle = 'Porto Exótico | Boutique Íntima Online';
const defaultDescription =
  'Loja online discreta e elegante para produtos íntimos, com uma experiência premium, navegação simples e pagamentos seguros.';
const defaultImage = `${siteUrl}/og-image.jpg?v=1`;

const PlaceholderPage: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <Helmet>
        <title>Página não encontrada | Porto Exótico</title>
        <meta
          name="description"
          content="A página que procura não existe ou foi movida. Explore a boutique íntima online Porto Exótico."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={`${siteUrl}/404`} />
      </Helmet>

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
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');
  const currentUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    trackPageView(location.pathname + location.search + location.hash, document.title);
  }, [isAdminRoute, location.pathname, location.search, location.hash]);

  return (
    <>
      <ScrollToTop />

      <Helmet>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="application-name" content="Porto Exótico" />
        <meta name="apple-mobile-web-app-title" content="Porto Exótico" />
        <meta name="theme-color" content="#8f355d" />
        {!isAdminRoute ? <meta name="robots" content="index,follow" /> : null}
        {!isAdminRoute ? <link rel="canonical" href={currentUrl} /> : null}

        <meta property="og:site_name" content="Porto Exótico" />
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:image:secure_url" content={defaultImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Porto Exótico - Boutique Íntima Online" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />
        <meta name="twitter:image:alt" content="Porto Exótico - Boutique Íntima Online" />
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
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/termos-condicoes" element={<TermosCondicoes />} />
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
