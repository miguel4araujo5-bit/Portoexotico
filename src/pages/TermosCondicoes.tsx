import React from 'react';

const TermosCondicoes: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Termos e Condições</h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75 md:text-[15px]">
          <p>
            Os presentes Termos e Condições regulam o acesso, navegação e utilização do website da
            Porto Exótico, bem como as condições aplicáveis às compras realizadas através da loja
            online.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">1. Identificação</h2>
            <p className="mt-2">
              A Porto Exótico disponibiliza este website com o objetivo de apresentar e comercializar
              produtos através de uma experiência de compra online discreta, segura e simples.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Objeto</h2>
            <p className="mt-2">
              Estes termos definem as regras aplicáveis à utilização do website, à consulta de
              conteúdos, ao registo e submissão de encomendas, bem como às relações estabelecidas
              entre a Porto Exótico e o cliente no contexto da compra online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Condições de utilização</h2>
            <p className="mt-2">
              O utilizador compromete-se a utilizar este website de forma responsável, lícita e em
              conformidade com a legislação aplicável, abstendo-se de praticar atos que possam
              comprometer a integridade, segurança, funcionamento ou reputação da loja online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Produtos e informação</h2>
            <p className="mt-2">
              A Porto Exótico procura assegurar que toda a informação apresentada sobre os produtos,
              incluindo descrições, imagens, preços e disponibilidade, é clara e atualizada.
              Contudo, podem ocorrer lapsos, erros pontuais ou alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Preços</h2>
            <p className="mt-2">
              Os preços apresentados no website são indicados em euros. A Porto Exótico reserva-se o
              direito de atualizar preços, campanhas, condições promocionais e custos associados ao
              processo de compra sempre que necessário.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Encomendas</h2>
            <p className="mt-2">
              A submissão de uma encomenda representa a intenção de compra dos produtos selecionados,
              sujeita à confirmação da disponibilidade, validação dos dados fornecidos e aceitação
              final da encomenda.
            </p>
            <p className="mt-2">
              A Porto Exótico reserva-se o direito de não aceitar ou cancelar encomendas em casos
              devidamente fundamentados, incluindo indisponibilidade de stock, erro manifesto de
              preço ou suspeita de utilização indevida da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Pagamentos</h2>
            <p className="mt-2">
              O website poderá disponibilizar diferentes métodos de pagamento, os quais serão
              apresentados ao cliente no checkout de acordo com a configuração ativa da loja no
              momento da compra.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Envios e entrega</h2>
            <p className="mt-2">
              As condições de envio, prazos estimados de entrega e eventuais custos aplicáveis serão
              apresentados durante o processo de checkout ou comunicados ao cliente no contexto da
              encomenda.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Privacidade e cookies</h2>
            <p className="mt-2">
              A utilização do website está também sujeita à Política de Privacidade e à Política de
              Cookies da Porto Exótico, que devem ser lidas em conjunto com os presentes Termos e
              Condições.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">10. Propriedade intelectual</h2>
            <p className="mt-2">
              Os conteúdos do website, incluindo textos, imagens, elementos gráficos, identidade
              visual e estrutura de apresentação, encontram-se protegidos nos termos legais
              aplicáveis e não podem ser utilizados, reproduzidos ou distribuídos sem autorização
              prévia, salvo quando permitido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">11. Limitação de responsabilidade</h2>
            <p className="mt-2">
              A Porto Exótico não garante que o website funcione de forma ininterrupta ou livre de
              erros, embora adote medidas adequadas para assegurar a estabilidade, segurança e
              fiabilidade da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">12. Alterações</h2>
            <p className="mt-2">
              A Porto Exótico pode alterar os presentes Termos e Condições a qualquer momento. A
              versão em vigor estará sempre disponível neste website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">13. Contacto</h2>
            <p className="mt-2">
              Para qualquer questão relacionada com estes Termos e Condições, pode contactar-nos
              através do email portoexotico@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermosCondicoes;
