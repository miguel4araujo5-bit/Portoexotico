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
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import PoliticaCookies from './pages/PoliticaCookies';
import TermosCondicoes from './pages/TermosCondicoes';
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
