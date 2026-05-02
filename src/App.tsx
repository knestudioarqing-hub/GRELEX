/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Zap,
  Wind,
  Cpu,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

/* ─── IMAGES ─────────────────────────────────────────────── */
const IMAGES = {
  HERO: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCNGJIPXLNG-0iI4R3LqE2ZldgWJwTyR7LlArQ_T_sMff5MxLKqiJ1djYL406042YaUwP8AyNUqHl9WmfAS2ckBqDSeiX2uaaVcBNiH0Mr7MHiHnK7CvsGbWwl00oh82zQ8i89dEL74JQWOT4LMTv7bW4awLzW4tKEuQEoVMUaFg4oTV93iJberTBYC9JYAyeg46Q3m8rrtV8Uqz-PWWjWACXGEADCA17aSnRTyMyzF6_wuYR4hdSMsRASaEsdZQZ3Y_2jrTXoUimI",
  BIM: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzn-4WsxgfJEBcRjflcLDEApoD2VKo_y9ESzJqKahJaAbYQfYMZpVHM7KXURrkN_p_Naf99AIPIOnR8CK-itAc8JDv4ow45IS6lI9zeJKeKWIzocD_0v_2_PI4bIEKyOI79n8w-4XdxXlVnqOScNR_B8Oagt6FSmqqBLbfN2O_7ZRujJw3rTwap3BRFgMtMYVqRNCCCtUXyFqkYU9u9mV5uCZ_Ha_pbl4bXxE4rC_qn8L3NoiSFa0j5CtSvlVXOpmdsFnYA_6gGZk",
  STATS: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yglulGyrztz04HwXU33vYugPWxK8YKKWpERlUB5EOyIsYF0R3LKhDWiLF3qX9mFLj0s6M2259pRcrFfjcsGogiwqqoEs2iyNXJ2SZ9jFSg8UJYZlz9YOIKGjSlzszsKsZztu1A8ObSOHCLHzGXa8X2qbYgVQv_lijIqeAafWEdTNe1DLMRbuHbOjfpqX5Vr5hO4mU_y6Dpy0bF2kePzlMTCvvN8qLWrgpvQhwVV0QZJPJrkYsEBf5nuucVY7pmOhnPy8gAEmdceN",
};

/* ─── DATA ────────────────────────────────────────────────── */
const NAV_LINKS = ["Início", "Serviços", "Portfólio", "Depoimentos", "Contato"];

const STATS = [
  { value: "BIM", label: "Metodologia de Trabalho" },
  { value: "100%", label: "Conformidade com ABNT" },
  { value: "3D", label: "Modelagem em Revit MEP" },
  { value: "Zero", label: "Tolerância a Conflitos" },
];

const TESTIMONIALS = [
  {
    quote: "Desenvolvemos cada projeto com modelagem BIM completa no Revit MEP, garantindo que todos os sistemas elétricos estejam perfeitamente compatibilizados antes do início da obra.",
    name: "Modelagem BIM 3D",
    role: "Nossa Metodologia Principal",
    stars: 5,
  },
  {
    quote: "Nossa equipe é especializada exclusivamente em engenharia elétrica BIM — automações, elétrica, SPDA e telecomunicações — com foco total em qualidade técnica e conformidade com normas ABNT.",
    name: "Especialização Técnica",
    role: "Time 100% BIM Elétrico",
    stars: 5,
  },
  {
    quote: "Utilizamos ferramentas de ponta como Revit MEP, AutoCAD Electrical e Navisworks para entregar projetos com zero conflitos interdisciplinares e rastreabilidade total em cada disciplina.",
    name: "Ferramentas de Ponta",
    role: "Tecnologia a Serviço da Obra",
    stars: 5,
  },
  {
    quote: "Cada entrega passa por um rigoroso processo de revisão e compatibilização, garantindo que o projeto chegue à obra pronto para execução — sem surpresas e sem retrabalho.",
    name: "Processo de Qualidade",
    role: "Revisão e Compatibilização Total",
    stars: 5,
  },
  {
    quote: "Acreditamos que um bom projeto BIM não só elimina conflitos — ele reduz custos, acelera a execução e garante a eficiência de todos os sistemas após a entrega da obra.",
    name: "Nosso Compromisso",
    role: "Resultado que Faz a Diferença",
    stars: 5,
  },
];

