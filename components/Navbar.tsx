import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-display font-bold text-white tracking-wide">
          <span className="px-3 py-1 rounded-full text-sm bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan">autoQriz254</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-slate-300 text-sm">
          <a href="#profession" className="hover:text-neon-cyan transition">Services</a>
          <a href="#projects" className="hover:text-neon-cyan transition">Projects</a>
          <a href="#case-studies" className="hover:text-neon-cyan transition">Case Studies</a>
          <a href="#contact" className="hover:text-neon-cyan transition">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
