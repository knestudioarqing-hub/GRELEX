/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ─── META PIXEL TYPE ────────────────────────────────────── */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackContact() {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact");
  }
}

import { useState, useEffect, useRef, useCallback } from "react";
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
  Palette,
} from "lucide-react";

/* ─── IMAGES ─────────────────────────────────────────────── */
const IMAGES = {
  HERO: "/mep2.png",
  BIM: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzn-4WsxgfJEBcRjflcLDEApoD2VKo_y9ESzJqKahJaAbYQfYMZpVHM7KXURrkN_p_Naf99AIPIOnR8CK-itAc8JDv4ow45IS6lI9zeJKeKWIzocD_0v_2_PI4bIEKyOI79n8w-4XdxXlVnqOScNR_B8Oagt6FSmqqBLbfN2O_7ZRujJw3rTwap3BRFgMtMYVqRNCCCtUXyFqkYU9u9mV5uCZ_Ha_pbl4bXxE4rC_qn8L3NoiSFa0j5CtSvlVXOpmdsFnYA_6gGZk",
  STATS: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yglulGyrztz04HwXU33vYugPWxK8YKKWpERlUB5EOyIsYF0R3LKhDWiLF3qX9mFLj0s6M2259pRcrFfjcsGogiwqqoEs2iyNXJ2SZ9jFSg8UJYZlz9YOIKGjSlzszsKsZztu1A8ObSOHCLHzGXa8X2qbYgVQv_lijIqeAafWEdTNe1DLMRbuHbOjfpqX5Vr5hO4mU_y6Dpy0bF2kePzlMTCvvN8qLWrgpvQhwVV0QZJPJrkYsEBf5nuucVY7pmOhnPy8gAEmdceN",
};

/* ─── DATA ────────────────────────────────────────────────── */
const NAV_LINKS = ["Início", "Serviços", "Equipe", "Contato"];

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
    quote: "Utilizamos ferramentas de ponta como Revit MEP e Navisworks para entregar projetos com zero conflitos interdisciplinares e rastreabilidade total em cada disciplina.",
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

const TEAM_MEMBERS = [
  { img: "/pablo.png", name: "Pablo Coelho", role: "Engenheiro Eletricista" },
  { img: "/gian.png", name: "Gianfranco N.", role: "Founder e Coordenador BIM" },
  { img: "/roger.png", name: "Roger Beppler", role: "Engenheiro Eletricista" },
];

const PORTFOLIO_PROJECTS = [
  { name: "Automações Prediais", type: "Controle & Integração BIM", img: "https://i.imgur.com/wSDGFAI.jpg" },
  { name: "Sistemas Elétricos", type: "BIM Elétrico — Baixa e Média Tensão", img: "https://i.imgur.com/Uv6ONUw.jpg" },
  { name: "SPDA — Para-raios", type: "Proteção Atmosférica ABNT NBR 5419", img: "https://i.imgur.com/MeXi8Il.jpg" },
  { name: "Telecomunicações", type: "Cabeamento Estruturado & Dados", img: "https://i.imgur.com/GTdBcsO.jpg" },
];

/* ─── MOOD LIGHT ─────────────────────────────────────────── */
const MOODS = [
  { id: "amber",   label: "Âmbar",       primary: "#FFA81B", secondary: "#FFD07A", glow: "rgba(255,168,27,0.15)" },
  { id: "cyan",    label: "Ciano",        primary: "#00D4FF", secondary: "#7EEEFF", glow: "rgba(0,212,255,0.12)" },
  { id: "violet",  label: "BIM Roxo",     primary: "#A855F7", secondary: "#D8B4FE", glow: "rgba(168,85,247,0.12)" },
  { id: "green",   label: "Verde Tec",    primary: "#22C55E", secondary: "#86EFAC", glow: "rgba(34,197,94,0.12)" },
  { id: "red",     label: "Plasma",       primary: "#EF4444", secondary: "#FCA5A5", glow: "rgba(239,68,68,0.12)" },
  { id: "white",   label: "Platina",      primary: "#E2E2E2", secondary: "#FFFFFF", glow: "rgba(220,220,220,0.08)" },
];

type Mood = typeof MOODS[number];

