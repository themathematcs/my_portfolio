import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MonitorSmartphone, Palette, CheckCircle2 } from 'lucide-react';

const Profession: React.FC = () => {
  const services = [
    {
      title: 'Web Design',
      subtitle: 'Modern, conversion-focused websites',
      icon: <Palette className="text-neon-cyan" size={26} />,
      highlights: [
        'Clean UI/UX with responsive layouts',
        'Performance-first structure and accessibility',
        'Design systems that scale with your brand',
      ],
      accent: 'from-neon-cyan/20 via-neon-purple/10 to-transparent',
    },
    {
      title: 'Desktop Applications',
      subtitle: 'Reliable tools for real workflows',
      icon: <MonitorSmartphone className="text-neon-purple" size={26} />,
      highlights: [
        'Feature-rich CRUD and automation apps',
        'Offline-first experiences and data integrity',
        'Packaging and versioning for deployment',
      ],
      accent: 'from-neon-purple/20 via-neon-pink/10 to-transparent',
    },
    {
      title: 'Desktop App Cybersecurity',
      subtitle: 'Security built into the product',
      icon: <Shield className="text-neon-pink" size={26} />,
      highlights: [
        'Threat modeling and secure-by-design patterns',
        'Safer auth/session handling and data protection',
        'Hardening basics: secrets, updates, logging',
      ],
      accent: 'from-neon-pink/20 via-neon-cyan/10 to-transparent',
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
          <h2 className="text-4xl font-display font-bold mb-4">Professional Focus</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I build polished interfaces and dependable software, with security in mind from day one.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl bg-white/5 group-hover:bg-white/10 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 mt-2 mb-6">{service.subtitle}</p>

                <div className="space-y-3">
                  {service.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-neon-green mt-0.5 shrink-0" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profession;
