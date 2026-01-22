import React from 'react';
import { HeartPulse, ShoppingCart, Bot, Building2, Stethoscope, Smartphone, Car, MapPin } from 'lucide-react';

const cases = [
  {
    icon: <Stethoscope size={18} className="text-neon-cyan" />,
    title: 'Clinic AI triage',
    blurb: 'Symptom intake, structured notes, and risk flags to support clinicians.'
  },
  {
    icon: <HeartPulse size={18} className="text-neon-pink" />,
    title: 'Medical assistants (Gemma)',
    blurb: 'Domain-tuned LLM for care guidance with audit trails and safeguards.'
  },
  {
    icon: <Smartphone size={18} className="text-neon-green" />,
    title: 'Sales CRM mobile app',
    blurb: 'Offline-first pipeline tracking with secure sync and analytics.'
  },
  {
    icon: <ShoppingCart size={18} className="text-neon-purple" />,
    title: 'Pharmacy stock automation',
    blurb: 'Low-inventory alerts, purchase suggestions, and barcode workflows.'
  },
  {
    icon: <Bot size={18} className="text-neon-blue" />,
    title: 'Ops automation & agents',
    blurb: 'Schedulers, bots, and AI copilots integrated with business systems.'
  },
  {
    icon: <Car size={18} className="text-neon-cyan" />,
    title: 'ADAS & autonomy prototyping',
    blurb: 'Edge vision models, telemetry logging, and driver-assist experiments.'
  },
  {
    icon: <MapPin size={18} className="text-neon-green" />,
    title: 'Fleet tracking & safety',
    blurb: 'Vehicle tracking, driver scoring, and incident video retrieval.'
  },
  {
    icon: <Building2 size={18} className="text-neon-orange" />,
    title: 'Dashboards & ERP',
    blurb: 'Custom dashboards, role-based access, and data pipelines.'
  }
];

const UseCases: React.FC = () => {
  return (
    <section className="py-16 px-4" id="use-cases">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold">Selected Use Cases</h3>
          <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">autoQriz254</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div key={c.title} className="glass-card rounded-2xl p-5 hover:bg-white/10 transition">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  {c.icon}
                </div>
                <div>
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-slate-400 text-sm mt-1">{c.blurb}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
