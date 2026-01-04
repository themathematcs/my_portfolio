import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, FileDown, Terminal, ChevronDown, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Hero: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate asynchronous file preparation
    setTimeout(() => {
      setIsDownloading(false);
      alert("CV functionality would be connected to a backend or static file hosting. Simulation complete.");
    }, 1500);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-sm mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,153,0.2)]"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
          </span>
          Open to Work
        </motion.div>

        <h1 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
          Hello, I'm <br className="md:hidden" />
          <span className="gradient-text drop-shadow-sm">Christian Nganga</span>
        </h1>

        <motion.p 
          className="text-xl md:text-2xl text-slate-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          AI & Machine Learning Engineer crafting <span className="text-neon-cyan font-normal">intelligent solutions</span> with data and code.
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a 
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-all text-white font-medium group"
          >
            <Github size={20} className="group-hover:text-neon-cyan transition-colors" />
            GitHub
          </a>
          
          <a 
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 glass-card bg-neon-blue/5 border-neon-blue/20 text-neon-blue rounded-xl hover:bg-neon-blue/20 transition-all font-medium"
          >
            <Terminal size={20} />
            View Projects
          </a>

          <a 
            href="#profession"
            className="flex items-center gap-2 px-6 py-3 glass-card bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan rounded-xl hover:bg-neon-cyan/20 transition-all font-medium"
          >
            <Terminal size={20} />
            Services
          </a>

          <button 
            className="flex items-center gap-2 px-6 py-3 glass-card bg-neon-purple/5 border-neon-purple/20 text-neon-purple rounded-xl hover:bg-neon-purple/20 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <FileDown size={20} />
            )}
            {isDownloading ? "Preparing..." : "Download CV"}
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-slate-400 w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
};

export default Hero;