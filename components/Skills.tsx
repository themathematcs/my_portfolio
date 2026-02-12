import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="skills">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-display font-black mb-4 tracking-tight uppercase italic">Technical <span className="text-neon-cyan">Stack</span></h2>
          <p className="text-slate-500 font-mono tracking-widest text-xs uppercase">Commanding the architecture of the future</p>
          <div className="w-24 h-1 bg-neon-cyan mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup, idx) => {
            const colors = ['text-neon-cyan', 'text-neon-purple', 'text-neon-pink', 'text-neon-green'];
            const glows = ['shadow-[0_0_20px_rgba(0,243,255,0.1)]', 'shadow-[0_0_20px_rgba(188,19,254,0.1)]', 'shadow-[0_0_20px_rgba(255,0,255,0.1)]', 'shadow-[0_0_20px_rgba(0,255,153,0.1)]'];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.2)' }}
                className={`glass-card p-8 rounded-[2rem] border border-white/5 transition-all duration-500 group ${glows[idx % 4]}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${colors[idx % 4]}`}>
                    {skillGroup.category.split(' ')[0]}
                  </h3>
                  <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${colors[idx % 4]}`}>
                    <span className="text-[10px] font-bold">0{idx + 1}</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-8 text-white">{skillGroup.category}</h4>

                <div className="space-y-4">
                  {skillGroup.items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1 group/item">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-slate-300 group-hover/item:text-white transition-colors text-sm font-medium">{item}</span>
                        <div className={`w-1 h-1 rounded-full ${colors[idx % 4]} opacity-50`} />
                      </div>
                      <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors[idx % 4].split('-')[1]}-${colors[idx % 4].split('-')[2]} to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-700`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;