/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { 
  Github, 
  Mail, 
  Gamepad2, 
  Code2, 
  User, 
  ExternalLink, 
  MessageSquare, 
  Zap, 
  Monitor, 
  GraduationCap,
  Target,
  Trophy,
  Terminal,
  ChevronLeft,
  ChevronRight,
  MousePointer2
} from 'lucide-react';

// --- Types ---
type Mode = 'GAMER' | 'PROFILE' | 'DEV';

// --- Utils ---
const MODES: Mode[] = ['GAMER', 'PROFILE', 'DEV'];

// --- Components ---

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsPressing(true);
    const handleMouseUp = () => setIsPressing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-8 w-8 flex items-center justify-center hidden md:flex"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPressing ? 0.8 : 1
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <div className="absolute h-10 w-10 border border-white/20 rounded-full blur-[2px]" />
      <MousePointer2 size={16} className="text-white fill-white/20" />
    </motion.div>
  );
};

const SocialLink = ({ icon: Icon, href, label, color = "text-white/60" }: { icon: any, href: string, label: string, color?: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group flex items-center gap-3 transition-all duration-300 hover:gap-4 font-mono ${color} hover:text-white`}
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
      <Icon size={18} />
    </div>
    <span className="text-[10px] font-bold tracking-widest uppercase">{label}</span>
  </a>
);

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl p-6 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

const SectionTitle = ({ children, icon: Icon, accentColor = "from-blue-500 to-cyan-500" }: { children: React.ReactNode, icon?: any, accentColor?: string }) => (
  <div className="mb-6 flex items-center gap-3">
    {Icon && (
      <div className={`p-2 rounded-lg bg-gradient-to-br ${accentColor} shadow-lg`}>
        <Icon size={18} className="text-white" />
      </div>
    )}
    <h2 className="text-lg font-black tracking-tighter text-white uppercase italic font-sans">{children}</h2>
  </div>
);

// --- Panels ---

const GamerPanel = () => (
  <div className="h-full w-full flex flex-col justify-center gap-12 px-8 lg:px-20 py-20 pointer-events-auto">
    <div className="space-y-2">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-2 text-red-500 text-[10px] font-mono font-black tracking-[0.3em] uppercase"
      >
        <div className="h-0.5 w-8 bg-red-500 shadow-[0_0_10px_#ef4444]" />
        Identity: Competitor
      </motion.div>
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.8]">
        GAMER<br /><span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">SQUAD</span>
      </h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
      <GlassCard className="border-red-500/20 md:row-span-2">
        <SectionTitle icon={Gamepad2} accentColor="from-red-600 to-orange-600">Counter-Strike 2</SectionTitle>
        <div className="space-y-6 font-mono">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <p className="text-[8px] uppercase tracking-widest text-white/30 font-black">Steam Auth</p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">ZakariaCS</h3>
            </div>
            <div className="px-2 py-1 bg-red-600/20 border border-red-600/40 rounded text-[9px] text-red-400 font-black">RANK: SUPREME</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-red-500/20 transition-all">
              <span className="text-[10px] uppercase text-white/40">Active Role</span>
              <span className="text-sm font-bold text-white uppercase italic">Aggressive AWP</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-red-500/20 transition-all">
              <span className="text-[10px] uppercase text-white/40">Favorite Map</span>
              <span className="text-sm font-bold text-white uppercase italic">Ancient / Anubis</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">
        <GlassCard className="border-orange-500/20">
          <SectionTitle icon={Trophy} accentColor="from-orange-500 to-yellow-500">Hall of Fame</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {['Elden Ring', 'Black Myth', 'CS2', 'Valorant', 'GoW'].map(game => (
              <span key={game} className="px-3 py-1.5 rounded-lg bg-black border border-white/5 text-[10px] font-black text-white/60 hover:text-red-500 hover:border-red-500/30 transition-all uppercase tracking-tighter cursor-crosshair">
                {game}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="border-red-500/10">
          <SectionTitle icon={MessageSquare} accentColor="from-purple-600 to-red-600">Comms Hub</SectionTitle>
          <div className="space-y-2">
            <SocialLink icon={MessageSquare} label="zakaria_tb" href="#" color="text-red-400" />
            <SocialLink icon={Target} label="Steam Community" href="#" color="text-red-400" />
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);

const ProfilePanel = () => (
  <div className="h-full w-full flex flex-col items-center justify-center gap-12 px-8 py-20 pointer-events-auto">
    <div className="relative group">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -m-12 border border-white/5 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -m-6 border border-white/10 rounded-full"
      />
      <div className="h-40 w-40 md:h-60 md:w-60 rounded-[3rem] bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
        <User size={100} className="text-white/10 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-6 flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="h-1.5 w-4 rounded-full bg-white/20" />)}
        </div>
      </div>
    </div>

    <div className="text-center space-y-6 max-w-2xl relative z-10">
      <div className="space-y-1">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono font-black tracking-[0.4em] text-white/30 uppercase"
        >
          ALGERIA // CS_STUDENT
        </motion.p>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.8]">
          ZAKARIA<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BOUZIANE</span>
        </h1>
      </div>
      
      <p className="text-white/50 text-lg md:text-xl font-medium tracking-tight leading-relaxed font-sans">
        Solving digital puzzles through modular design and tactical focus. Holding an English licence and a passion for scalable architectures.
      </p>

      <div className="flex flex-wrap justify-center gap-8 pt-4">
        <SocialLink icon={Github} label="GitHub" href="https://github.com/zbouzianeinf-jpg" />
        <SocialLink icon={Mail} label="Email" href="mailto:z.bouziane.inf@lagh-univ.dz" />
        <SocialLink icon={Monitor} label="Portfolio" href="#" />
      </div>
    </div>
  </div>
);

const DevPanel = () => (
  <div className="h-full w-full flex flex-col justify-center gap-12 px-8 lg:px-20 py-20 pointer-events-auto">
    <div className="space-y-2 text-right">
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-end gap-2 text-cyan-400 text-[10px] font-mono font-black tracking-[0.3em] uppercase"
      >
        Logic: Engineering
        <div className="h-0.5 w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
      </motion.div>
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.8]">
        TECH<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">PROTOCOLS</span>
      </h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      <GlassCard className="border-cyan-500/20 md:col-span-2">
        <SectionTitle icon={Code2} accentColor="from-cyan-500 to-blue-600">Development Stack</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
          {['React.js', 'Typescript', 'Node.js', 'Python', 'Tailwind', 'PostgreSQL'].map((lib, i) => (
            <div key={lib} className="relative group cursor-none">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-cyan-500/40 transition-all overflow-hidden">
                <span className="text-xs font-black text-white/40 group-hover:text-cyan-400 transition-colors uppercase italic">{lib}</span>
                <div className="h-[1px] w-full bg-cyan-500/20 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest pl-2">Education Journey</p>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/5">
              <span className="block text-[8px] font-mono text-cyan-400 font-black mb-1">CURR_STATUS</span>
              <p className="text-sm font-bold text-white uppercase italic tracking-tighter">1st Year CS Student</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5">
              <span className="block text-[8px] font-mono text-cyan-400 font-black mb-1">QUALIFICATION</span>
              <p className="text-sm font-bold text-white uppercase italic tracking-tighter">English Licence</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-cyan-600/10 border border-cyan-500/20 flex flex-col items-center justify-center text-center gap-4">
          <Terminal size={40} className="text-cyan-400 opacity-40" />
          <p className="text-xs font-black text-white/40 uppercase tracking-tighter">Available for collab. on GitHub.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Stage ---

// --- Main Stage ---

const VenomChat = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'VENOM PROTOCOL INITIALIZED. STATE YOUR QUERY.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Direct call to Gemini API for "VENOM" persona
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const prompt = `You are VENOM, a futuristic AI assistant for Zakaria Tayeb Bouziane's personal portfolio. 
      Zakaria is a CS student in Algeria, a high-level CS2 player, and a developer. 
      Keep your responses concise, edgy, and high-tech. 
      Current User Query: "${userMsg}"`;

      const result = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });
      
      const text = result.text || 'ERROR: NO DATA RECEIVED.';
      
      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'ERROR: UPLINK INTERRUPTED. RETRYING...' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-8 z-[200] w-[90vw] md:w-[400px] h-[500px] flex flex-col bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">VENOM_CORE</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: m.role === 'bot' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] font-mono leading-relaxed ${m.role === 'bot' ? 'bg-white/5 text-white/80 border border-white/5' : 'bg-red-600/20 text-white border border-red-600/40'}`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="h-1.5 w-1.5 rounded-full bg-white/30" />)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-black border-t border-white/5">
            <div className="relative flex items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="INPUT COMMAND..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono text-white focus:outline-none focus:border-red-500/50 transition-all uppercase"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 p-2 text-white/40 hover:text-red-500 transition-colors"
              >
                <Zap size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [activeMode, setActiveMode] = useState<Mode>('PROFILE');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const stageX = useMotionValue(0);
  const smoothedX = useSpring(stageX, { stiffness: 100, damping: 30 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const bgGradient = useTransform(stageX, 
    [-100, 0, 100], 
    ['radial-gradient(circle at 0% 0%, #450a0a 0%, #000 100%)', 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)', 'radial-gradient(circle at 100% 0%, #082f49 0%, #000 100%)']
  );

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    const currentIdx = MODES.indexOf(activeMode);
    
    if (info.offset.x > threshold && currentIdx > 0) {
      setActiveMode(MODES[currentIdx - 1]);
      stageX.set(0); 
    } else if (info.offset.x < -threshold && currentIdx < MODES.length - 1) {
      setActiveMode(MODES[currentIdx + 1]);
      stageX.set(0);
    } else {
      stageX.set(0);
    }
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative cursor-grab active:cursor-grabbing font-sans select-none">
      <GlowCursor />
      
      {/* Background with parallax color shift */}
      <motion.div style={{ background: bgGradient }} className="absolute inset-0 transition-colors duration-1000" />
      
      {/* HUD Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      {/* Navigation HUD */}
      <nav className="fixed top-10 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <div className="flex items-center gap-1 p-1 rounded-full border border-white/5 bg-black/40 backdrop-blur-2xl pointer-events-auto">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`relative px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${activeMode === m ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
            >
              {activeMode === m && (
                <motion.div 
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-full ${m === 'GAMER' ? 'bg-red-600/20' : m === 'DEV' ? 'bg-cyan-600/20' : 'bg-white/10'}`}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{m}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* VENOM Trigger */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 z-[201] p-5 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group flex items-center justify-center overflow-hidden"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-right transition-transform -z-10" />
      </button>

      <VenomChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Main Draggable Stage */}
      <div className="h-full w-full relative flex items-center justify-center pt-20" ref={containerRef}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: smoothedX }}
          onDragEnd={handleDragEnd}
          className="h-full w-full max-w-6xl mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.8, rotateX: 45, filter: 'blur(30px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, rotateX: -45, filter: 'blur(30px)' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 150,
                filter: { duration: 0.5 }
              }}
              style={{ transformPerspective: 1200 }}
              className="absolute inset-0 w-full flex items-center justify-center p-4 lg:p-12 mb-20 md:mb-0"
            >
              <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {activeMode === 'GAMER' && <GamerPanel />}
                {activeMode === 'PROFILE' && <ProfilePanel />}
                {activeMode === 'DEV' && <DevPanel />}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* HUD Elements */}
      <div className="fixed bottom-10 left-10 hidden lg:block pointer-events-none opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-mono font-black text-white tracking-widest bg-white/5 px-3 py-1 rounded inline-block">SWIPE STAGE_X TO TOGGLE IDENTITY</p>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-6 z-[100] flex justify-between items-center pointer-events-none">
        <div className="flex gap-4 items-center pl-4">
          <div className="flex items-center gap-3">
            <div className={`h-1.5 w-1.5 rounded-full ${activeMode === 'GAMER' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : activeMode === 'DEV' ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : 'bg-white/40'} transition-all`} />
            <span className="text-[9px] font-mono font-black tracking-[0.2em] text-white/30 uppercase italic">ZAKARIA_T_BOUZIANE // BUILD_V2.0</span>
          </div>
        </div>
        <div className="flex gap-8 items-center pr-4">
          <div className="flex flex-col items-end opacity-20">
            <span className="text-[7px] font-mono font-black text-white uppercase tracking-widest pl-2">System Performance</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-1 w-3 rounded-full ${i < 4 ? 'bg-cyan-500' : 'bg-white/10'}`} />)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
