
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const PROJECT_LOGO = "https://pbs.twimg.com/profile_images/2000255611473170438/p_4GHX4E_400x400.jpg";

// --- KONSTANSOK ---
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

// --- KOMPONENSEK ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: 'BLUEPRINT', href: '#blueprint' },
    { name: 'CONTRACT', href: '#contract' },
    { name: 'MEME GEN', href: '#ai' },
    { name: 'CONNECT', href: '#connect' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between tech-panel rounded-lg px-6 py-3 pointer-events-auto shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md overflow-hidden border border-white/20">
            <img src={PROJECT_LOGO} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-orbitron font-bold text-sm tracking-widest text-white">SSD_OS_v1.0</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="px-4 py-2 font-mono text-[10px] font-bold tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all uppercase border border-transparent hover:border-white/10">{item.name}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="https://x.com/SSDSOL" target="_blank" className="hidden sm:inline-flex btn-ssd px-6 py-2 font-orbitron font-bold text-[10px] tracking-widest uppercase rounded-sm">INIT_JOIN</a>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white block" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white block" />
            <motion.span animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white block" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 mt-2 tech-panel rounded-lg p-4 md:hidden flex flex-col gap-2 items-center z-[101]"
            >
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs font-bold tracking-widest text-gray-300 hover:text-white uppercase py-3 border-b border-white/5 w-full text-center"
                >
                  {item.name}
                </a>
              ))}
              <a href="https://x.com/SSDSOL" target="_blank" className="btn-ssd w-full py-3 mt-4 font-orbitron font-bold text-[10px] tracking-widest uppercase rounded-sm">EXECUTE_JOIN</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden relative">
      <motion.div style={{ y: y1, scale }} className="text-center w-full z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="relative inline-block mb-10">
          {/* Decorative Rings */}
          <div className="absolute inset-0 border border-white/20 rounded-full scale-150 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full scale-[1.8] animate-[spin_15s_linear_infinite_reverse]" />
          
          <div className="relative z-10 p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
             <img src={PROJECT_LOGO} alt="SSD" className="w-32 h-32 md:w-64 md:h-64 rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </motion.div>
        
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: '1em' }} 
            animate={{ opacity: 1, letterSpacing: '-0.05em' }} 
            transition={{ delay: 0.2, duration: 1, type: 'spring' }} 
            className="text-8xl sm:text-9xl md:text-[13rem] font-orbitron font-black leading-[0.8] metallic-text uppercase"
          >
            SSD
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 flex flex-col items-center gap-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
            <p className="text-gray-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">Solid State Domination</p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-16 flex flex-col sm:flex-row justify-center gap-6 px-6">
          <button onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ssd w-full sm:w-auto px-12 py-4 font-orbitron font-bold text-xs tracking-widest rounded-sm skew-x-[-10deg]">ACQUIRE $SSD</button>
          <a href="#ai" className="btn-ssd-outline w-full sm:w-auto px-12 py-4 font-orbitron font-bold text-xs tracking-widest rounded-sm skew-x-[-10deg] hover:text-white transition-all text-center flex items-center justify-center">
            MEME_PROTOCOL
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const MemeMarquee = () => {
  return (
    <div className="w-full py-12 bg-black/20 border-y border-white/5 overflow-hidden relative z-20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--ssd-dark)] via-transparent to-[var(--ssd-dark)] z-10 pointer-events-none" />
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...memeImages, ...memeImages].map((img, i) => (
          <div key={i} className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 tech-panel rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors group">
            <img src={img} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt={`SSD Meme ${i}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => (
  <section id="blueprint" className="py-24 md:py-40 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="font-mono text-xs text-white/50 tracking-widest">MARKET INTELLIGENCE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-8 uppercase metallic-text leading-none">AI REVOLUTION<br/>FUELING GROWTH.</h2>
          <div className="tech-panel p-8 rounded-lg border-l-4 border-l-white">
            <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
              The AI revolution is unstoppable, and it runs on hardware. As the demand for processing power and storage skyrockets, $SSD becomes the critical asset of the new economy.
              <br/><br/>
              <span className="text-white">Stock price reflects the hardware supercycle.</span> Vertical trajectory is the only logical outcome.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['AI_SUPER_CYCLE', 'HARDWARE_PROXY', 'UP_ONLY_TECH', 'COMMUNITY_OS'].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-500" />
                  <span className="text-[10px] font-orbitron text-gray-300 tracking-wider">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-1 lg:order-2">
          <div className="tech-panel p-2 rounded-xl rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="relative overflow-hidden rounded-lg">
              <div className="scanline-overlay z-20" />
              <img src={PROJECT_LOGO} className="w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-700" alt="SSD" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 border-t border-white/20">
                <div className="flex justify-between items-end">
                   <span className="font-mono text-[10px] text-gray-400">MODEL: SSD-2025</span>
                   <span className="font-mono text-[10px] text-green-400">STATUS: ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Tokenomics = () => {
  const [copied, setCopied] = useState(false);
  const ca = "CiGNtezwV2wwJucQoWVrn7c4a49GE4MbazBE344Ypump";
  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contract" className="py-24 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="tech-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <h2 className="text-4xl md:text-7xl font-orbitron font-bold mb-12 uppercase metallic-text">Technical Specs</h2>
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-black/60 border border-white/10 rounded-lg p-2 flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full bg-black/40 p-4 rounded border border-white/5">
                <p className="font-mono text-[10px] md:text-xs text-gray-400 break-all">{ca}</p>
              </div>
              <button onClick={handleCopy} className="w-full md:w-auto px-8 py-4 bg-white hover:bg-gray-200 text-black font-mono font-bold text-xs tracking-widest rounded transition-all uppercase">{copied ? 'COPIED' : 'COPY_CA'}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ { label: "TOTAL SUPPLY", val: "1B" }, { label: "TAX", val: "0/0" }, { label: "LIQUIDITY", val: "BURNT" } ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-8 border border-white/10 bg-white/[0.02] rounded-xl flex flex-col items-center relative group">
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all rounded-xl" />
                <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] font-bold mb-4 uppercase">{stat.label}</p>
                <p className="text-3xl font-orbitron font-bold text-white uppercase group-hover:text-cyan-400 transition-colors">{stat.val}</p>
              </motion.div>
            ))}
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
    <section id="ai" className="py-24 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3 w-full space-y-8">
            <div className="border-l-2 border-white pl-6">
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-2 uppercase">MEME<br/>PROTOCOL</h2>
              <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">AI-Powered Graphic Processing</p>
            </div>
            
            <div className="tech-panel p-6 rounded-lg space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] text-gray-400 uppercase">INPUT_PROMPT</label>
                  <button onClick={() => setPrompt(randomScenarios[Math.floor(Math.random() * randomScenarios.length)])} className="text-[10px] font-mono text-cyan-400 hover:text-white uppercase">[RANDOMIZE]</button>
                </div>
                <textarea 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)} 
                  placeholder="SSD riding a chrome jet..." 
                  className="w-full h-32 bg-black/50 border border-white/10 rounded-md p-4 text-white font-mono text-xs outline-none focus:border-white/30 transition-all resize-none placeholder-gray-700" 
                />
              </div>

              <div className="space-y-3">
                <label className="font-mono text-[10px] text-gray-400 uppercase">RENDER_STYLE</label>
                <div className="grid grid-cols-2 gap-2">
                  {stylePresets.map(p => (
                    <button key={p.id} onClick={() => setSelectedPreset(p.id)} className={`px-2 py-3 rounded-sm border font-mono text-[9px] uppercase transition-all ${selectedPreset === p.id ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}>{p.label}</button>
                  ))}
                </div>
              </div>
            </div>
            
            <button onClick={generateMeme} disabled={isGenerating || !prompt} className="w-full btn-ssd py-5 font-orbitron font-bold text-xs tracking-[0.2em] uppercase rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? 'PROCESSING...' : 'INITIATE_RENDER'}
            </button>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="relative aspect-square tech-panel rounded-2xl overflow-hidden flex items-center justify-center bg-black/40">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
                    <div className="w-64 h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
                      <motion.div 
                        animate={{ x: [-256, 256] }} 
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
                        className="w-full h-full bg-white"
                      />
                    </div>
                    <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase blink">{stages[loadingStage]}</p>
                  </motion.div>
                ) : activeImage ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="result" className="relative w-full h-full group">
                    <img src={activeImage} className="w-full h-full object-cover" alt="Generated Meme" />
                    <a href={activeImage} download="ssd_meme.png" className="absolute bottom-4 right-4 btn-ssd px-6 py-2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">SAVE_IMG</a>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center opacity-30">
                    <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center mb-6">
                      <div className="w-20 h-20 border border-dashed border-white/20 rounded-full animate-spin-slow" />
                    </div>
                    <p className="font-mono text-xs tracking-[0.3em] uppercase">SYSTEM STANDBY</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Connect = () => (
  <section id="connect" className="py-24 md:py-40 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-8xl font-orbitron font-bold metallic-text uppercase text-center opacity-50">Global<br/>Network</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "DEXSCREENER", url: "https://dexscreener.com/solana/CiGNtezwV2wwJucQoWVrn7c4a49GE4MbazBE344Ypump", desc: "MARKET_DATA_FEED" },
          { name: "X (TWITTER)", url: "https://x.com/SSDSOL", desc: "SOCIAL_UPLINK" },
          { name: "TIKTOK", url: "https://www.tiktok.com/@ssdsolana", desc: "VIRAL_CONTENT_STREAM" },
          { name: "MEME_DEPOT", url: "https://memedepot.com/d/ssd-solana", desc: "ARCHIVE_ACCESS" }
        ].map((link, i) => (
          <motion.a key={i} href={link.url} target="_blank" whileHover={{ scale: 0.99, y: -2 }} className="flex items-center justify-between p-8 tech-panel rounded-xl hover:border-white/30 transition-all group">
            <div>
              <span className="font-orbitron font-bold text-lg md:text-xl uppercase text-white block mb-2">{link.name}</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">{link.desc}</span>
              </div>
            </div>
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <span className="text-lg">↗</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen selection:bg-white selection:text-black text-gray-200">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div key="preloader" exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#08080a]">
            <div className="relative">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-t-2 border-white rounded-full absolute -inset-2" />
               <img src={PROJECT_LOGO} className="w-20 h-20 rounded-full grayscale" />
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-white tracking-[0.5em]">INITIALIZING SSD</p>
              <motion.div initial={{ width: 0 }} animate={{ width: 100 }} className="h-0.5 bg-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isLoaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <MemeMarquee />
            <About />
            <Tokenomics />
            <MemeGenerator />
            <Connect />
          </main>
          <footer className="py-12 border-t border-white/5 text-center bg-black/40 backdrop-blur-lg">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
              <img src={PROJECT_LOGO} className="w-10 h-10 rounded-full grayscale opacity-50" />
              <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">$SSD 2025 • SOLID STATE DOMINATION</p>
            </div>
          </footer>
        </motion.div>
      )}
      
      {/* Tech Background Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Moving Grid Lines */}
        <motion.div 
          animate={{ y: [0, 1000] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{ background: 'linear-gradient(transparent 95%, rgba(255,255,255,0.1) 100%)', backgroundSize: '100% 100px' }}
        />
        {/* Glowing Orbs/Lights */}
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1.2, 1, 1.2] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default App;
