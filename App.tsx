
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const PROJECT_LOGO = "https://pbs.twimg.com/profile_images/2000255611473170438/p_4GHX4E_400x400.jpg";

// --- HELPERS ---
const DecryptText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; // Speed of decryption
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
};

// --- DATA ---
const stylePresets = [
  { id: 'realistic', label: 'REALISTIC', prompt: 'photorealistic, cinematic, 8k, highly detailed, metallic surfaces, sharp focus' },
  { id: 'cyberpunk', label: 'CYBERPUNK', prompt: 'cyberpunk neon, futuristic city, chrome reflections, high tech, glowing circuits' },
  { id: 'blueprint', label: 'BLUEPRINT', prompt: 'technical blueprint, white lines on blue background, schematic, engineering drawing' },
  { id: 'pixelart', label: 'RETRO TECH', prompt: 'pixel art, 90s computer aesthetic, green terminal phosphor, glitch effect' },
  { id: 'chrome', label: 'LIQUID CHROME', prompt: 'liquid metal, t-1000 style, reflective silver, abstract 3d render' }
];

const randomScenarios = [
  "upgrading its internal storage with glowing crystals",
  "surfing on a motherboard data stream at light speed",
  "hacking a futuristic mainframe in a neon alleyway",
  "transforming into a giant mecha robot in Tokyo",
  "drifting a cyber-truck on a holographic track",
  "floating in a server room surrounded by cables",
  "wearing augmented reality glasses analyzing crypto charts"
];

