import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-headline text-2xl font-bold text-on-surface">Política de Privacidade</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-on-surface-variant hover:text-on-surface"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto text-on-surface-variant space-y-6 text-sm leading-relaxed custom-scrollbar">
              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">1. Introdução</h3>
                <p>
                  A Grelex Engenharia Elétrica está comprometida em proteger a sua privacidade e garantir a
                  segurança de seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos,
                  e protegemos as informações que você nos fornece através do nosso site.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">2. Coleta de Informações</h3>
                <p className="mb-2">Coletamos informações pessoais que você nos fornece voluntariamente quando:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Preenche o formulário de contato em nosso site.</li>
                  <li>Entra em contato conosco via WhatsApp.</li>
                </ul>
                <p className="mt-2">
                  Os dados coletados incluem: Nome, Endereço de E-mail, Número de Telefone/WhatsApp e o
                  conteúdo da mensagem enviada.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">3. Uso das Informações</h3>
                <p className="mb-2">Utilizamos suas informações pessoais exclusivamente para:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Responder às suas dúvidas e solicitações de orçamento.</li>
                  <li>Fornecer informações sobre nossos serviços de Engenharia Elétrica BIM.</li>
                  <li>Melhorar a experiência de navegação em nosso site.</li>
                </ul>
                <p className="mt-2">
                  <strong>Não</strong> vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">4. Proteção de Dados</h3>
                <p>
                  Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados
                  pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Todas as
                  comunicações são tratadas com estrita confidencialidade.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">5. Seus Direitos</h3>
                <p>
                  Você tem o direito de solicitar o acesso, a correção ou a exclusão dos seus dados pessoais
                  armazenados por nós. Para exercer esses direitos, entre em contato conosco através dos
                  nossos canais de atendimento.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">6. Alterações na Política de Privacidade</h3>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações
                  serão publicadas nesta página. Recomendamos que você revise esta página regularmente para
                  estar ciente de quaisquer modificações.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-on-surface mb-2">7. Contato</h3>
                <p>
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como lidamos com seus
                  dados, entre em contato conosco:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>WhatsApp: +55 55 98122-5699</li>
                  <li>Localização: Florianópolis, SC</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-surface-low flex justify-end">
              <button
                onClick={onClose}
                className="btn-primary py-2 px-6 text-sm"
              >
                Entendi
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