function applyMood(mood: Mood) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", mood.primary);
  root.style.setProperty("--mood-secondary", mood.secondary);
  root.style.setProperty("--mood-glow", mood.glow);
  let styleEl = document.getElementById("mood-style") as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "mood-style";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `
    .text-gradient-primary {
      background: linear-gradient(to bottom right, ${mood.primary}, ${mood.secondary}) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
    .btn-primary {
      background: ${mood.primary} !important;
      color: #080808 !important;
      box-shadow: 0 0 30px ${mood.glow}, 0 4px 20px ${mood.glow} !important;
    }
    .btn-primary:hover {
      box-shadow: 0 0 50px ${mood.primary}50, 0 8px 30px ${mood.primary}35 !important;
      transform: translateY(-2px);
    }
    .section-tag::before {
      color: ${mood.primary} !important;
    }
  `;
}

function MoodLight() {
  const [open, setOpen] = useState(false);
  const [activeMood, setActiveMood] = useState<string>(() => {
    return localStorage.getItem("grelex-mood") ?? "amber";
  });

  const apply = useCallback((mood: Mood) => {
    setActiveMood(mood.id);
    applyMood(mood);
    localStorage.setItem("grelex-mood", mood.id);
  }, []);

  // Apply saved mood on mount
  useEffect(() => {
    const saved = MOODS.find(m => m.id === activeMood) ?? MOODS[0];
    applyMood(saved);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3 md:bottom-28">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 bg-[#181817]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9F9B96] mb-1 text-right">Mood Light</p>
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => apply(mood)}
                className="flex items-center gap-3 px-3 py-2 rounded-[3px] transition-all hover:bg-white/5 group"
                title={mood.label}
              >
                {/* Color swatch */}
                <span
                  className="w-5 h-5 rounded-full shrink-0 ring-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${mood.primary}, ${mood.secondary})`,
                    boxShadow: activeMood === mood.id ? `0 0 12px 3px ${mood.primary}60` : "none",
                    ringColor: activeMood === mood.id ? mood.primary : "transparent",
                    outline: activeMood === mood.id ? `2px solid ${mood.primary}` : "2px solid transparent",
                  }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest transition-colors"
                  style={{ color: activeMood === mood.id ? mood.primary : "#9F9B96" }}
                >
                  {mood.label}
                </span>
                {activeMood === mood.id && (
                  <motion.span
                    layoutId="mood-active-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: mood.primary }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[#181817]/90 backdrop-blur-xl shadow-xl transition-colors"
        style={{
          boxShadow: open
            ? `0 0 20px 4px ${MOODS.find(m => m.id === activeMood)?.primary ?? "#FFA81B"}40`
            : undefined,
        }}
        aria-label="Mood Light"
      >
        <Palette
          className="w-5 h-5 transition-colors"
          style={{ color: MOODS.find(m => m.id === activeMood)?.primary ?? "#FFA81B" }}
        />
      </motion.button>
    </div>
  );
}

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
      {/* ── NAVBAR — pill glassmorphic (insightsapps style) ── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4 md:pt-5">
        <div
          className={`nav-pill ${scrolled ? "scrolled" : ""} max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between`}
        >
          <a href="#inicio" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="https://i.imgur.com/DWraQLz.png"
              alt="Grelex Engenharia Elétrica"
              className="h-8 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,168,27,0.6)]"
              loading="eager"
              decoding="async"
            />
            <span className="w-px h-5 bg-white/10" />
            <span className="font-headline text-white/90 font-semibold text-sm uppercase tracking-tight">
              GRELEX
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                className={`text-[13px] font-medium tracking-wide transition-all duration-300 relative group ${
                  i === 0 ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary group-hover:w-full transition-all duration-400 ease-out" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              onClick={trackContact}
              className="btn-primary text-xs py-2.5 px-5 gap-2"
            >
              <img src="/wppblack.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
              Fale no WhatsApp
            </a>
          </div>

          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
                className="font-headline text-3xl font-bold uppercase tracking-tight text-on-surface hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              onClick={trackContact}
              className="btn-primary flex items-center gap-2 mt-4"
            >
              <img src="/wppblack.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
              Fale no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* ── HERO ── */}
        <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.HERO}
              alt="Infraestrutura elétrica industrial"
              className="w-full h-full object-cover opacity-90 grayscale-[0.1]"
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface/80 via-surface/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/50 to-transparent" />
          </div>

          {/* Decorative grid — subtler */}
          <div className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
          {/* Radial vignette */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 30% 50%, transparent 40%, rgba(8,8,8,0.8) 100%)" }} />
          {/* Scanline sweep */}
          <div className="scanline-overlay z-[1]" />

          <div className="container mx-auto px-5 sm:px-6 md:px-16 relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Badge — → style like insightsapps */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="section-tag mb-10 !text-white/80"
              >
                Há +5 Anos no Campo de Batalha Chamado Obra
              </motion.div>

              <h1 className="font-headline text-[2rem] sm:text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] sm:leading-[1] tracking-[-0.02em] sm:tracking-[-0.03em] mb-6 sm:mb-8">
                Projetos de <span className="text-gradient-primary">Engenharia</span>
                <br />
                Elétrica BIM de
                <br />
                Alta Performance
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mb-8 sm:mb-12 leading-relaxed font-normal">
                Compatibilidade, eficiência na execução e desempenho que faz a diferença após a entrega. Projetos que <strong className="text-on-surface font-medium">funcionam de verdade</strong>.
              </p>

              {/* Dual CTA — primary + secondary ghost */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5555981225699"
                  target="_blank"
                  rel="noreferrer"
                  onClick={trackContact}
                  className="btn-primary flex items-center justify-center gap-3 text-sm"
                >
                  <img src="/wppblack.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                  Fale com a gente
                </a>
                <a
                  href="#servicos"
                  className="btn-secondary flex items-center justify-center gap-3 text-sm"
                >
                  Conheça nossos serviços
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Floating stat card — refined */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 glass-panel p-7 flex-col gap-5 w-64"
              style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1s", borderRadius: "16px" }}
            >
              {/* Top label */}
              <div className="flex items-center gap-2 mb-1">
                <span className="glow-dot" style={{ width: "5px", height: "5px" }} />
                <span className="tag-mono text-on-surface-variant">sistema // ativo</span>
              </div>
              {STATS.slice(0, 2).map((s) => (
                <div key={s.label} className="border-l-2 border-primary/40 pl-4 group">
                  <p className="font-headline text-2xl font-medium text-primary">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="tag-mono text-on-surface-variant mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 opacity-30"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-on-surface-variant" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-medium">Scroll</span>
          </motion.div>
        </section>

        {/* ── TRUST BAR ── */}
        <section 
          className="py-6 overflow-hidden border-y border-white/[0.04] relative"
          style={{
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <div className="flex gap-12 pr-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max relative z-10">
            {[...Array(4)].flatMap(() => [
              "Revit MEP", "NR-34", "ABNT NBR 5419", "NR-10", "IEC 60364", "Dialux Evo", "Navisworks", "BIM Collaborate"
            ]).map((name, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="text-on-surface-variant/60 font-semibold uppercase tracking-[0.2em] text-xs">
                  {name}
                </span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16 sm:py-28 bg-surface relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-16">
            <div className="text-center mb-20">
              <motion.span {...fadeUp} className="section-tag justify-center">
                Nossa Metodologia
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
                Engenharia elétrica desenvolvida
                <br />
                <span className="text-gradient-primary">com rigor técnico e BIM de ponta.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="relative h-48 md:h-56 flex flex-col items-center justify-center p-6 bg-surface group cursor-default transition-all duration-500"
                >
                  {/* Index number */}
                  <span className="absolute top-4 left-5 text-[11px] font-medium text-on-surface-variant/25 group-hover:text-primary/40 transition-colors duration-500 tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 text-center">
                    <p className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-on-surface mb-3 group-hover:text-primary transition-colors duration-500">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>

                  {/* Bottom accent on hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-[2px] bg-primary transition-all duration-500 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERTISE ── */}
        <section className="py-16 sm:py-28 bg-surface-low relative overflow-hidden">
          <div className="container mx-auto px-5 sm:px-6 md:px-16">
            {/* Header */}
            <motion.div {...fadeUp} className="mb-14">
              <span className="section-tag">Expertise</span>
              <h2 className="font-headline text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
                Controle em cada
                <br />
                <span className="text-gradient-primary">canto do projeto</span>
              </h2>
            </motion.div>

            {/* Image grid — 3 cols, 2 rows for perfect alignment */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 mb-14 md:aspect-[8/3]"
            >
              {/* Large image */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden border border-white/[0.06] rounded-xl aspect-video md:aspect-auto group">
                <img
                  src="https://i.imgur.com/axJZsyU.png"
                  alt="Modelagem BIM 3D — visão geral do proyecto"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/40 to-transparent pointer-events-none" />
              </div>

              {/* Top small image */}
              <div className="relative overflow-hidden border border-white/[0.06] rounded-xl aspect-video md:aspect-auto group">
                <img
                  src="https://i.imgur.com/mFSHBAo.png"
                  alt="Detalhe BIM — quadro elétrico"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/40 to-transparent pointer-events-none" />
              </div>

              {/* Bottom small image */}
              <div className="relative overflow-hidden border border-white/[0.06] rounded-xl aspect-video md:aspect-auto group">
                <img
                  src="https://i.imgur.com/x2Yy1AQ.png"
                  alt="Detalhe BIM — compatibilización de sistemas"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Description text */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-3xl"
            >
              Nossa metodologia utiliza tecnologia <strong className="text-on-surface font-medium">BIM</strong> (Building Information Modeling) de ponta para garantir o
              monitoramento integral de todos os sistemas. Com <strong className="text-on-surface font-medium">visualizações tridimensionais</strong> detalhadas, eliminamos
              interferências antes da obra começar, assegurando que cada milímetro do projeto esteja sob total controle
              técnico.
            </motion.p>
          </div>
        </section>

        {/* ── REFERÊNCIA ── */}
        <section className="py-28 bg-surface relative">
          <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="section-tag">Quem somos</span>
              <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-8">
                Time especializado em BIM Elétrico, desenvolvendo projetos com
                <span className="text-gradient-primary"> precisão técnica e compatibilidade total</span>
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10">
                Nossa equipe trabalha com <strong className="text-on-surface font-medium">metodologia BIM</strong> aplicada exclusivamente a sistemas elétricos — modelando, compatibilizando e entregando projetos prontos para a obra, com total conformidade às normas ABNT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5555981225699"
                  target="_blank"
                  rel="noreferrer"
                  onClick={trackContact}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <img src="/wppblack.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                  Fale com a gente
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.06] rounded-xl group">
                <img
                   src="https://i.imgur.com/qydWXJR.jpg"
                   alt="Modelagem BIM 3D"
                   className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                   loading="lazy"
                   decoding="async"
                 />
                <div className="absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />

                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 glass-panel px-5 py-3 rounded-lg border-l-2 border-primary">
                  <p className="text-[10px] font-medium text-primary uppercase tracking-[0.15em] mb-1">Status do Sistema</p>
                  <p className="font-headline text-xl font-medium">Zero Conflitos</p>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10" />
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="diferenciais" className="py-28 bg-surface-low relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 md:px-16">
            <div className="text-center mb-20">
              <motion.span {...fadeUp} className="section-tag justify-center">
                Por que a Grelex?
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
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
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface/50 border border-white/[0.05] p-8 sm:p-12 md:p-16 rounded-2xl text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {Array.from({ length: TESTIMONIALS[activeTestimonial].stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="font-headline text-base sm:text-xl md:text-2xl font-normal leading-relaxed mb-8 text-on-surface">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>

                  <div>
                    <p className="font-medium text-on-surface">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-sm text-on-surface-variant mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  id="testimonial-prev"
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/15 hover:bg-white/30"}`}
                      aria-label={`Depoimento ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  id="testimonial-next"
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all duration-300"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section id="servicos" className="py-28 bg-surface">
          <div className="container mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <motion.div {...fadeUp}>
                <span className="section-tag">Especialidades</span>
                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
                  Nossas disciplinas
                  <br />
                  <span className="text-gradient-primary">em BIM Elétrico</span>
                </h2>
              </motion.div>
              <motion.a
                {...fadeUp}
                href="#especialidades"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-medium text-sm hover:gap-3 transition-all duration-300"
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
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{p.type}</p>
                    <p className="font-headline text-lg font-medium">{p.name}</p>
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
        <section id="especialidades" className="py-28 bg-surface-low">
          <div className="container mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <motion.div {...fadeUp}>
                <span className="section-tag">Especialidades</span>
                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
                  Nós podemos te ajudar
                  <br />
                  com <span className="text-gradient-primary">engenharia</span>
                  <br />
                  de alta performance
                </h2>
              </motion.div>
              <motion.p
                {...fadeUp}
                className="text-on-surface-variant max-w-sm text-sm border-l border-white/[0.08] pl-6 py-2 leading-relaxed"
              >
                Engenharia de alta performance em projetos de instalações prediais. Da modelagem BIM à compatibilização, entregamos projetos prontos para a obra.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative bg-surface p-10 border border-white/[0.04] hover:border-white/[0.08] rounded-xl transition-all duration-500 group overflow-hidden"
                >
                  {/* Hover bg gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                    style={{ background: "linear-gradient(135deg, rgba(255,168,27,0.03) 0%, transparent 60%)" }}
                  />
                  {/* Index */}
                  <span className="absolute top-6 right-8 text-[11px] font-medium text-on-surface-variant/15 group-hover:text-primary/25 transition-colors duration-500 tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative mb-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-primary group-hover:scale-110 transition-all duration-300 origin-left"
                      style={{
                        background: "rgba(255,168,27,0.06)",
                        border: "1px solid rgba(255,168,27,0.1)",
                      }}
                    >
                      <svc.Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="relative font-headline text-lg font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">{svc.title}</h3>
                  <p className="relative text-on-surface-variant text-sm leading-relaxed">{svc.desc}</p>
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-[2px] bg-primary transition-all duration-500 rounded-full" />
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="text-center mt-14">
              <a
                href="https://wa.me/5555981225699"
                target="_blank"
                rel="noreferrer"
                onClick={trackContact}
                className="btn-primary inline-flex items-center gap-3 text-sm"
              >
                <img src="/wppblack.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                Fale com a gente
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── NOSSA EQUIPE ── */}
        <section id="equipe" className="py-28 bg-surface relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-16">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.span {...fadeUp} className="section-tag justify-center">
                As Pessoas Por Trás dos Projetos
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
                Nossa{" "}
                <span className="text-gradient-primary">Equipe</span>
              </motion.h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/[0.06] rounded-xl mb-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface/70 via-surface/5 to-transparent" />
                    {/* Accent bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-[2px] bg-primary transition-all duration-500 rounded-full" />
                  </div>

                  {/* Info */}
                  <h3 className="font-headline text-lg font-bold tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-on-surface-variant font-medium text-xs tracking-wide">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 sm:py-40 bg-surface relative overflow-hidden">
          {/* BG accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            {...fadeUp}
            className="container mx-auto px-6 text-center w-full relative z-10"
          >
            <span className="section-tag justify-center">
              Precisa de um projeto?
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6 sm:mb-8">
              Sua obra precisa de <br className="hidden md:block" />
              projetos que <span className="text-gradient-primary">funcionem</span> e <br className="hidden md:block" />
              nossa engenharia garante&nbsp;isso.
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant mb-14 font-normal max-w-2xl mx-auto">
              Fale agora com nossa equipe especializada em BIM Elétrico. Atendimento direto — sem robô, sem demora.
            </p>
            <a
              href="https://wa.me/5555981225699"
              target="_blank"
              rel="noreferrer"
              onClick={trackContact}
              className="btn-primary inline-flex items-center gap-3 px-6 sm:px-10 py-4 sm:py-5 group text-sm md:text-base"
            >
              <img src="/wppblack.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
              Fale no WhatsApp agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </section>

        {/* ── CONTATO ── */}
        <section id="contato" className="py-28 bg-surface-low relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-16">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.span {...fadeUp} className="section-tag justify-center">
                Contato
              </motion.span>
              <motion.h2 {...fadeUp} className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
                Fale com a gente,
                <br />
                <span className="text-gradient-primary">nossa equipe está pronta!</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Form — 3 cols */}
              <motion.form
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-3 flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const nome = (form.elements.namedItem("nome") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const whatsapp = (form.elements.namedItem("whatsapp") as HTMLInputElement).value;
                  const mensagem = (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value;
                  const text = `Olá! Meu nome é ${nome}.%0AEmail: ${email}%0AWhatsApp: ${whatsapp}%0A%0A${mensagem}`;
                  trackContact();
                  window.open(`https://wa.me/5555981225699?text=${text}`, "_blank");
                }}
              >
                {/* Nome */}
                <div className="relative group">
                  <input
                    id="contact-nome"
                    name="nome"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full bg-surface/60 backdrop-blur-md border border-white/10 focus:border-primary/60 outline-none px-5 py-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300 rounded-[5px] focus:shadow-[0_0_20px_var(--mood-glow,rgba(255,168,27,0.1))]"
                  />
                  <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent transition-all duration-500" />
                </div>

                {/* Email + WhatsApp row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="E-mail"
                      className="w-full bg-surface/60 backdrop-blur-md border border-white/10 focus:border-primary/60 outline-none px-5 py-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300 rounded-[5px] focus:shadow-[0_0_20px_var(--mood-glow,rgba(255,168,27,0.1))]"
                    />
                    <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent transition-all duration-500" />
                  </div>
                  <div className="relative group">
                    <input
                      id="contact-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      placeholder="WhatsApp (com DDD)"
                      className="w-full bg-surface/60 backdrop-blur-md border border-white/10 focus:border-primary/60 outline-none px-5 py-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300 rounded-[5px] focus:shadow-[0_0_20px_var(--mood-glow,rgba(255,168,27,0.1))]"
                    />
                    <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent transition-all duration-500" />
                  </div>
                </div>

                {/* Mensagem */}
                <div className="relative group">
                  <textarea
                    id="contact-mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    placeholder="Conte-nos sobre o seu projeto..."
                    className="w-full bg-surface/60 backdrop-blur-md border border-white/10 focus:border-primary/60 outline-none px-5 py-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300 rounded-[5px] resize-none focus:shadow-[0_0_20px_var(--mood-glow,rgba(255,168,27,0.1))]"
                  />
                  <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent transition-all duration-500" />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto self-start group text-base"
                >
                  <img src="/wppblack.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                  Enviar via WhatsApp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.form>

              {/* Info sidebar — 2 cols */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="lg:col-span-2 flex flex-col gap-6"
              >
                {/* Info card */}
                <div
                  className="p-8 flex flex-col gap-6 rounded-[5px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Informações</p>
                    <div className="w-8 h-[2px] bg-primary/40" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 shrink-0 rounded-[5px]">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Localização</p>
                      <p className="text-sm text-on-surface font-medium">Florianópolis, SC</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 shrink-0 rounded-[5px]">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Telefone</p>
                      <p className="text-sm text-on-surface font-medium">+55 55 98122-5699</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 shrink-0 rounded-[5px]">
                      <img src="/wpp.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">WhatsApp</p>
                      <p className="text-sm text-on-surface font-medium">Atendimento direto e rápido</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA */}
                <a
                  href="https://wa.me/5555981225699"
                  target="_blank"
                  rel="noreferrer"
                  onClick={trackContact}
                  className="btn-primary flex items-center justify-center gap-3 w-full text-sm"
                >
                  <img src="/wppblack.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                  Falar direto no WhatsApp
                </a>

                {/* Trust badge */}
                <div className="text-center py-4 border border-white/[0.05] rounded-xl">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-on-surface-variant">
                    ⚡ Resposta em até <span className="text-primary">2 horas</span> úteis
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-surface py-16 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 md:px-16">
          {/* Divider glow */}
          <div className="divider-glow mb-12 opacity-30" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <img
                src="https://i.imgur.com/DWraQLz.png"
                alt="Grelex Engenharia Elétrica"
                className="h-8 w-auto object-contain opacity-80"
                loading="lazy"
                decoding="async"
              />
              <p className="text-on-surface-variant/60 text-xs tracking-wide">
                © 2024 Grelex Engenharia Elétrica. Projetos que funcionam de verdade.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-on-surface-variant/50 hover:text-on-surface text-xs font-medium tracking-wide transition-colors duration-300"
              >
                Serviços
              </a>
              <a
                href="/privacidad"
                className="text-on-surface-variant/50 hover:text-on-surface text-xs font-medium tracking-wide transition-colors duration-300"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOOD LIGHT ── */}
      <MoodLight />

      {/* ── WHATSAPP FLOATING BTN ── */}
      <a
        href="https://wa.me/5555981225699"
        target="_blank"
        rel="noreferrer"
        onClick={trackContact}
        className="fixed bottom-6 right-6 z-50 w-[54px] h-[54px] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 drop-shadow-xl"
        aria-label="WhatsApp"
      >
        <img src="/wpp.png" alt="WhatsApp" className="w-full h-full object-contain" />
      </a>
    </div>
  );
}
