/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Play, 
  Bolt, 
  Factory, 
  Network, 
  Zap, 
  ArrowRight, 
  Menu
} from "lucide-react";

const IMAGES = {
  HERO: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCNGJIPXLNG-0iI4R3LqE2ZldgWJwTyR7LlArQ_T_sMff5MxLKqiJ1djYL406042YaUwP8AyNUqHl9WmfAS2ckBqDSeiX2uaaVcBNiH0Mr7MHiHnK7CvsGbWwl00oh82zQ8i89dEL74JQWOT4LMTv7bW4awLzW4tKEuQEoVMUaFg4oTV93iJberTBYC9JYAyeg46Q3m8rrtV8Uqz-PWWjWACXGEADCA17aSnRTyMyzF6_wuYR4hdSMsRASaEsdZQZ3Y_2jrTXoUimI",
  BIM_MODEL: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzn-4WsxgfJEBcRjflcLDEApoD2VKo_y9ESzJqKahJaAbYQfYMZpVHM7KXURrkN_p_Naf99AIPIOnR8CK-itAc8JDv4ow45IS6lI9zeJKeKWIzocD_0v_2_PI4bIEKyOI79n8w-4XdxXlVnqOScNR_B8Oagt6FSmqqBLbfN2O_7ZRujJw3rTwap3BRFgMtMYVqRNCCCtUXyFqkYU9u9mV5uCZ_Ha_pbl4bXxE4rC_qn8L3NoiSFa0j5CtSvlVXOpmdsFnYA_6gGZk",
  STATS_BG: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yglulGyrztz04HwXU33vYugPWxK8YKKWpERlUB5EOyIsYF0R3LKhDWiLF3qX9mFLj0s6M2259pRcrFfjcsGogiwqqoEs2iyNXJ2SZ9jFSg8UJYZlz9YOIKGjSlzszsKsZztu1A8ObSOHCLHzGXa8X2qbYgVQv_lijIqeAafWEdTNe1DLMRbuHbOjfpqX5Vr5hO4mU_y6Dpy0bF2kePzlMTCvvN8qLWrgpvQhwVV0QZJPJrkYsEBf5nuucVY7pmOhnPy8gAEmdceN"
};

