import React from 'react';

const PoliticaCookies: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Política de Cookies</h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75 md:text-[15px]">
          <p>
            Esta Política de Cookies explica como a Porto Exótico utiliza cookies e tecnologias
            semelhantes no seu website para garantir o seu correto funcionamento, melhorar a
            experiência de navegação e, mediante consentimento, medir desempenho e utilização da
            loja online.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">1. O que são cookies</h2>
            <p className="mt-2">
              Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita
              um website. Estes ficheiros permitem reconhecer o navegador, memorizar preferências,
              reforçar funcionalidades essenciais e, em alguns casos, recolher informação
              estatística sobre a utilização do website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Que tipos de cookies utilizamos</h2>
            <p className="mt-2">Podemos utilizar as seguintes categorias de cookies:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-white">Cookies estritamente necessários</strong>: essenciais
                para o funcionamento técnico do website, da navegação, do carrinho e de funcionalidades
                básicas de segurança.
              </li>
              <li>
                <strong className="text-white">Cookies de medição e desempenho</strong>: utilizados,
                apenas com o seu consentimento, para compreender como os visitantes interagem com o
                website e para melhorar conteúdos, estrutura, navegação e desempenho geral.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Cookies estritamente necessários</h2>
            <p className="mt-2">
              Estes cookies são indispensáveis para assegurar funcionalidades básicas do website,
              incluindo navegação entre páginas, utilização do carrinho, estabilidade técnica e
              proteção operacional. Por serem necessários ao funcionamento da loja online, não
              dependem do seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              4. Cookies de medição e análise
            </h2>
            <p className="mt-2">
              Com o seu consentimento, o website poderá utilizar o Google Analytics para recolher
              informação estatística agregada sobre a utilização do website, como páginas visitadas,
              duração da sessão, origem do tráfego, tipo de dispositivo e interações gerais com a
              navegação.
            </p>
            <p className="mt-2">
              Esta medição é utilizada para avaliar desempenho, melhorar a estrutura do website,
              otimizar conteúdos e aperfeiçoar a experiência de navegação.
            </p>
            <p className="mt-2">
              O Google Analytics apenas é ativado após o seu consentimento através do banner de
              cookies apresentado no website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              5. Base legal para a utilização de cookies opcionais
            </h2>
            <p className="mt-2">
              A utilização de cookies de medição, desempenho e análise depende do seu
              consentimento. Pode aceitar ou recusar estes cookies através do banner inicial e pode
              também rever a sua escolha posteriormente através da opção{' '}
              <strong className="text-white">Definições de cookies</strong> disponível no website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              6. Como guardamos a sua escolha
            </h2>
            <p className="mt-2">
              Quando toma uma decisão no banner de cookies, essa preferência é guardada localmente
              no seu navegador para que a sua escolha seja respeitada em visitas futuras, salvo se
              a alterar manualmente ou limpar os dados do navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              7. Como alterar ou retirar o consentimento
            </h2>
            <p className="mt-2">
              Pode, a qualquer momento, alterar a sua decisão através da opção{' '}
              <strong className="text-white">Definições de cookies</strong> disponível no website.
              Ao retirar o consentimento, os cookies opcionais deixam de ser utilizados a partir
              desse momento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              8. Gestão de cookies no navegador
            </h2>
            <p className="mt-2">
              Para além das definições disponibilizadas no website, pode também configurar o seu
              navegador para bloquear, limitar ou eliminar cookies. Note, no entanto, que a
              desativação de certos cookies essenciais pode afetar o correto funcionamento de partes
              do website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Contacto</h2>
            <p className="mt-2">
              Para qualquer questão relacionada com cookies, privacidade ou proteção de dados, pode
              contactar-nos através do email portoexotico@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">10. Alterações a esta política</h2>
            <p className="mt-2">
              A Porto Exótico pode atualizar esta Política de Cookies sempre que necessário para
              refletir alterações legais, técnicas ou operacionais. A versão mais recente estará
              sempre disponível nesta página.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PoliticaCookies;
