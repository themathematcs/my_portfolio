import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FolderGit2, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-display font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="glass-card rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-pink/10 transition-colors duration-500"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <FolderGit2 className="text-neon-pink" />
                    <span className="text-neon-pink font-mono text-sm tracking-wider uppercase">{project.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-black/50 text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                    >
                      {/* Neon Border Animation */}
                      <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#00f3ff_50%,#0000_100%)] animate-spin-slow opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-[2px] bg-black rounded-[0.65rem]" />

                      <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-neon-cyan transition-colors">
                        View Live Project
                        <ArrowUpRight size={18} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;