const NAVBAR_LINKS = ["Home", "Services", "Projects", "Contact"];

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/5 py-6 px-6 md:px-12 flex items-center justify-between">
        <div className="text-xl font-headline font-black tracking-tighter uppercase">
          Cone Sa Performance
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {NAVBAR_LINKS.map((link, i) => (
            <a 
              key={link} 
              href="#" 
              className={`font-headline text-sm font-bold uppercase tracking-tight transition-colors ${i === 0 ? 'text-primary border-b-2 border-primary pb-1' : 'text-zinc-400 hover:text-white'}`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-3 border border-white/10 font-bold text-sm uppercase tracking-wide hover:bg-white/5 transition-colors">
            Client Portal
          </button>
          <button className="btn-primary text-sm tracking-wide">
            Get a Quote
          </button>
        </div>

        <button className="md:hidden">
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={IMAGES.HERO} 
              alt="Industrial Electrical Infrastructure" 
              className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/80 to-transparent" />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="bg-surface-highest/50 border-l-4 border-primary px-3 py-1 inline-block mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Systems Architecture</span>
              </div>
              
              <h1 className="font-headline text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-6">
                High-Performance <br />
                <span className="text-gradient-primary">BIM Electrical</span> <br />
                Engineering
              </h1>
              
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed font-medium">
                Engineering the future of energy through precision BIM modeling and expert performance. We transform complex electrical schematics into actionable, high-fidelity digital twins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-2">
                  Start Your Project
                </button>
                <button className="px-8 py-4 border border-white/10 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                  View Capabilities
                </button>
              </div>
            </motion.div>

            {/* BIM Visualization Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative aspect-square ambient-glow border border-white/10 overflow-hidden bg-surface-high">
                <img 
                  src={IMAGES.BIM_MODEL} 
                  alt="3D BIM Wireframe rendering" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD Overlays */}
                <div className="absolute top-8 right-8 glass-panel px-6 py-4 border-l-4 border-primary">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Live Node Status</p>
                  <p className="font-headline text-2xl font-black">Optimal</p>
                </div>

                <div className="absolute bottom-12 left-8 glass-panel px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
                    <Bolt className="text-primary w-5 h-5 fill-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Current Load</p>
                    <p className="font-headline text-xl font-black">84.2 KVA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-24 bg-surface border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <motion.div {...SECTION_ANIMATION}>
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Core Competencies</span>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                  Precision Engineered. <br /> Flawlessly Executed.
                </h2>
              </motion.div>
              <motion.p 
                {...SECTION_ANIMATION}
                className="text-on-surface-variant max-w-sm text-sm border-l-2 border-white/10 pl-6 py-2 leading-relaxed"
              >
                Our methodology replaces guesswork with structural certainty. We leverage advanced modeling to deliver zero-clash electrical systems.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                {
                  Icon: Factory,
                  title: "Clash Detection",
                  desc: "Pre-emptive identification of structural and MEP conflicts utilizing millimeter-accurate Revit models before fabrication begins."
                },
                {
                  Icon: Network,
                  title: "System Topology",
                  desc: "Comprehensive mapping of entire power distribution networks, optimizing routing for material efficiency and load balancing."
                },
                {
                  Icon: Zap,
                  title: "Performance Modeling",
                  desc: "Simulated stress-testing of electrical loads to guarantee performance thresholds under peak operational demands."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...SECTION_ANIMATION}
                  transition={{ ...SECTION_ANIMATION.transition, delay: i * 0.1 }}
                  className="bg-surface-low p-10 border-l-4 border-transparent hover:border-primary hover:bg-surface-high transition-all group"
                >
                  <div className="text-primary mb-8 group-hover:scale-110 transition-transform origin-left">
                    <item.Icon className="w-12 h-12" />
                  </div>
                  <h3 className="font-headline text-xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 bg-surface-low relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-primary via-surface to-surface" />
          
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Proven Results</span>
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">By The Numbers</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/5">
              {[
                { val: "150+", label: "Projects Delivered" },
                { val: "45M", label: "KVA Managed" },
                { val: "Zero", label: "Design Clashes" },
                { val: "99%", label: "Client Retention", bg: IMAGES.STATS_BG }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  {...SECTION_ANIMATION}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative h-64 flex flex-col items-center justify-center p-8 bg-surface border border-white/5 group overflow-hidden`}
                >
                  {stat.bg && (
                    <img src={stat.bg} className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale" referrerPolicy="no-referrer" />
                  )}
                  <div className="relative z-10 text-center">
                    <p className="font-headline text-5xl font-black text-primary mb-2">{stat.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 bg-surface flex items-center justify-center">
          <motion.div 
            {...SECTION_ANIMATION}
            className="container mx-auto px-6 text-center max-w-4xl"
          >
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Ready to Engineer <br /> the Blueprint?
            </h2>
            <p className="text-xl text-on-surface-variant mb-12 font-medium max-w-2xl mx-auto">
              Engage our team of BIM specialists to draft the kinetic framework of your next high-voltage infrastructure project.
            </p>
            <button className="btn-primary inline-flex items-center gap-4 px-12 py-6 group">
              Start Your Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-low py-20 px-6 md:px-12 border-t border-white/5 font-sans">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-headline font-black uppercase mb-4 tracking-tighter">
              Cone Sa Performance
            </div>
            <p className="text-zinc-500 text-xs tracking-wide">
              © 2024 Cone Sa Performance. Engineering the Kinetic Blueprint.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "LinkedIn", "Project Inquiry"].map(link => (
              <a key={link} href="#" className="text-zinc-500 hover:text-primary text-[10px] font-bold uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
