import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, FileDown, Terminal, ChevronDown, Loader2, Sparkles, Cpu, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Hero: React.FC = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            alert("CV functionality would be connected to a backend or static file hosting. Simulation complete.");
        }, 1500);
    };

    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10 max-w-5xl"
            >
                {/* Status Badge */}
                <motion.div
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-neon-green text-xs font-bold tracking-[0.2em] uppercase mb-12 shadow-[0_0_15px_rgba(0,255,153,0.1)]"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0,255,153,0.4)' }}
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
                    </span>
                    System Online // autoQriz254
                </motion.div>

                {/* Hero Title */}
                <div className="relative mb-8 text-center flex flex-col items-center">
                    <h1 className="font-display text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.9] text-white select-none">
                        CHRISTIAN<br />
                        <span className="gradient-text drop-shadow-[0_0_15px_rgba(188,19,254,0.3)]">NGANGA</span>
                    </h1>
                </div>

                {/* Hero Description */}
                <motion.p
                    className="text-lg md:text-2xl text-slate-300 mb-14 font-light max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Architecting <span className="text-white font-medium border-b-2 border-neon-cyan/30">Next-Generation Systems</span>.
                    Specializing in High-Performance Mobile Apps, Autonomous Robotics, and Domain-Specific AI.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-wrap gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* GitHub Button */}
                    <a
                        href={CONTACT_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-neon-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="flex items-center gap-3 relative z-10">
                            <Github size={22} className="group-hover:text-neon-cyan transition-colors" />
                            <span className="font-bold tracking-wider uppercase text-sm">Contribute</span>
                        </div>
                    </a>

                    {/* View Projects Button */}
                    <a
                        href="#projects"
                        className="group relative px-10 py-4 bg-neon-blue text-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(30,64,175,0.4)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                        <div className="flex items-center gap-3 relative z-10">
                            <Terminal size={22} />
                            <span className="font-bold tracking-wider uppercase text-sm">View Archive</span>
                        </div>
                    </a>

                    {/* Download CV Button */}
                    <button
                        className="group relative px-8 py-4 bg-black/40 border border-neon-purple/30 text-neon-purple rounded-2xl transition-all hover:bg-neon-purple/10 hover:border-neon-purple active:scale-95 shadow-[0_0_20px_rgba(188,19,254,0.1)]"
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        <div className="flex items-center gap-3">
                            {isDownloading ? (
                                <Loader2 size={22} className="animate-spin" />
                            ) : (
                                <FileDown size={22} className="group-hover:-translate-y-1 transition-transform" />
                            )}
                            <span className="font-bold tracking-wider uppercase text-sm">{isDownloading ? "Analysing..." : "Retrieve CV"}</span>
                        </div>
                    </button>
                </motion.div>
            </motion.div>

            {/* Floating Tech Badges */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-8 hidden lg:block text-left">
                <TechBadge icon={<Sparkles size={18} />} label="AI/ML" />
                <TechBadge icon={<Globe size={18} />} label="Fullstack" />
                <TechBadge icon={<Cpu size={18} />} label="Systems" />
            </div>

            <motion.div
                className="absolute bottom-12 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">Initialize Scroll</span>
                <ChevronDown className="text-neon-cyan w-6 h-6" />
            </motion.div>
        </section>
    );
};

const TechBadge: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <motion.div
        whileHover={{ x: 10 }}
        className="flex items-center gap-4 px-4 py-2 border-l border-white/10 group cursor-default"
    >
        <div className="text-slate-500 group-hover:text-neon-cyan transition-colors">{icon}</div>
        <span className="text-xs font-mono text-slate-500 group-hover:text-white tracking-widest uppercase transition-colors">{label}</span>
    </motion.div>
);

export default Hero;
