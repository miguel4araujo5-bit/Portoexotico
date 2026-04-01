import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock3,
  Instagram,
  Lock,
  Mail,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

const supportEmail: string = '';
const supportWhatsApp: string = '';
const instagramUrl: string = '';
const instagramHandle: string = '';

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
        href: `https://wa.me/${supportWhatsApp.replace(/\D/g, '')}`,
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
              <MessageCircle className="h-4 w-4" />
              Contactos
            </span>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Apoio ao cliente com discrição, clareza e atenção.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
              Se pretender esclarecimentos sobre artigos, encomendas, pagamentos ou apoio pós-venda,
              a Porto Exótico procura responder com atenção, reserva e uma experiência de contacto
              mais cuidada.
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
                    Esta página já está preparada. Assim que adicionar o email, o WhatsApp ou o
                    Instagram oficial no topo deste ficheiro, os canais passam a aparecer aqui
                    automaticamente.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Atendimento</h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  A comunicação da marca procura ser clara, cuidada e discreta, com atenção tanto ao
                  apoio pré-compra como ao acompanhamento pós-venda.
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
                <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Continue a explorar
                </span>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#6f2947]">
                  Descubra a coleção com total discrição e confiança.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Enquanto prepara os canais oficiais de contacto, a loja continua disponível para
                  explorar categorias, produtos e uma experiência de compra mais cuidada.
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
