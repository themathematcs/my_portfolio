import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Activity, Smartphone, Shield, ExternalLink } from 'lucide-react';

type Study = {
  icon: React.ReactNode;
  client: string;
  title: string;
  outcome: string;
  period?: string;
  stack?: string[];
  link?: string;
  image?: string;
};

const studies: Study[] = [
  {
    icon: <Smartphone className="text-neon-cyan" size={20} />,
    client: 'Regional Retailer',
    title: 'Offline-first Sales CRM Mobile App',
    outcome: 'Reduced lead response time by 35% with reliable sync and analytics.',
    period: '2025',
    stack: ['React Native', 'SQLite', 'Node.js', 'CI/CD'],
    link: '#projects',
  },
  {
    icon: <Activity className="text-neon-pink" size={20} />,
    client: 'Private Clinic',
    title: 'AI Triage & Notes Assistant (Gemma)',
    outcome: 'Cut intake time by 40% and improved documentation consistency.',
    period: '2025',
    stack: ['Gemma', 'RAG', 'Python', 'HIPAA-aware flows'],
  },
  {
    icon: <Shield className="text-neon-green" size={20} />,
    client: 'SME Network',
    title: 'CCTV/NMS Monitoring & Automation',
    outcome: 'Proactive alerts reduced downtime incidents across branches.',
    period: '2024',
    stack: ['NVR/VMS', 'Prometheus', 'Grafana', 'Alerting'],
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section className="py-20 px-4" id="case-studies">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-display font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Case Studies
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card rounded-3xl p-0 overflow-hidden"
            >
              {/* Image / placeholder */}
              <div className="h-36 bg-[radial-gradient(ellipse_at_center,rgba(188,19,254,0.15),rgba(0,0,0,0.0))]" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {s.icon}
                  <span className="text-sm text-neon-cyan/90 uppercase tracking-wider">{s.client}</span>
                  {s.period && <span className="ml-auto text-xs text-slate-400">{s.period}</span>}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-slate-300 mb-4">{s.outcome}</p>
                {s.stack && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.stack.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200">{tag}</span>
                    ))}
                  </div>
                )}
                {s.link && (
                  <a href={s.link} className="inline-flex items-center gap-2 text-neon-cyan hover:underline">
                    View project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