const SERVICES = [
  { Icon: Cpu, title: "Automações", desc: "Projetos de automação predial e industrial: controle de iluminação, CFTV, alarmes, controle de acesso e sistemas integrados de gestão." },
  { Icon: Zap, title: "Elétrica", desc: "Modelagem BIM completa de sistemas elétricos de baixa e média tensão, dimensionamento de cargas, quadros e alimentadores." },
  { Icon: ShieldCheck, title: "SPDA", desc: "Projetos de Sistema de Proteção contra Descargas Atmosféricas (para-raios) conforme ABNT NBR 5419, garantindo segurança total." },
  { Icon: Wind, title: "Telecomunicações", desc: "Cabeamento estruturado, redes de voz e dados, TV, interfonia e CFTV com compatibilidade e rastreabilidade total." },
];

const PORTFOLIO_PROJECTS = [
  { name: "Automações Prediais", type: "Controle & Integração BIM", img: "https://i.imgur.com/wSDGFAI.jpg" },
  { name: "Sistemas Elétricos", type: "BIM Elétrico — Baixa e Média Tensão", img: "https://i.imgur.com/Uv6ONUw.jpg" },
  { name: "SPDA — Para-raios", type: "Proteção Atmosférica ABNT NBR 5419", img: "https://i.imgur.com/MeXi8Il.jpg" },
  { name: "Telecomunicações", type: "Cabeamento Estruturado & Dados", img: "https://i.imgur.com/GTdBcsO.jpg" },
];

