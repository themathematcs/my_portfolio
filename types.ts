export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  type: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
