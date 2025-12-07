import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';
import { ExternalLink, Award } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section className="py-20 px-4" id="certifications">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-display font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="block glass-card p-6 rounded-2xl group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-xl text-neon-cyan border border-white/10 group-hover:border-neon-cyan/50 transition-colors shadow-inner">
                    <Award size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors">
                  {cert.title}
                </h3>
                <p className="text-neon-purple text-sm mb-4 font-medium flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neon-purple"></span>
                  {cert.issuer}
                </p>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 group-hover:text-slate-300">
                  {cert.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {cert.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 text-slate-400 rounded-lg border border-white/5 group-hover:border-neon-cyan/20 group-hover:text-neon-cyan/80 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;