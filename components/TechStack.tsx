import React from 'react';
import { MonitorSmartphone, Server, Brain, Database, Shield, Code, MessageCircle, Radio, Car, Cpu, GitBranch, Boxes, HardDrive, Plug, Mail, Camera, Cloud, CloudCog, CloudDrizzle, Network } from 'lucide-react';

const Badge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-slate-200">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const TechStack: React.FC = () => {
  return (
    <section className="py-14 px-4" id="stack">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold">Tools & Platforms</h3>
          <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">production‑ready</span>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex flex-wrap gap-3">
            <Badge icon={<MonitorSmartphone size={18} className="text-neon-cyan" />} label="Android / React Native" />
            <Badge icon={<MonitorSmartphone size={18} className="text-neon-blue" />} label="Flutter / .NET MAUI" />
            <Badge icon={<Code size={18} className="text-neon-purple" />} label=".NET / Node.js APIs" />
            <Badge icon={<Database size={18} className="text-neon-pink" />} label="PostgreSQL / SQLite" />
            <Badge icon={<Brain size={18} className="text-neon-green" />} label="Python / TensorFlow / OpenCV" />
            <Badge icon={<MessageCircle size={18} className="text-neon-green" />} label="WhatsApp Business API" />
            <Badge icon={<Radio size={18} className="text-neon-orange" />} label="M‑Pesa STK / USSD" />
            <Badge icon={<Brain size={18} className="text-neon-green" />} label="RAG / LLM Orchestration" />
            <Badge icon={<Database size={18} className="text-neon-cyan" />} label="Vector DB (FAISS, etc.)" />
            <Badge icon={<Server size={18} className="text-neon-blue" />} label="Cloud & On‑prem Deploy" />
            <Badge icon={<Cloud size={18} className="text-neon-cyan" />} label="AWS / Azure / GCP" />
            <Badge icon={<CloudDrizzle size={18} className="text-neon-blue" />} label="Firebase / Supabase" />
            <Badge icon={<Shield size={18} className="text-neon-orange" />} label="CCTV / NVR / VMS / NMS" />
            <Badge icon={<Network size={18} className="text-neon-green" />} label="MikroTik / Ubiquiti" />
            <Badge icon={<Camera size={18} className="text-neon-pink" />} label="Dahua / Hikvision VMS" />
            <Badge icon={<Cpu size={18} className="text-neon-cyan" />} label="Edge AI / Robotics" />
            <Badge icon={<Car size={18} className="text-neon-green" />} label="Telemetry / Tracking" />
            <Badge icon={<Boxes size={18} className="text-neon-purple" />} label="Docker / Kubernetes" />
            <Badge icon={<GitBranch size={18} className="text-neon-cyan" />} label="CI/CD (GitHub Actions)" />
            <Badge icon={<HardDrive size={18} className="text-neon-pink" />} label="Backups / DR" />
            <Badge icon={<Plug size={18} className="text-neon-green" />} label="Webhooks / Integrations" />
            <Badge icon={<Mail size={18} className="text-neon-blue" />} label="SMS / Email Gateways (Twilio etc.)" />
            <Badge icon={<MessageCircle size={18} className="text-neon-green" />} label="WhatsApp Cloud API (Meta)" />
            <Badge icon={<Camera size={18} className="text-neon-orange" />} label="CCTV Analytics / RTSP" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
