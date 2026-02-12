import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MonitorSmartphone, Palette, CheckCircle2, Terminal } from 'lucide-react';

const Profession: React.FC = () => {
  const services = [
    {
      title: 'Mobile Apps Development',
      subtitle: 'Production-grade Android & cross‑platform apps',
      icon: <MonitorSmartphone className="text-neon-cyan" size={26} />,
      highlights: [
        'Robust architecture, offline-first & sync',
        'Modern UI with responsive, accessible design',
        'CI/CD, crash analytics, and app store readiness',
      ],
      accent: 'from-neon-cyan/20 via-neon-purple/10 to-transparent',
    },
    {
      title: 'Systems Development & Automation',
      subtitle: 'Reliable business systems and workflows',
      icon: <Shield className="text-neon-purple" size={26} />,
      highlights: [
        'Custom CRM/ERP, dashboards, and data pipelines',
        'Process automation: schedulers, bots, integrations',
        'Scalable APIs with security and observability',
      ],
      accent: 'from-neon-purple/20 via-neon-pink/10 to-transparent',
    },
    {
      title: 'Advanced AI Apps (incl. Medical)',
      subtitle: 'Domain-focused AI with models like Gemma',
      icon: <Palette className="text-neon-pink" size={26} />,
      highlights: [
        'RAG, fine-tuning, and evaluation for reliability',
        'Clinical/medical assistants and decision support',
        'Compliance-aware data handling and auditing',
      ],
      accent: 'from-neon-pink/20 via-neon-cyan/10 to-transparent',
    },
    {
      title: 'AI Integration & Intelligent Systems',
      subtitle: 'Embed AI into existing products and ops',
      icon: <Shield className="text-neon-green" size={26} />,
      highlights: [
        'Agent workflows, automation, and copilots',
        'LLM orchestration, prompt pipelines, monitoring',
        'SMB and enterprise automation (Kenya/E.A.)',
      ],
      accent: 'from-neon-cyan/20 via-neon-purple/10 to-transparent',
    },
    {
      title: 'CCTV & Network Management Systems',
      subtitle: 'Deployments, monitoring, and reliable connectivity',
      icon: <Shield className="text-neon-cyan" size={26} />,
      highlights: [
        'CCTV/NVR/VMS setup and health monitoring',
        'Network design, hardening, and observability (NMS)',
        'Branch connectivity and remote access',
      ],
      accent: 'from-neon-blue/20 via-neon-cyan/10 to-transparent',
    },
    {
      title: 'Data Recovery & Continuity',
      subtitle: 'Backups, recovery, and disaster-readiness',
      icon: <Palette className="text-neon-purple" size={26} />,
      highlights: [
        'Data recovery workflows and backup strategy',
        'Versioned storage and restoration drills',
        'Business continuity & incident runbooks',
      ],
      accent: 'from-neon-purple/20 via-neon-pink/10 to-transparent',
    },
    {
      title: 'Automotive Robotics & ADAS',
      subtitle: 'Prototyping autonomy and driver assistance',
      icon: <MonitorSmartphone className="text-neon-blue" size={26} />,
      highlights: [
        'Sensor fusion (camera, LiDAR-lite, GPS/IMU)',
        'Edge inference and telemetry logging',
        'Safety-first testing and data pipelines',
      ],
      accent: 'from-neon-blue/20 via-neon-green/10 to-transparent',
    },
    {
      title: 'Bespoke “Impossible” Applications',
      subtitle: 'If it solves a real problem, we can build it',
      icon: <Shield className="text-neon-orange" size={26} />,
      highlights: [
        'Rapid discovery, PoCs, and iterative delivery',
        'Tight feedback loops with stakeholders',
        'From prototype to production with governance',
      ],
      accent: 'from-neon-orange/20 via-neon-pink/10 to-transparent',
    },
  ];

  return (
    <section className="py-20 px-4" id="profession">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">Professional Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I build polished interfaces and dependable software, with security in mind from day one.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden group transition-all duration-500 hover:border-white/20"
            >
              {/* Animated Accent Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-700`}
              />

              <div className="relative z-10">
                <div className="mb-10 inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-black text-white leading-tight mb-4 group-hover:text-neon-cyan transition-colors">
                  {service.title.split(' ').slice(0, 2).join(' ')}<br />
                  <span className="text-lg opacity-80 font-medium">{service.title.split(' ').slice(2).join(' ')}</span>
                </h3>

                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">{service.subtitle}</p>

                <div className="space-y-4">
                  {service.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 group-hover/item:scale-150 transition-transform" />
                      <span className="text-slate-400 text-sm group-hover/item:text-slate-200 transition-colors leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute -bottom-6 -right-6 text-white/5 opacity-0 group-hover:opacity-10 transition-opacity">
                <Terminal size={100} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profession;