/* ─── ANIMATION HELPERS ───────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

/* ─── ANIMATED COUNTER ────────────────────────────────────── */
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    // extract numeric part
    const numMatch = value.match(/\d+/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseInt(numMatch[0]);
    const prefix = value.startsWith("+") ? "+" : "";
    const suffix = value.replace(/[+\d]/g, "");
    let start = 0;
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setDisplay(`${prefix}${start}${suffix}`);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

/* ─── APP ─────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevTestimonial = () =>
    setActiveTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-[#111111]/95 backdrop-blur-lg shadow-lg shadow-[#111111]/60 py-4" : "bg-transparent py-6"
        } px-6 md:px-16 flex items-center justify-between`}
      >
        <div className="text-xl font-headline font-black tracking-tighter uppercase flex items-center gap-2">
          <span className="text-gradient-primary">Grelex</span>
          <span className="text-on-surface/60 text-xs font-medium normal-case tracking-wide hidden sm:block">
            Engenharia Elétrica
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
              className={`font-headline text-sm font-bold uppercase tracking-tight transition-colors ${
                i === 0 ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/5555981225699"
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center gap-2 text-sm py-3 px-6"
          >
            <MessageCircle className="w-4 h-4" />
            Fale no WhatsApp
          </a>
        </div>

        <button
          id="mobile-menu-btn"
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-screen z-40 bg-surface flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex items-center gap-2 mt-4"
            >
              <MessageCircle className="w-4 h-4" />
              Fale no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* ── HERO ── */}
        <section id="início" className="relative min-h-screen flex items-center overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.HERO}
              alt="Infraestrutura elétrica industrial"
              className="w-full h-full object-cover opacity-30 grayscale-[0.3]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/85 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-surface/60" />
          </div>

          {/* Decorative grid */}
          <div className="absolute inset-0 z-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(#5C5C5B 1px, transparent 1px), linear-gradient(90deg, #5C5C5B 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto px-6 md:px-16 relative z-10 pt-32 pb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                  Há +5 Anos no Campo de Batalha Chamado Obra
                </span>
              </div>

              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tighter mb-8">
                Projetos de{" "}
                <span className="text-gradient-primary">Engenharia</span>
                <br />
                Elétrica BIM de
                <br />
                Alta Performance
              </h1>

              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed font-medium">
                Compatibilidade, eficiência na execução e desempenho que faz a diferença após a entrega. Projetos que <strong className="text-on-surface">funcionam de verdade</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5555981225699"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex items-center justify-center gap-3 text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Fale com a gente!
                </a>
                <button className="px-8 py-4 border border-white/10 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  Ver Portfólio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 glass-panel p-8 flex-col gap-6 w-72"
            >
              {STATS.slice(0, 2).map((s) => (
                <div key={s.label} className="border-l-4 border-primary pl-4">
                  <p className="font-headline text-3xl font-black text-primary">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40"
          >
            <div className="w-px h-10 bg-on-surface-variant" />
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Scroll</span>
          </motion.div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="py-8 bg-primary overflow-hidden">
          <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {["Revit MEP", "AutoCAD Electrical", "BIM Nível 2", "ABNT NBR 5419", "NR-10", "IEC 60364", "Dialux Evo", "Navisworks", "BIM Collaborate", "AutoCAD MEP"].concat(
              ["Revit MEP", "AutoCAD Electrical", "BIM Nível 2", "ABNT NBR 5419", "NR-10", "IEC 60364", "Dialux Evo", "Navisworks"]
            ).map((name, i) => (
              <span key={i} className="text-[#3b0900] font-black uppercase tracking-widest text-sm">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-24 bg-surface-low relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-primary/60 via-transparent to-transparent" />

          <div className="container mx-auto px-6 md:px-16">
            <div className="text-center mb-16">
              <motion.span {...fadeUp} className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Nossa Metodologia
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-4xl md:text-6xl font-black tracking-tighter">
                Engenharia elétrica desenvolvida
                <br />
                <span className="text-gradient-primary">com rigor técnico e BIM de ponta.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/5">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="relative h-52 flex flex-col items-center justify-center p-8 border border-white/5 group overflow-hidden"
                >
                  {stat.label === "Modelagem em Revit MEP" && (
                    <img
                      src={IMAGES.STATS}
                      className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  )}
                  <div className="relative z-10 text-center">
                    <p className="font-headline text-5xl font-black text-primary mb-2">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                      {stat.label}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-primary transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERTISE ── */}
        <section className="py-24 bg-surface-low relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-primary/60 via-transparent to-transparent" />

          <div className="container mx-auto px-6 md:px-16">
            {/* Header */}
            <motion.div {...fadeUp} className="mb-12">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Expertise
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Controle em cada
                <br />
                <span className="text-gradient-primary">canto do projeto</span>
              </h2>
            </motion.div>

            {/* Image grid — 3 cols, 2 rows for perfect alignment */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 mb-12 md:aspect-[8/3]"
            >
              {/* Large image */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden border border-white/10 rounded-[5px] aspect-video md:aspect-auto">
                <img
                  src="https://i.imgur.com/axJZsyU.png"
                  alt="Modelagem BIM 3D — visão geral do proyecto"
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />
              </div>

              {/* Top small image */}
              <div className="relative overflow-hidden border border-white/10 rounded-[5px] aspect-video md:aspect-auto">
                <img
                  src="https://i.imgur.com/mFSHBAo.png"
                  alt="Detalhe BIM — quadro elétrico"
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />
              </div>

              {/* Bottom small image */}
              <div className="relative overflow-hidden border border-white/10 rounded-[5px] aspect-video md:aspect-auto">
                <img
                  src="https://i.imgur.com/x2Yy1AQ.png"
                  alt="Detalhe BIM — compatibilización de sistemas"
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />
              </div>
            </motion.div>

            {/* Description text */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-on-surface-variant text-lg leading-relaxed max-w-3xl"
            >
              Nossa metodologia utiliza tecnologia <strong className="text-on-surface">BIM</strong> (Building Information Modeling) de ponta para garantir o
              monitoramento integral de todos os sistemas. Com <strong className="text-on-surface">visualizações tridimensionais</strong> detalhadas, eliminamos
              interferências antes da obra começar, assegurando que cada milímetro do projeto esteja sob total controle
              técnico.
            </motion.p>
          </div>
        </section>

        {/* ── REFERÊNCIA ── */}
        <section className="py-24 bg-surface relative">
          <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Quem somos
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                Time especializado em BIM Elétrico, desenvolvendo projetos com
                <span className="text-gradient-primary"> precisão técnica e compatibilidade total</span>
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Nossa equipe trabalha com <strong className="text-on-surface">metodologia BIM</strong> aplicada exclusivamente a sistemas elétricos — modelando, compatibilizando e entregando projetos prontos para a obra, com total conformidade às normas ABNT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5555981225699"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Fale com a gente
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <img
                   src="https://i.imgur.com/qydWXJR.jpg"
                   alt="Modelagem BIM 3D"
                   className="w-full h-full object-cover"
                 />
                <div className="absolute inset-0 bg-linear-to-t from-surface/60 to-transparent" />

                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 glass-panel px-6 py-4 border-l-4 border-primary">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status do Sistema</p>
                  <p className="font-headline text-2xl font-black">Zero Conflitos</p>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10" />
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="depoimentos" className="py-24 bg-surface-low relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 md:px-16">
            <div className="text-center mb-16">
              <motion.span {...fadeUp} className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Por que a Grelex?
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-4xl md:text-6xl font-black tracking-tighter">
                Nossos diferenciais em BIM Elétrico
              </motion.h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface border border-white/5 p-10 md:p-14 border-l-4 border-l-primary text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: TESTIMONIALS[activeTestimonial].stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="font-headline text-2xl md:text-3xl font-black leading-snug mb-8 text-on-surface">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>

                  <div>
                    <p className="font-bold text-on-surface">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-sm text-on-surface-variant mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  id="testimonial-prev"
                  onClick={prevTestimonial}
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`transition-all duration-300 ${i === activeTestimonial ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                      aria-label={`Depoimento ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  id="testimonial-next"
                  onClick={nextTestimonial}
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section id="portfólio" className="py-24 bg-surface">
          <div className="container mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <motion.div {...fadeUp}>
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Especialidades</span>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Nossas disciplinas
                  <br />
                  <span className="text-gradient-primary">em BIM Elétrico</span>
                </h2>
              </motion.div>
              <motion.a
                {...fadeUp}
                href="#serviços"
                className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
              >
                Conheça nossas soluções
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {PORTFOLIO_PROJECTS.map((p, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative h-80 overflow-hidden group cursor-pointer"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{p.type}</p>
                    <p className="font-headline text-lg font-black">{p.name}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 border border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="serviços" className="py-24 bg-surface-low">
          <div className="container mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <motion.div {...fadeUp}>
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Especialidades</span>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Nós podemos te ajudar
                  <br />
                  com <span className="text-gradient-primary">engenharia</span>
                  <br />
                  de alta performance
                </h2>
              </motion.div>
              <motion.p
                {...fadeUp}
                className="text-on-surface-variant max-w-sm text-sm border-l-2 border-white/10 pl-6 py-2 leading-relaxed"
              >
                Engenharia de alta performance em projetos de instalações prediais. Da modelagem BIM à compatibilização, entregamos projetos prontos para a obra.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-surface p-10 border-l-4 border-transparent hover:border-primary hover:bg-surface-high transition-all duration-300 group"
                >
                  <div className="mb-8 text-primary group-hover:scale-110 transition-transform origin-left">
                    <svc.Icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-headline text-xl font-black uppercase tracking-tight mb-4">{svc.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{svc.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="text-center mt-12">
              <a
                href="https://wa.me/5555981225699"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Fale com a gente
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-40 bg-surface relative overflow-hidden">
          {/* BG accent */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          </div>

          <motion.div
            {...fadeUp}
            className="container mx-auto px-6 text-center max-w-4xl relative z-10"
          >
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
              Precisa de um projeto?
            </span>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Sua obra precisa de projetos que{" "}
              <span className="text-gradient-primary">funcionem</span> e nossa engenharia garante isso.
            </h2>
            <p className="text-xl text-on-surface-variant mb-12 font-medium max-w-2xl mx-auto">
              Fale agora com nossa equipe especializada em BIM Elétrico. Atendimento direto — sem robô, sem demora.
            </p>
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-4 px-12 py-6 group text-base"
            >
              <MessageCircle className="w-6 h-6" />
              Fale no WhatsApp agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* ── CONTATO ── */}
        <section id="contato" className="py-16 bg-surface-low border-t border-white/5">
          <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="font-headline text-2xl font-black uppercase tracking-tight mb-2">
                Fale com a gente,
                <br />
                <span className="text-gradient-primary">nossa equipe está pronta!</span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>(11) 9.9999.9999</span>
              </div>
            </div>
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <img src="https://i.imgur.com/rZwZ6jL.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-surface py-12 px-6 md:px-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-headline font-black uppercase tracking-tighter mb-2">
              <span className="text-gradient-primary">Grelex</span> Engenharia
            </div>
            <p className="text-[#9F9B96] text-xs tracking-wide">
              © 2024 Grelex Engenharia Elétrica. Projetos que funcionam de verdade.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {["Portfólio", "Serviços", "Blog", "Vagas", "Política de Privacidade"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#9F9B96] hover:text-primary text-[10px] font-bold uppercase tracking-widest transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BTN ── */}
      <a
        href="https://wa.me/5555981225699"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 drop-shadow-xl"
        aria-label="WhatsApp"
      >
        <img src="https://i.imgur.com/rZwZ6jL.png" alt="WhatsApp" className="w-full h-full object-contain" />
      </a>
    </div>
  );
}
