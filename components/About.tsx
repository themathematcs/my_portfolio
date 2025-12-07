import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_ME } from '../constants';
import { Brain, Code, Cpu, Database } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    { icon: <Brain className="text-neon-purple" size={32} />, title: "Deep Learning", desc: "Neural Networks & CNNs" },
    { icon: <Code className="text-neon-cyan" size={32} />, title: "Development", desc: "Python, TensorFlow, Scikit-learn" },
    { icon: <Cpu className="text-neon-pink" size={32} />, title: "Computer Vision", desc: "Image Processing & Detection" },
    { icon: <Database className="text-neon-green" size={32} />, title: "Data Handling", desc: "Pandas, NumPy & Analysis" },
  ];

  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <p className="text-slate-200 text-lg leading-relaxed mb-6 relative z-10">
                {ABOUT_ME}
              </p>
              <div className="flex flex-wrap gap-4 text-slate-300 font-mono text-sm relative z-10">
                 <span className="glass-card px-4 py-2 rounded-lg text-neon-cyan border-neon-cyan/20">Age: 23</span>
                 <span className="glass-card px-4 py-2 rounded-lg text-neon-purple border-neon-purple/20">Loc: Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:border-neon-cyan/30 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/5">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{card.title}</h3>
                <p className="text-xs text-slate-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;