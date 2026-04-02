import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock3,
  Instagram,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

const supportEmail = 'portoexotico@gmail.com';
const supportWhatsApp = '';
const instagramUrl = '';
const instagramHandle = '';
const locationLabel = 'São Mamede de Infesta';
const mapEmbedSrc =
  'https://www.google.com/maps?q=S%C3%A3o%20Mamede%20de%20Infesta&z=13&output=embed';
const mapExternalUrl =
  'https://www.google.com/maps/search/?api=1&query=S%C3%A3o%20Mamede%20de%20Infesta';
const supportWhatsAppDigits = supportWhatsApp.replace(/\D/g, '');
const logoSrc = '/logo.png';

const channels = [
  supportEmail
    ? {
        label: 'Email',
        value: supportEmail,
        href: `mailto:${supportEmail}`,
        icon: Mail,
      }
    : null,
  supportWhatsApp
    ? {
        label: 'WhatsApp',
        value: supportWhatsApp,
        href: `https://wa.me/${supportWhatsAppDigits}`,
        icon: MessageCircle,
      }
    : null,
  instagramUrl && instagramHandle
    ? {
        label: 'Instagram',
        value: instagramHandle,
        href: instagramUrl,
        icon: Instagram,
      }
    : null,
].filter(Boolean) as Array<{
  label: string;
  value: string;
  href: string;
  icon: typeof Mail;
}>;

const Contactos: React.FC = () => {
  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute right-[-8%] top-[12%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_42%),linear-gradient(180deg,rgba(252,248,250,0.94),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(143,53,93,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(143,53,93,0.14)]"
              >
                <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.02em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
                <MessageCircle className="h-4 w-4" />
                Contactos
              </span>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Apoio ao cliente com discrição, clareza e atenção.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
              Se pretender esclarecimentos sobre artigos, encomendas, pagamentos ou apoio pós-venda,
              a Porto Exótico procura responder com atenção, reserva e uma experiência de contacto
              mais cuidada. A marca está baseada em São Mamede de Infesta, na zona do Porto, com
              contacto disponível por email e com contacto telefónico disponível em breve.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <ShoppingBag className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Encomendas e compras</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Esclarecimentos sobre artigos, disponibilidade, carrinho e processo de compra.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <ShieldCheck className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Pagamentos e segurança</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Informação sobre checkout, métodos de pagamento e uma experiência de compra segura.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <Lock className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Privacidade e discrição</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Questões relacionadas com embalagem, envio discreto e confidencialidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fffafb]">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Canais oficiais
                </span>

                {channels.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {channels.map((channel) => {
                      const Icon = channel.icon;

                      return (
                        <a
                          key={channel.label}
                          href={channel.href}
                          target={channel.label === 'Instagram' ? '_blank' : undefined}
                          rel={channel.label === 'Instagram' ? 'noreferrer' : undefined}
                          className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] px-5 py-4 transition duration-300 hover:border-[#8f355d]/25 hover:bg-white"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/10 bg-white text-[#8f355d]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-medium text-[#6f2947]">{channel.label}</p>
                              <p className="mt-1 text-sm text-neutral-600">{channel.value}</p>
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-[#8f355d]" />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#8f355d]/15 bg-[#fffafb] p-6">
                    <p className="text-sm font-medium text-[#6f2947]">Canais de contacto a configurar</p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
                      Esta página já está preparada. O email oficial já pode ser disponibilizado e o
                      contacto telefónico será adicionado em breve, juntamente com outros canais
                      oficiais da marca.
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Localização</h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  A Porto Exótico está baseada em {locationLabel}, na zona do Porto, apresentando,
                  para já, apenas uma referência geográfica geral, sem divulgação de morada exata ou
                  ponto físico de atendimento.
                </p>

                <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[#8f355d]/10 bg-[#fffafb]">
                  <iframe
                    src={mapEmbedSrc}
                    title={`Mapa de ${locationLabel}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full border-0"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-7 text-neutral-600">
                    Mapa meramente indicativo da zona de São Mamede de Infesta.
                  </p>

                  <a
                    href={mapExternalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-[#fffafb] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-white"
                  >
                    Abrir mapa
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Atendimento</h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  A comunicação da marca procura ser clara, cuidada e discreta, com atenção tanto ao
                  apoio pré-compra como ao acompanhamento pós-venda. O email está disponível como
                  canal de contacto e o número de telemóvel será disponibilizado em breve.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Apoio à compra</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Esclarecimentos sobre artigos, categorias, escolha e processo de encomenda.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Apoio pós-venda</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Informação relacionada com acompanhamento, confiança e experiência de compra.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Privacidade</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Uma abordagem reservada e orientada para discrição em toda a comunicação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(143,53,93,0.08)]"
                  >
                    <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                    <div className="min-w-0">
                      <span className="block font-serif text-lg font-semibold leading-none tracking-[0.02em] text-[#7a2f4f]">
                        Porto Exótico
                      </span>
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a55b7d]">
                        Compra discreta e segura
                      </span>
                    </div>
                  </Link>

                  <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                    Continue a explorar
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#6f2947]">
                  Descubra a coleção com total discrição e confiança.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Enquanto o contacto telefónico não fica disponível, a loja continua aberta para
                  explorar categorias, produtos e uma experiência de compra mais cuidada, com apoio
                  por email já ativo.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/loja"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
                  >
                    Descobrir a loja
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/sobre"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-[#fffafb] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-white"
                  >
                    Saber mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contactos;
