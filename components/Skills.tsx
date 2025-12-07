import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl font-display font-bold mb-4">Technical Arsenal</h2>
          <p className="text-slate-400">Technologies and frameworks I command</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 group border-t border-white/10"
            >
              <h3 className="text-xl font-bold mb-6 text-neon-cyan group-hover:text-neon-pink transition-colors">
                {skillGroup.category}
              </h3>
              <div className="space-y-3">
                {skillGroup.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-neon-purple group-hover:bg-neon-green transition-colors rounded-full shadow-[0_0_5px_currentColor]"></div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;