const memeImages = [
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/06d237d5-2263-40a0-8755-6d7a9c52bc00/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/c5fb6b1f-eafc-458e-f1d3-b5763953e800/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/fd600f28-0d71-4657-5015-f859b9fa7000/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/57ea0176-92d9-4ad4-9612-372a91a0f400/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/102c5239-67ae-41fb-4996-94c90bba1600/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/e1fc2a01-c19e-4c86-fb37-371562e45e00/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/f763fbe7-ab77-4431-578b-ca7f086b9000/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/c709ea1d-1c06-412a-c5a9-4edd1df53f00/width=640,quality=100",
  "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/54a0fe2d-5419-43dd-28bc-30183b5af800/width=640,quality=100"
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: 'BLUEPRINT', href: '#blueprint' },
    { name: 'CONTRACT', href: '#contract' },
    { name: 'MEME GEN', href: '#ai' },
    { name: 'ROADMAP', href: '#roadmap' },
    { name: 'CONNECT', href: '#connect' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-6 pointer-events-none mix-blend-difference"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 border border-white/20 bg-black/50 p-1 group-hover:border-cyan-400 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             <img src={PROJECT_LOGO} alt="Logo" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-bold text-xs tracking-widest text-white glitch-hover">SSD_OS</span>
            <span className="font-mono text-[9px] text-cyan-400">V.2.0.24</span>
          </div>
        </div>

        <div className="hidden md:flex gap-8 bg-black/80 backdrop-blur-md px-8 py-3 border border-white/10 rounded-sm">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-cyan-400 transition-colors relative group">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="https://x.com/SSDSOL" target="_blank" className="hidden sm:inline-flex btn-ssd px-6 py-2 font-orbitron text-[10px] font-bold">
            <span className="mr-2">⚡</span> JOIN
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white border border-white/20 bg-black/50">
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black/95 border-b border-white/10 pointer-events-auto mt-4">
             {menuItems.map(item => (
               <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block py-4 text-center font-mono text-xs tracking-widest border-b border-white/5 text-gray-300 active:text-cyan-400">{item.name}</a>
             ))}
           </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 90]);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Data Streams */}
      <div className="absolute left-4 top-0 bottom-0 w-12 hidden md:flex flex-col justify-center gap-4 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} 
            className="font-mono text-[9px] text-cyan-400 writing-vertical"
          >
            0x{Math.random().toString(16).substr(2, 4).toUpperCase()}
          </motion.div>
        ))}
      </div>
      <div className="absolute right-4 top-0 bottom-0 w-12 hidden md:flex flex-col justify-center gap-4 pointer-events-none opacity-30 text-right">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }} 
            className="font-mono text-[9px] text-red-500 writing-vertical"
          >
            ERR_404_{i}
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1 relative">
          
          {/* Status Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-2">
            <div className="px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 rounded-sm">
              <span className="w-2 h-2 inline-block bg-cyan-400 rounded-full animate-pulse mr-2" />
              <span className="font-mono text-xs text-cyan-300 tracking-widest">SYSTEM ONLINE</span>
            </div>
             {/* Burn Info Badges - All Blue */}
             <div className="flex items-center gap-3 px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-xl">🔥</span>
                <div className="flex flex-col items-start leading-none">
                   <span className="font-orbitron font-bold text-cyan-400 text-sm tracking-widest">100M+ BURNED</span>
                   <span className="font-mono text-[9px] text-cyan-200 uppercase">Supply Incinerated</span>
                </div>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-xl">⚡</span>
                 <div className="flex flex-col items-start leading-none">
                   <span className="font-orbitron font-bold text-cyan-400 text-sm tracking-widest">NEXT: 10M BURN</span>
                   <span className="font-mono text-[9px] text-cyan-200 uppercase">Pending Execution</span>
                </div>
             </div>
          </div>

          <h1 className="text-8xl sm:text-[10rem] md:text-[13rem] font-orbitron font-black leading-none tracking-tighter mix-blend-overlay opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 lg:opacity-100 lg:mix-blend-normal pointer-events-none lg:pointer-events-auto">
            <span className="metallic-text block glitch-hover">SSD</span>
          </h1>

          <div className="relative z-20 bg-black/60 backdrop-blur-sm lg:bg-transparent p-8 lg:p-0 rounded-xl border border-white/10 lg:border-none">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-syne uppercase text-white mb-6 leading-tight">
              <DecryptText text="SOLID STATE DOMINATION" />
            </h2>
            <p className="font-mono text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-4 border-cyan-500 pl-6 mb-8">
              High-performance memetic warfare. AI-accelerated graphics. 
              The infrastructure for the next generation of Solana culture.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
               <button onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ssd px-10 py-5 text-sm font-bold tracking-[0.2em] group">
                 <span className="group-hover:text-cyan-400 transition-colors">INITIALIZE $SSD</span>
               </button>
               <a href="#ai" className="px-10 py-5 border border-white/20 hover:bg-white/5 font-mono text-sm tracking-widest text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2">
                 <span>[ RUN_MEME_GEN ]</span>
               </a>
            </div>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center relative">
          <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] lg:w-[40rem] lg:h-[40rem] aspect-square flex-shrink-0">
            {/* Rotating Rings */}
            <motion.div style={{ rotate }} className="absolute inset-0 border border-dashed border-cyan-500/30 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-4 md:inset-8 border border-white/10 rounded-full" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-8 md:inset-16 border-2 border-white/5 border-t-cyan-500/50 rounded-full" />
            
            {/* Center Logo - Insets reduced to make image larger within the rings */}
            <div className="absolute inset-10 md:inset-20 bg-black rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.3)]">
               <img src={PROJECT_LOGO} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-110 transform" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating Orbs */}
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 md:top-0 md:right-0 tech-panel p-4 rounded-lg border border-cyan-500/30 z-20">
               <div className="font-mono text-xs text-cyan-400">STATUS: HYPER_SPEED</div>
               <div className="h-1.5 w-full bg-gray-800 mt-2 overflow-hidden"><div className="h-full bg-cyan-400 w-[95%]" /></div>
            </motion.div>
          </div>
        </div>

      </motion.div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--ssd-dark)] to-transparent pointer-events-none" />
    </section>
  );
};

