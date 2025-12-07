import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 px-4 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">Christian Nganga</h3>
          <p className="text-slate-500">AI/Machine Learning Engineer</p>
        </div>
        
        <div className="flex flex-col gap-2 text-sm text-slate-400">
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
            <Mail size={16} /> {CONTACT_INFO.email}
          </a>
          <div className="flex items-center gap-2">
            <Phone size={16} /> {CONTACT_INFO.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {CONTACT_INFO.location}
          </div>
        </div>

        <div className="flex gap-4">
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
      <div className="text-center mt-12 text-slate-700 text-xs">
        © {new Date().getFullYear()} Christian Nganga. Built with React & Gemini API.
      </div>
    </footer>
  );
};

export default Footer;
