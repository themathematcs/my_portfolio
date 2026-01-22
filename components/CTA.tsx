import React from 'react';
import { CONTACT_INFO } from '../constants';
import { PhoneCall, MessageCircle, Layers } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-display font-bold">Let’s build something impactful</h3>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Need mobile apps, systems automation, or advanced AI integration? I deliver secure, scalable, production‑ready solutions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            <a
              href="mailto:chriznganga69@gmail.com?subject=Project%20Inquiry"
              className="px-6 py-3 rounded-xl bg-neon-cyan text-black font-medium hover:opacity-90 transition inline-flex items-center gap-2"
            >
              <PhoneCall size={18} />
              Book a call
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}?text=Hi%20Christian%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl glass-card border-neon-green/20 text-neon-green font-medium hover:bg-neon-green/10 transition inline-flex items-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a
              href="#profession"
              className="px-6 py-3 rounded-xl glass-card text-white font-medium hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <Layers size={18} />
              Explore services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
