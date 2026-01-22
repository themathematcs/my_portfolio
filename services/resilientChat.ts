import { ChatMessage } from "../types";
import { ABOUT_ME, SKILLS, PROJECTS, CERTIFICATIONS, CONTACT_INFO, AUTHOR_NAME } from "../constants";

const PROXY_URL = (import.meta as any).env?.VITE_GEMINI_PROXY_URL || '/.netlify/functions/gemini-proxy';

// Single-attempt fetch with optional timeout; fallback handled on catch (no retries)
async function singleFetch(url: string, init: RequestInit, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...init, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(t);
  }
}

function buildLocalAnswer(question: string): string {
  // Simple intent detection for local Q&A based on portfolio constants
  const lower = question.toLowerCase();

  // Name
  if (lower.includes('name') || lower.includes("who is")) {
    return `His name is ${AUTHOR_NAME}.`;
  }

  // Contact
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('whatsapp')) {
    const phoneDigits = CONTACT_INFO.phone.replace(/\D/g, '');
    const wa = `https://wa.me/${phoneDigits}?text=Hi%20${encodeURIComponent(AUTHOR_NAME)}%2C%20I%27d%20like%20to%20discuss%20a%20project.`;
    return `You can reach ${AUTHOR_NAME} at:\n- Email: ${CONTACT_INFO.email}\n- Phone/WhatsApp: ${CONTACT_INFO.phone}\n- WhatsApp link: ${wa}\n- LinkedIn: ${CONTACT_INFO.linkedin}\n- GitHub: ${CONTACT_INFO.github}`;
  }

  // Age (not provided)
  if (lower.includes('age') || lower.includes('old')) {
    return "His age isn’t publicly listed. Feel free to contact him directly if needed.";
  }

  // Services / What he does
  if (lower.includes('service') || lower.includes('offer') || lower.includes('what can') || lower.includes('what do you do')) {
    const categories = SKILLS.map(g => g.category).join(', ');
    return `He offers end‑to‑end development across: ${categories}. If you have a specific use case, share details and he’ll recommend an approach.`;
  }

  // Skills
  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tool')) {
    const skills = SKILLS.map((g) => `- ${g.category}: ${g.items.join(', ')}`).join('\n');
    return `Here is a summary of the technical arsenal:\n${skills}`;
  }

  // Projects
  if (lower.includes('project')) {
    const projects = PROJECTS.map(p => `- ${p.title} (${p.technologies.join(', ')})`).join('\n');
    return `Recent/featured projects:\n${projects}`;
  }

  // Certifications
  if (lower.includes('cert')) {
    const certs = CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n');
    return `Certifications:\n${certs}`;
  }

  // Default to About
  return `About ${AUTHOR_NAME}:\n${ABOUT_ME.trim()}`;
}

export async function streamMessageResilient(
  userMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) {
  try {
    const response = await singleFetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage }),
    });
    const data = await response.json();
    const fullResponseText = data.text || buildLocalAnswer(userMessage);
    setMessages(prev => {
      const newMessages = [...prev];
      const last = newMessages[newMessages.length - 1];
      if (last.role === 'model') last.text = fullResponseText;
      return newMessages;
    });
  } catch (err) {
    const fallback = buildLocalAnswer(userMessage);
    setMessages(prev => {
      const newMessages = [...prev];
      const last = newMessages[newMessages.length - 1];
      if (last.role === 'model') last.text = fallback;
      return newMessages;
    });
  }
}
