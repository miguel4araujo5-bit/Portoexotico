import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CreditCard,
  HeartHandshake,
  Lock,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute bottom-[-14%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_38%),linear-gradient(180deg,rgba(252,248,250,0.92),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative py-16 md:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
              <Sparkles className="h-4 w-4" />
              Sobre a Porto Exótico
            </span>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Uma loja pensada para comprar com discrição, conforto e confiança.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
              A Porto Exótico nasce com um objetivo claro: oferecer uma experiência de compra
              íntima mais elegante, reservada e segura. Cada detalhe da loja foi pensado para
              transmitir confiança, facilitar a escolha e valorizar a privacidade de quem compra.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-700">
                Compra segura
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Envio discreto
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Seleção cuidada
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <Lock className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Discrição em primeiro lugar</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                A experiência foi desenhada para transmitir reserva, conforto e serenidade em cada
                etapa da compra.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <HeartHandshake className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Escolha mais confiante</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                A seleção privilegia artigos com apelo visual, conforto e uma apresentação mais
                clara, para reduzir hesitação e facilitar a decisão.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <ShieldCheck className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Experiência mais segura</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                A navegação, a linguagem e o processo de compra foram pensados para transmitir
                clareza, confiança e simplicidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fffafb]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
              Porque escolher a Porto Exótico
            </span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
              Uma marca pensada para vender com elegância e servir com discrição.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
              Mais do que apresentar produtos, a Porto Exótico procura criar uma experiência mais
              cuidada, mais confortável e mais respeitadora da privacidade de cada cliente.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_14px_34px_rgba(143,53,93,0.06)]">
              <PackageCheck className="h-5 w-5 text-[#8f355d]" />
              <p className="mt-4 text-sm font-medium text-[#6f2947]">Envio discreto</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Embalagem neutra e uma apresentação exterior mais reservada.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_14px_34px_rgba(143,53,93,0.06)]">
              <CreditCard className="h-5 w-5 text-[#8f355d]" />
              <p className="mt-4 text-sm font-medium text-[#6f2947]">Compra segura</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Um processo simples, claro e pensado para gerar confiança.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_14px_34px_rgba(143,53,93,0.06)]">
              <Sparkles className="h-5 w-5 text-[#8f355d]" />
              <p className="mt-4 text-sm font-medium text-[#6f2947]">Seleção premium</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Uma curadoria mais elegante, orientada para conforto, estética e intenção de compra.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_14px_34px_rgba(143,53,93,0.06)]">
              <Lock className="h-5 w-5 text-[#8f355d]" />
              <p className="mt-4 text-sm font-medium text-[#6f2947]">Privacidade garantida</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Uma experiência mais reservada, cuidada e pensada para o seu conforto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#8f355d]/10 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(143,53,93,0.08)] md:px-10 md:py-14">
            <div className="absolute inset-0">
              <div className="absolute left-[-10%] top-0 h-52 w-52 rounded-full bg-[#b24d79]/10 blur-3xl" />
              <div className="absolute bottom-[-10%] right-0 h-44 w-44 rounded-full bg-[#e7c9a5]/16 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Descubra a coleção
                </span>
                <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
                  Explore uma experiência de compra discreta, segura e mais confiante.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
                  Entre na loja e descubra uma seleção pensada para diferentes preferências,
                  momentos e estilos, sempre com foco em discrição e conforto.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/loja"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
                >
                  Descobrir a loja
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contactos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-[#fffafb] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-white"
                >
                  Falar connosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