const MemeMarquee = () => {
  return (
    <div className="w-full py-12 bg-black/40 border-y border-white/5 overflow-hidden relative z-20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--ssd-dark)] via-transparent to-[var(--ssd-dark)] z-10 pointer-events-none" />
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {[...memeImages, ...memeImages].map((img, i) => (
          <div key={i} className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 tech-border-corners p-1 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-full h-full overflow-hidden relative">
              <img src={img} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" alt={`SSD Meme ${i}`} />
              <div className="absolute top-2 right-2 px-1 bg-black/80 font-mono text-[8px] text-white">IMG_{i.toString().padStart(3, '0')}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <section id="blueprint" className="py-24 md:py-40 px-6 relative">
       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-cyan-500/10 pointer-events-none" />
       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="tech-panel p-8 md:p-12 tech-border-corners">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 flex items-center justify-center border border-cyan-500/50 rounded-full">
                 <span className="font-orbitron text-xl text-cyan-400">01</span>
               </div>
               <h3 className="font-orbitron text-2xl text-white tracking-widest">MARKET_INTEL</h3>
             </div>
             <h2 className="text-4xl font-bold mb-6 glitch-hover text-white"><DecryptText text="AI REVOLUTION FUELING GROWTH" /></h2>
             <p className="font-mono text-gray-400 text-sm leading-7 mb-6">
                The AI revolution is unstoppable, and it runs on hardware. As the demand for processing power and storage skyrockets, $SSD becomes the critical asset of the new economy.
             </p>
             <p className="font-mono text-white text-sm border-l-2 border-cyan-400 pl-4 py-2 bg-white/5">
                Stock price reflects the hardware supercycle. Vertical trajectory is the only logical outcome.
             </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             {['AI_SUPER_CYCLE', 'HARDWARE_PROXY', 'UP_ONLY_TECH', 'COMMUNITY_OS'].map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 transition-colors group"
                >
                   <div className="w-8 h-8 bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors mb-4 rounded-sm" />
                   <span className="font-mono text-[10px] tracking-widest text-gray-300 group-hover:text-white">{item}</span>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  )
}

const Tokenomics = () => {
  const [copied, setCopied] = useState(false);
  const ca = "CiGNtezwV2wwJucQoWVrn7c4a49GE4MbazBE344Ypump";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contract" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
         <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="border border-white/20 bg-black/80 p-1">
            <div className="border border-white/10 p-8 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
               
               <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-white"><DecryptText text="TECHNICAL SPECS" /></h2>
               
               <div className="flex flex-col md:flex-row items-center gap-2 mb-12 bg-white/5 p-2 rounded-sm border border-white/10">
                  <code className="flex-1 font-mono text-[10px] sm:text-xs text-cyan-400 break-all px-4">{ca}</code>
                  <button onClick={handleCopy} className="bg-white text-black px-6 py-3 font-bold font-mono text-xs hover:bg-cyan-400 transition-colors uppercase w-full md:w-auto">
                    {copied ? 'COPIED!' : 'COPY_ADDRESS'}
                  </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                  {[
                    { label: "SUPPLY", val: "1 BILLION" },
                    { label: "TAXES", val: "0% / 0%" },
                    { label: "LIQUIDITY", val: "INCINERATED" }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em]">{stat.label}</span>
                       <span className="font-orbitron text-xl md:text-2xl text-white">{stat.val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
};

const MemeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(stylePresets[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState(0);
  const stages = ["INITIALIZING CORE...", "RENDERING GEOMETRY...", "APPLYING TEXTURES...", "COMPILING OUTPUT..."];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => setLoadingStage((prev) => (prev + 1) % stages.length), 2000);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const generateMeme = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const logoRes = await fetch(PROJECT_LOGO);
      const blob = await logoRes.blob();
      const base64Data = await new Promise<string>((res) => {
        const reader = new FileReader();
        reader.onloadend = () => res((reader.result as string).split(',')[1]);
        reader.readAsDataURL(blob);
      });

      const preset = stylePresets.find(p => p.id === selectedPreset);
      const fullPrompt = `Generate a cinematic, high-quality meme image of the character from the reference image. Reference appearance: The character in the provided image. Scene: ${prompt}. Artistic Style: ${preset?.prompt}. Keep the core features of the character consistent. High definition, metallic textures.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: fullPrompt }
          ]
        },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setActiveImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (e) { 
      console.error("Meme Gen Error:", e);
    } finally { 
      setIsGenerating(false); 
    }
  };

  return (
    <section id="ai" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
         {/* Input Panel */}
         <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
               <span className="animate-pulse">●</span>
               <span className="font-mono text-xs tracking-widest">MEME_PROTOCOL_V1</span>
            </div>
            <h2 className="text-4xl font-orbitron font-bold mb-8 text-white"><DecryptText text="VISUAL SYNTHESIS" /></h2>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between">
                   <label className="text-[10px] font-mono text-gray-400">PROMPT_INPUT</label>
                   <button onClick={() => setPrompt(randomScenarios[Math.floor(Math.random() * randomScenarios.length)])} className="text-[10px] font-mono text-cyan-400 hover:underline">RANDOMIZE</button>
                 </div>
                 <textarea 
                   value={prompt} 
                   onChange={(e) => setPrompt(e.target.value)} 
                   placeholder="SSD riding a digital wave..." 
                   className="w-full h-32 bg-black border border-white/20 p-4 text-xs font-mono text-white focus:border-cyan-400 outline-none transition-colors"
                 />
               </div>
               
               <div className="space-y-2">
                 <label className="text-[10px] font-mono text-gray-400">RENDER_MODE</label>
                 <div className="grid grid-cols-2 gap-2">
                    {stylePresets.map(preset => (
                      <button 
                        key={preset.id} 
                        onClick={() => setSelectedPreset(preset.id)}
                        className={`text-[9px] font-mono py-2 border uppercase transition-all ${selectedPreset === preset.id ? 'bg-white text-black border-white' : 'border-white/20 text-gray-500 hover:border-white/50'}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                 </div>
               </div>

               <button 
                 onClick={generateMeme} 
                 disabled={isGenerating || !prompt}
                 className="w-full bg-cyan-500 text-black font-bold font-orbitron py-4 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isGenerating ? 'PROCESSING...' : 'EXECUTE RENDER'}
               </button>
            </div>
         </div>

         {/* Output Panel */}
         <div className="lg:w-2/3">
            <div className="w-full aspect-square bg-black border border-white/20 relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
               <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white" />
               <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white" />
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white" />

               <AnimatePresence mode="wait">
                 {isGenerating ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                       <div className="w-16 h-16 border-4 border-t-cyan-400 border-white/10 rounded-full animate-spin mx-auto mb-4" />
                       <p className="font-mono text-xs text-cyan-400 animate-pulse">{stages[loadingStage]}</p>
                    </motion.div>
                 ) : activeImage ? (
                    <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full group">
                       <img src={activeImage} className="w-full h-full object-cover" />
                       <a href={activeImage} download="ssd_meme.png" className="absolute bottom-6 right-6 bg-black text-white border border-white px-6 py-2 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black">DOWNLOAD_ASSET</a>
                    </motion.div>
                 ) : (
                    <div className="text-center opacity-30">
                       <div className="text-6xl mb-4">❖</div>
                       <p className="font-mono text-xs tracking-widest">AWAITING INPUT</p>
                    </div>
                 )}
               </AnimatePresence>
            </div>
         </div>
      </div>
    </section>
  )
}

const HowToBuy = () => {
  const steps = [
    { title: "INIT_WALLET", desc: "Initialize a Phantom or Solflare wallet. Secure your seed phrase in an offline vault.", icon: "01" },
    { title: "ACQUIRE_SOL", desc: "Load your wallet with $SOL. This is the energy source required for the transaction.", icon: "02" },
    { title: "ACCESS_PUMP", desc: "Connect to the Pump.fun terminal via the secure link below.", icon: "03" },
    { title: "EXECUTE_SWAP", desc: "Select $SSD. Confirm transaction. HODL for the hardware supercycle.", icon: "04" }
  ];

  return (
    <section id="howto" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-l-4 border-cyan-400 pl-6">
           <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-2">ACQUISITION</h2>
           <p className="font-mono text-cyan-400">PROTOCOL: BUY ON PUMP.FUN</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="tech-panel p-6 relative group hover:bg-white/5 transition-colors"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-black border border-cyan-400 flex items-center justify-center font-orbitron font-bold text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold font-orbitron text-white mb-4 group-hover:text-cyan-400 transition-colors">{step.title}</h3>
              <p className="font-mono text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center">
           <a href="https://pump.fun/CiGNtezwV2wwJucQoWVrn7c4a49GE4MbazBE344Ypump" target="_blank" className="btn-ssd px-10 py-6 text-lg font-bold flex items-center gap-3 group">
             <span className="group-hover:text-cyan-400 transition-colors">LAUNCH PUMP.FUN TERMINAL</span>
             <span className="text-cyan-400 text-xl">↗</span>
           </a>
        </div>
      </div>
    </section>
  )
}

const Roadmap = () => {
  const phases = [
    {
      mcap: "PHASE 1: BOOT_SEQUENCE",
      val: "INIT - $1M MCAP",
      items: ["Deploying Contract on Pump.fun", "404 Error: Jeets Not Found", "Overclocking the Community", "Installing Doom on the Blockchain"]
    },
    {
      mcap: "PHASE 2: TURBO_MODE",
      val: "$10M - $50M MCAP",
      items: ["Downloading More RAM for Everyone", "Hacking the Matrix Mainframe", "Cyber-bullying Bears into Submission", "SSD Installed on the Moon"]
    },
    {
      mcap: "PHASE 3: SYSTEM_OVERRIDE",
      val: "$100M - $500M MCAP",
      items: ["Flipping the GDP of Small Nations", "Replacing Gold Reserves with Silicon", "Elon Tweets a Hard Drive Emoji", "Telepathic Meme Transmission"]
    },
    {
      mcap: "PHASE 4: GOD_MODE",
      val: "$1B+ MCAP",
      items: ["Hostile Takeover of NVIDIA", "SSD Becomes Legal Tender on Mars", "Uploading Consciousness to the Chain", "Simulation Reset: WE WIN"]
    }
  ];

  return (
    <section id="roadmap" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
           <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6"><DecryptText text="MASTER_PLAN" /></h2>
           <p className="font-mono text-cyan-400 tracking-widest text-sm md:text-base">PROJECTED TRAJECTORY: PARABOLIC GROWTH</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {phases.map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,240,255,1)] z-20 mt-6 md:mt-0" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right'}`}>
                   <div className="tech-panel p-6 md:p-8 hover:border-cyan-400/50 transition-colors group">
                      <div className="font-mono text-[10px] text-cyan-400 mb-2 tracking-widest">{phase.mcap}</div>
                      <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-2">{phase.val}</h3>
                      <div className={`h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mb-6 ${i % 2 !== 0 ? 'md:ml-auto md:bg-gradient-to-l' : ''}`} />
                      
                      <ul className={`space-y-3 ${i % 2 !== 0 ? 'md:items-end' : ''} flex flex-col`}>
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-3 font-mono text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rotate-45" />
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
                
                {/* Empty Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Connect = () => (
  <section id="connect" className="py-24 px-6 bg-white/[0.02]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-8xl font-black text-white/10 uppercase tracking-tighter">NETWORK</h2>
        <div className="font-mono text-cyan-400 -mt-8 relative z-10"><DecryptText text="GLOBAL CONNECTIVITY" /></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "DEXSCREENER", url: "https://dexscreener.com/solana/CiGNtezwV2wwJucQoWVrn7c4a49GE4MbazBE344Ypump", type: "MARKET" },
          { name: "TWITTER / X", url: "https://x.com/SSDSOL", type: "SOCIAL" },
          { name: "TIKTOK", url: "https://www.tiktok.com/@ssdsolana", type: "MEDIA" },
          { name: "MEME DEPOT", url: "https://memedepot.com/d/ssd-solana", type: "ARCHIVE" }
        ].map((link, i) => (
          <a key={i} href={link.url} target="_blank" className="tech-panel p-6 flex items-center justify-between group hover:border-cyan-400/50 transition-colors">
             <div>
               <div className="text-[9px] font-mono text-gray-500 mb-1 tracking-widest">{link.type}_LINK</div>
               <div className="text-xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">{link.name}</div>
             </div>
             <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-cyan-400 group-hover:text-black transition-all">↗</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    // Simulate complex system boot
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500); // slight delay after 100%
          return 100;
        }
        // Random increments to simulate data loading chunks
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-gray-300">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
             
             {/* Central Loader HUD */}
             <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-b-2 border-cyan-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-r-2 border-l-2 border-cyan-500/20 rounded-full"
                />
                <div className="font-orbitron text-4xl font-bold text-white tracking-tighter">
                   {Math.floor(loadProgress)}%
                </div>
             </div>

             {/* Progress Bar & Text */}
             <div className="mt-12 w-80 space-y-2 relative z-10">
                <div className="flex justify-between font-mono text-[10px] text-cyan-400 tracking-widest">
                   <span>SYSTEM_INIT</span>
                   <span>V.2.0.24</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                     style={{ width: `${loadProgress}%` }}
                   />
                </div>
                <div className="font-mono text-[9px] text-gray-500 text-center pt-2">
                   ESTABLISHING SECURE CONNECTION...
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Navbar />
          <Hero />
          <MemeMarquee />
          <About />
          <Tokenomics />
          <MemeGenerator />
          <HowToBuy />
          <Roadmap />
          <Connect />
          
          <footer className="py-8 text-center border-t border-white/5 flex flex-col items-center gap-4">
            <p className="font-mono text-[9px] text-gray-600">SYSTEM ARCHITECTURE © 2025 SSD PROTOCOL</p>
            <div className="flex items-center gap-2">
               <span className="font-mono text-[9px] text-gray-600">WEB DEV:</span>
               <a href="https://t.me/Maximus00115" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.505 1.205-.817 1.24-.693.06-1.223-.455-1.898-.899-1.056-.694-1.652-1.125-2.678-1.799-1.193-.787-.42-1.218.261-1.907.178-.18 3.253-2.98 3.313-3.23.007-.032.014-.15-.056-.212s-.17-.035-.248-.021c-.106.022-1.792 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.533 6.998-3.014 3.332-1.39 4.025-1.629 4.476-1.629.099 0 .322.023.466.14.12.096.153.228.169.324-.002.068.016.292 0 .292z"/>
                  </svg>
               </a>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;
