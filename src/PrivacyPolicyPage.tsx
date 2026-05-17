import { ArrowLeft } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface font-sans flex flex-col">
      {/* ── NAVBAR (Simple) ── */}
      <nav className="w-full px-4 md:px-8 py-6 border-b border-white/10 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
            <ArrowLeft className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
              Voltar ao Início
            </span>
          </a>
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.imgur.com/DWraQLz.png"
              alt="Grelex Engenharia Elétrica"
              className="h-6 w-auto object-contain"
            />
            <span className="w-px h-4 bg-white/10" />
            <span className="font-headline text-white/90 font-semibold text-xs uppercase tracking-tight">
              GRELEX
            </span>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <main className="flex-grow py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <span className="section-tag mb-4 inline-flex">Legal</span>
            <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-on-surface">
              Política de Privacidade
            </h1>
            <p className="text-on-surface-variant">Última atualização: Maio de 2026</p>
          </div>

          <div className="space-y-10 text-on-surface-variant leading-relaxed">
            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">1. Introdução</h2>
              <p>
                A Grelex Engenharia Elétrica está comprometida em proteger a sua privacidade e garantir a
                segurança de seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos,
                e protegemos as informações que você nos fornece através do nosso site.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">2. Coleta de Informações</h2>
              <p className="mb-3">Coletamos informações pessoais que você nos fornece voluntariamente quando:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Preenche o formulário de contato em nosso site.</li>
                <li>Entra em contato conosco via WhatsApp.</li>
              </ul>
              <p>
                Os dados coletados incluem: Nome, Endereço de E-mail, Número de Telefone/WhatsApp e o
                conteúdo da mensagem enviada.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">3. Uso das Informações</h2>
              <p className="mb-3">Utilizamos suas informações pessoais exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Responder às suas dúvidas e solicitações de orçamento.</li>
                <li>Fornecer informações sobre nossos serviços de Engenharia Elétrica BIM.</li>
                <li>Melhorar a experiência de navegação em nosso site.</li>
              </ul>
              <p>
                <strong className="text-on-surface font-medium">Não</strong> vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">4. Proteção de Dados</h2>
              <p>
                Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Todas as
                comunicações são tratadas com estrita confidencialidade.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">5. Seus Direitos</h2>
              <p>
                Você tem o direito de solicitar o acesso, a correção ou a exclusão dos seus dados pessoais
                armazenados por nós. Para exercer esses direitos, entre em contato conosco através dos
                nossos canais de atendimento.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">6. Alterações na Política de Privacidade</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações
                serão publicadas nesta página. Recomendamos que você revise esta página regularmente para
                estar ciente de quaisquer modificações.
              </p>
            </section>

            <section className="bg-surface-low border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-4">7. Contato</h2>
              <p className="mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como lidamos com seus
                dados, entre em contato conosco:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-on-surface font-medium">WhatsApp:</strong> +55 55 98122-5699</li>
                <li><strong className="text-on-surface font-medium">Localização:</strong> Florianópolis, SC</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* ── FOOTER (Simple) ── */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-on-surface-variant/60 text-xs tracking-wide">
          © 2026 Grelex Engenharia Elétrica.
        </p>
      </footer>
    </div>
  );
}
